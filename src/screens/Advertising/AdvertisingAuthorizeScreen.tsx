import React, {FC, useState} from 'react';
import {CreateAdvertisingLayout} from '~/layout';
import {FormControl, Input, VStack} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {RootParamList} from '~/screens/type';
import {Controller, useForm} from 'react-hook-form';
import {useHttpRequest} from '~/hooks';
import {
  createAdvertisingAfterUploadPhotos,
  syncStorageAction,
} from '~/store/Actions';
import {advertisingClear} from '~/store/slices';

type Props = StackScreenProps<
  RootParamList,
  'createAdvertisingAuthorizeScreen'
>;

const AdvertisingAuthorizeScreen: FC<Props> = ({navigation}) => {
  const [status, setStatus] = useState<'phone' | 'code'>('phone');
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {code: '', phone: ''},
    criteriaMode: 'firstError',
  });
  const {request, dispatch, state} = useHttpRequest({
    selector: state => ({
      sendCode: state.http.sendVerificationCode,
      auth: state.http.verifyCode,
      create: state.http.createAdvertisements,
    }),
    clearAfterUnmount: ['sendVerificationCode'],
    onUpdate: (lastState, state) => {
      if (
        lastState.auth?.httpRequestStatus === 'loading' &&
        state.auth!.httpRequestStatus === 'success'
      ) {
        dispatch(syncStorageAction('update'));
        dispatch(createAdvertisingAfterUploadPhotos());
      }
      if (
        lastState.create?.httpRequestStatus === 'loading' &&
        state.create?.httpRequestStatus === 'success'
      ) {
        const name = state!.create.data!.__typename;
        navigation.reset({
          index: 2,
          routes: [
            {name: 'dashboardScreen'},
            {name: 'advertisingListScreen'},
            {
              name: 'advertisingDetailScreen',
              params: {
                id: state!.create!.data!.data![name]!.id,
              },
            },
          ],
        });
        dispatch(advertisingClear());
      }
    },
  });

  const submit = handleSubmit(values => {
    if (status === 'phone') {
      request('sendVerificationCode', {data: {mobile: values.phone}});
      setStatus('code');
    } else {
      request('verifyCode', {data: {code: values.code, mobile: values.phone}});
    }
  });
  return (
    <CreateAdvertisingLayout
      isLoading={
        ['loading', 'success'].includes(state.auth?.httpRequestStatus!) &&
        state.create?.httpRequestStatus !== 'success'
      }
      validateForNext={() => {
        submit();
        return false;
      }}>
      <VStack px={6}>
        <FormControl
          display={status === 'phone' ? 'flex' : 'none'}
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
        <FormControl display={status === 'code' ? 'flex' : 'none'}>
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
        </FormControl>
      </VStack>
    </CreateAdvertisingLayout>
  );
};

export default AdvertisingAuthorizeScreen;
