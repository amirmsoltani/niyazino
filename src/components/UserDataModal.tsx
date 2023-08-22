import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Button,
  FormControl,
  HStack,
  Input,
  Modal,
  Text,
  VStack,
} from 'native-base';
import {Controller, useForm} from 'react-hook-form';
import {useHttpRequest} from '~/hooks';
import {UserType} from '~/types';

export type RefType = {
  isOpen: boolean;
  setStatus: (open?: boolean) => void;
};

type PropsType = {defaultOpen?: boolean};

type StateType = {
  isOpen: boolean;
};

const UserDataModal = forwardRef<RefType, PropsType>((props, ref) => {
  const [state, setState] = useState<StateType>({
    isOpen: props.defaultOpen ?? false,
  });
  const {
    request,
    state: {self, update},
  } = useHttpRequest({
    selector: state => ({
      self: state.http.getMe,
      update: state.http.updateProfile,
    }),
    onUpdate: (lastState, state) => {
      if (
        lastState.update?.httpRequestStatus === 'loading' &&
        state.update?.httpRequestStatus === 'success'
      ) {
        request('getMe', undefined);
      }
      if (
        lastState.self?.httpRequestStatus === 'loading' &&
        state.self?.httpRequestStatus === 'success'
      ) {
        setState({isOpen: false});
      }
    },
  });
  const setStatus: RefType['setStatus'] = (open = false) => {
    if (open !== state.isOpen) {
      setState({...state, isOpen: open});
    }
  };

  useImperativeHandle(ref, () => ({isOpen: state.isOpen, setStatus}), [state]);

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({defaultValues: {firstName: '', lastName: ''}});
  const me = self?.data?.data.user || ({} as UserType);
  const onSubmit = handleSubmit(data => {
    request('updateProfile', {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        mobile: me.mobile,
        avatar_id: me.avatar_id || undefined,
        city_id: me.city_id || undefined,
        province_id: me.province_id || undefined,
      },
    });
  });
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={state.isOpen}
      onClose={setStatus}
      avoidKeyboard>
      <Modal.Content w={'full'}>
        <Modal.CloseButton />
        <Modal.Header>اطلاعات کاربری</Modal.Header>
        <Modal.Body>
          <VStack alignItems={'center'} justifyContent={'space-between'}>
            <FormControl isInvalid={!!errors.firstName}>
              <FormControl.Label
                _text={{color: 'black', fontWeight: 600, fontSize: 'md'}}>
                نام (اجباری)
              </FormControl.Label>

              <Controller
                control={control}
                name={'firstName'}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (
                  <Input
                    _focus={{bg: 'white'}}
                    bg={'white'}
                    borderWidth={0}
                    fontSize={'sm'}
                    fontWeight={'700'}
                    isRequired={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder={'نام'}
                    py={4}
                    shadow={4}
                    textAlign={'right'}
                    value={value}
                  />
                )}
              />
              <FormControl.ErrorMessage>
                نام خود را وارد کنید
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.firstName} mt={4}>
              <FormControl.Label
                _text={{color: 'black', fontWeight: 600, fontSize: 'md'}}>
                نام خانوادگی
              </FormControl.Label>
              <Controller
                control={control}
                name={'lastName'}
                render={({field: {value, onChange, onBlur}}) => (
                  <Input
                    _focus={{bg: 'white'}}
                    bg={'white'}
                    borderWidth={0}
                    fontSize={'sm'}
                    fontWeight={'700'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder={'نام خانوادگی'}
                    py={4}
                    shadow={4}
                    textAlign={'right'}
                    value={value}
                  />
                )}
              />
            </FormControl>
            <HStack justifyContent={'flex-start'} mt={3} w={'full'}>
              <Button
                isLoading={update?.httpRequestStatus === 'loading'}
                onPress={onSubmit}>
                <Text color={'white'} fontWeight={'semibold'}>
                  ثبت
                </Text>
              </Button>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
});

export default UserDataModal;
