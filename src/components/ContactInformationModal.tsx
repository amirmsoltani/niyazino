import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Modal, Text, VStack} from 'native-base';

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
          <VStack>
            <Text>{props.phoneNumber}</Text>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
});

export default ContactInformationModal;
