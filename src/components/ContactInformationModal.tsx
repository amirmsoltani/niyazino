import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Button, HStack, Modal, Text} from 'native-base';
import {Call, Sms} from 'iconsax-react-native';
import {Linking} from 'react-native';

export type RefType = {
  isOpen: boolean;
  setStatus: (open?: boolean) => void;
};

type PropsType = {defaultOpen?: boolean; phoneNumber?: string};

type StateType = {
  isOpen: boolean;
};

const ContactInformationModal = forwardRef<RefType, PropsType>((props, ref) => {
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
        <Modal.Header>اطلاعات تماس</Modal.Header>
        <Modal.Body>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <Text fontSize={'md'}>شماره همراه</Text>
            <HStack alignItems={'center'}>
              <Text fontSize={'md'} bold>
                {props.phoneNumber}
              </Text>
              <Button
                ml={4}
                p={1}
                onPress={() => {
                  Linking.canOpenURL('tel://' + props.phoneNumber).then(() => {
                    Linking.openURL('tel://' + props.phoneNumber);
                  });
                }}>
                <Call color={'white'} />
              </Button>
              <Button
                ml={4}
                p={1}
                onPress={() => {
                  Linking.canOpenURL('sms://' + props.phoneNumber).then(() => {
                    Linking.openURL('sms://' + props.phoneNumber);
                  });
                }}>
                <Sms color={'white'} />
              </Button>
            </HStack>
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
});

export default ContactInformationModal;
