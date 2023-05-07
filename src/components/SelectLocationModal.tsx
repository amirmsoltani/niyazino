import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Box, Checkbox, Input, Modal, ScrollView} from 'native-base';
import {SearchNormal1} from 'iconsax-react-native';

export type RefType = {
  isOpen: boolean;
  setStatus: (open?: boolean) => void;
};

type PropsType = {defaultOpen?: boolean};

type StateType = {
  isOpen: boolean;
};

const SelectLocationModal = forwardRef<RefType, PropsType>((props, ref) => {
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
        <Modal.Header>انتخاب موقعیت</Modal.Header>
        <Modal.Body>
          <Input
            _focus={{bg: 'white'}}
            bg={'white'}
            borderWidth={0}
            fontSize={'md'}
            fontWeight={'500'}
            h={'14'}
            m={1}
            placeholder={'نام استان را وارد کنید'}
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
            <Checkbox
              flexDirection={'row-reverse'}
              h={16}
              justifyContent={'space-between'}
              size={'sm'}
              value={'khorasan razavi'}
              w={'full'}>
              خراسان رضوی
            </Checkbox>
            <Checkbox
              flexDirection={'row-reverse'}
              h={16}
              justifyContent={'space-between'}
              size={'sm'}
              value={'khorasan razavi'}
              w={'full'}>
              خراسان رضوی
            </Checkbox>
            <Checkbox
              flexDirection={'row-reverse'}
              h={16}
              justifyContent={'space-between'}
              size={'sm'}
              value={'khorasan razavi'}
              w={'full'}>
              خراسان رضوی
            </Checkbox>
          </ScrollView>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
});

export default SelectLocationModal;
