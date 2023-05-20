import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Button, FormControl, Input, Modal, VStack} from 'native-base';
import {useHttpRequest} from '~/hooks';
import {Controller, useForm} from 'react-hook-form';
import {syncStorageAction} from '~/store/Actions';

export type RefType = {
  isOpen: boolean;
  setStatus: (open?: boolean) => void;
};

type PropsType = {defaultOpen?: boolean};

type StateType = {
  isOpen: boolean;
  section: 'phone' | 'code';
};

const AuthModal = forwardRef<RefType, PropsType>((props, ref) => {
  const [state, setState] = useState<StateType>({
    isOpen: props.defaultOpen ?? false,
    section: 'phone',
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
  } = useForm({
    defaultValues: {code: '', phone: ''},
    criteriaMode: 'firstError',
  });
  const {
    request,
    dispatch,
    state: {auth, sendCode},
  } = useHttpRequest({
    selector: state => ({
      sendCode: state.http.sendVerificationCode,
      auth: state.http.verifyCode,
    }),
    clearAfterUnmount: ['sendVerificationCode'],
    onUpdate: (lastState, state) => {
      if (
        lastState.auth?.httpRequestStatus === 'loading' &&
        state.auth!.httpRequestStatus === 'success'
      ) {
        setState({isOpen: false, section: 'phone'});
        dispatch(syncStorageAction('update'));
        request('getMe', undefined);
      }
    },
  });

  const submit = handleSubmit(values => {
    if (state.section === 'phone') {
      request('sendVerificationCode', {data: {mobile: values.phone}});
      setState({...state, section: 'code'});
    } else {
      request('verifyCode', {data: {code: values.code, mobile: values.phone}});
    }
  });

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={state.isOpen}
      onClose={setStatus}
      avoidKeyboard>
      <Modal.Content w={'full'}>
        <Modal.CloseButton />
        <Modal.Header>ورود به حساب کاربری</Modal.Header>
        <Modal.Body>
          <VStack>
            <FormControl
              display={state.section === 'phone' ? 'flex' : 'none'}
              isInvalid={!!errors.phone}>
              <FormControl.Label
                _text={{color: 'black', fontWeight: 600, fontSize: 'md'}}>
                شماره تلفن همراه
              </FormControl.Label>
              <FormControl.HelperText _text={{fontWeight: 600}}>
                شماره تلفن همراه را جهت ارسال کد وارد نموده
              </FormControl.HelperText>
              <Controller
                control={control}
                name={'phone'}
                rules={{required: true, minLength: 11, pattern: /\d+/g}}
                render={({field: {value, onChange, onBlur}}) => (
                  <Input
                    _focus={{bg: 'white'}}
                    bg={'white'}
                    borderWidth={0}
                    fontSize={'lg'}
                    fontWeight={'700'}
                    keyboardType={'numeric'}
                    mt={4}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder={'۰۹۱۵-۱۲۳-۴۵۶۷'}
                    py={4}
                    shadow={4}
                    textAlign={'center'}
                    value={value}
                    variant={'rounded'}
                  />
                )}
              />
              <FormControl.ErrorMessage>
                لطفا شماره تلفن را به درستی وارد کنید
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              display={state.section === 'code' ? 'flex' : 'none'}
              isInvalid={auth?.httpRequestStatus === 'error'}>
              <FormControl.Label
                _text={{color: 'black', fontWeight: 600, fontSize: 'md'}}>
                کد
              </FormControl.Label>
              <FormControl.HelperText _text={{fontWeight: 600}}>
                کد ارسال شده به تلفن همراه خود را وارد کنید
              </FormControl.HelperText>
              <Controller
                control={control}
                name={'code'}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    _focus={{bg: 'white'}}
                    bg={'white'}
                    borderWidth={0}
                    fontSize={'lg'}
                    fontWeight={'700'}
                    keyboardType={'numeric'}
                    mt={4}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder={'۱-۲-۳-۴'}
                    py={4}
                    shadow={4}
                    textAlign={'center'}
                    value={value}
                    variant={'rounded'}
                  />
                )}
              />
              <FormControl.ErrorMessage>
                کد وارد شده صحیح نمی باشد
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onPress={submit}
            isLoading={
              sendCode?.httpRequestStatus === 'loading' ||
              auth?.httpRequestStatus === 'loading'
            }>
            {state.section === 'phone' ? 'بعدی' : 'تایید'}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
});

export default AuthModal;
