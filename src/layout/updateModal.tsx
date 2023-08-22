import React, {FC, useState} from 'react';
import {Button, HStack, Modal, Stack, Text, VStack} from 'native-base';
import {useHttpRequest} from '~/hooks';
import {Linking} from 'react-native';
import {versionIsNew} from '~/util/VersionIsNew';

type StateType = {
  isOpen: boolean;
};

const UserDataModal: FC = () => {
  const [state, setState] = useState<StateType>({
    isOpen: false,
  });
  const {state: version} = useHttpRequest({
    selector: state => state.http.version,
    initialRequests: request => {
      request('version', undefined);
    },
    onUpdate: (lastState, state) => {
      if (
        lastState?.httpRequestStatus === 'loading' &&
        state?.httpRequestStatus === 'success' &&
        versionIsNew(version?.data?.version || '0.0.0')
      ) {
        setState({isOpen: true});
      }
    },
  });

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={state.isOpen}
      onClose={() => {
        setState({isOpen: false});
      }}
      avoidKeyboard>
      <Modal.Content w={'full'}>
        <Modal.CloseButton />
        <Modal.Header>به روز رسانی</Modal.Header>
        <Modal.Body>
          <VStack alignItems={'center'} justifyContent={'space-between'}>
            <Text textAlign={'justify'}>
              نسخه جدید نیازینو اکنون در دسترس می باشد. لطفاً جهت عملکرد بهتر
              برنامه و دریافت امکانات جدید آن را به روزرسانی نمایید.
            </Text>
            <HStack justifyContent={'space-between'} mt={3} w={'full'}>
              <Stack px={2} w={'1/2'}>
                <Button
                  bg={'green.300'}
                  onPress={() => {
                    Linking.canOpenURL('http://niyazino.com/download').then(
                      () => {
                        Linking.openURL('http://niyazino.com/download');
                      },
                    );
                  }}>
                  <Text color={'white'} fontWeight={'semibold'}>
                    دانلود نسخه جدید
                  </Text>
                </Button>
              </Stack>
              <Stack px={2} width={'1/2'}>
                <Button bg={'red.400'} onPress={() => {}}>
                  <Text color={'white'} fontWeight={'semibold'}>
                    ادامه با همین نسخه
                  </Text>
                </Button>
              </Stack>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default UserDataModal;
