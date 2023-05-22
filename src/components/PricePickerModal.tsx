import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Box, Button, Input, Modal, ScrollView} from 'native-base';
import {SearchNormal1} from 'iconsax-react-native';
import {mapPrice} from '~/util/MapPrice';
import {useAppDispatch} from '~/hooks/reduxHooks';
import {advertisingSetData} from '~/store/slices';
import {convertNumToPersian} from '~/util/ChangeToJalali';
import {priceFormat} from '~/util/PriceFormat';

export type RefType = {
  isOpen: boolean;
  setStatus: (section: 'min' | 'max', open?: boolean) => void;
};

type PropsType = {defaultOpen?: boolean};

type StateType = {
  isOpen: boolean;
  section: 'min' | 'max';
  search: string;
};

const PricePickerModal = forwardRef<RefType, PropsType>((props, ref) => {
  const [state, setState] = useState<StateType>({
    isOpen: props.defaultOpen ?? false,
    section: 'min',
    search: '',
  });
  const setStatus: RefType['setStatus'] = (section, open = false) => {
    if (open !== state.isOpen) {
      setState({...state, isOpen: open, section});
    }
  };

  const dispatch = useAppDispatch();
  useImperativeHandle(ref, () => ({isOpen: state.isOpen, setStatus}), [state]);

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={state.isOpen}
      onClose={setStatus}
      avoidKeyboard>
      <Modal.Content w={'full'}>
        <Modal.CloseButton />
        <Modal.Header>انتخاب بازه</Modal.Header>
        <Modal.Body>
          <Input
            _focus={{bg: 'white'}}
            bg={'white'}
            borderWidth={0}
            fontSize={'md'}
            fontWeight={'500'}
            h={'14'}
            keyboardType={'numeric'}
            m={1}
            placeholder={'مقدار راوارد کنید'}
            placeholderTextColor={'gray.300'}
            pr={4}
            shadow={2}
            textAlign={'right'}
            value={state.search}
            variant={'rounded'}
            InputLeftElement={
              <Box pl={4}>
                <SearchNormal1 color="black" size={20} />
              </Box>
            }
            onChangeText={text =>
              setState({...state, search: text.match(/\d/g)?.join('') || ''})
            }
          />
          <ScrollView nestedScrollEnabled={true} p={4}>
            {!(state.search in mapPrice) && state.search.match(/\d/g) ? (
              <Button
                _text={{fontWeight: '600', fontSize: 'lg'}}
                h={14}
                justifyContent={'center'}
                mb={4}
                size={'sm'}
                w={'full'}
                onPress={() => {
                  dispatch(
                    advertisingSetData({
                      [state.section + '_price']: state.search,
                    }),
                  );
                  setState({...state, isOpen: false});
                }}>
                {convertNumToPersian(priceFormat(+state.search)) + ' تومان'}
              </Button>
            ) : null}
            {Object.entries(mapPrice)
              .filter(([key]) => key.includes(state.search))
              .map(([key, value]) => (
                <Button
                  key={key}
                  _text={{fontWeight: '600', fontSize: 'lg'}}
                  h={14}
                  justifyContent={'center'}
                  mb={4}
                  size={'sm'}
                  w={'full'}
                  onPress={() => {
                    dispatch(
                      advertisingSetData({[state.section + '_price']: key}),
                    );
                    setState({...state, isOpen: false});
                  }}>
                  {value + ' تومان'}
                </Button>
              ))}
          </ScrollView>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
});

export default PricePickerModal;
