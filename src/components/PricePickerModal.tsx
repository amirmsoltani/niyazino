import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Box, Button, Checkbox, Input, Modal, ScrollView} from 'native-base';
import {SearchNormal1} from 'iconsax-react-native';

export type RefType = {
  isOpen: boolean;
  setStatus: (open?: boolean) => void;
};

type PropsType = {defaultOpen?: boolean};

type StateType = {
  isOpen: boolean;
};

const PricePickerModal = forwardRef<RefType, PropsType>((props, ref) => {
  const [state, setState] = useState<StateType>({
    isOpen: props.defaultOpen ?? false,
  });
  const setStatus: RefType['setStatus'] = (open = false) => {
    if (open !== state.isOpen) {
      setState({...state, isOpen: open});
    }
  };

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
            m={1}
            placeholder={'مقدار راوارد کنید'}
            placeholderTextColor={'gray.300'}
            pr={4}
            shadow={2}
            textAlign={'right'}
            variant={'rounded'}
            InputLeftElement={
              <Box pl={4}>
                <SearchNormal1 color="black" size={20} />
              </Box>
            }
          />
          <ScrollView nestedScrollEnabled={true} p={4}>
            <Button
              _text={{fontWeight: '600', fontSize: 'lg'}}
              h={14}
              justifyContent={'center'}
              mb={4}
              size={'sm'}
              w={'full'}>
              هزار تومان
            </Button>
            <Button
              _text={{fontWeight: '600', fontSize: 'lg'}}
              h={14}
              justifyContent={'center'}
              mb={4}
              w={'full'}>
              صد هزار تومان
            </Button>
            <Button
              _text={{fontWeight: '600', fontSize: 'lg'}}
              h={14}
              justifyContent={'center'}
              mb={4}
              size={'sm'}
              w={'full'}>
              یک میلیون تومان
            </Button>
          </ScrollView>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
});

export default PricePickerModal;
