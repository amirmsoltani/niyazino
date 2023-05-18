import React from 'react';
import {CreateAdvertisingLayout} from '~/layout';
import {FormControl, Input, ScrollView, Stack, TextArea} from 'native-base';
import {Controller, useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '~/hooks/reduxHooks';
import {advertisingSetData} from '~/store/slices';

const AdvertisingTitleScreen = () => {
  const dispatch = useAppDispatch();
  const {title, description} = useAppSelector(
    ({advertising: {title, description}}) => ({
      title,
      description,
    }),
  );
  const {
    handleSubmit,
    control,
    getValues,
    formState: {isValid, errors},
  } = useForm({
    defaultValues: {title: title || '', description: description || ''},
    criteriaMode: 'firstError',
  });

  const submit = handleSubmit(data => {
    dispatch(
      advertisingSetData({title: data.title, description: data.description}),
    );
  });
  return (
    <CreateAdvertisingLayout
      goBack={() => {
        const {title, description} = getValues();
        dispatch(
          advertisingSetData({
            title,
            description,
          }),
        );
      }}
      validateForNext={() => {
        submit();
        return isValid;
      }}>
      <ScrollView p={6}>
        <FormControl isInvalid={!!errors.title}>
          <Stack mx={1}>
            <FormControl.Label
              _text={{color: 'black', fontSize: 20, fontWeight: 900}}
              color={'black'}>
              عنوان آگهی
            </FormControl.Label>
            <FormControl.HelperText
              _text={{color: 'gray.400', fontWeight: 600, fontSize: 'sm'}}>
              لطفا یک نام و توضیح مناسب،متناسب با آنچیزی که واقعا لازم دارید
              وارد بفرمائید
            </FormControl.HelperText>
            <Controller
              control={control}
              name={'title'}
              rules={{required: true, maxLength: 250}}
              render={({field: {onChange, value, onBlur}}) => (
                <Input
                  _focus={{bg: 'white'}}
                  bg={'white'}
                  borderWidth={0}
                  fontSize={'md'}
                  fontWeight={600}
                  h={'14'}
                  mt={4}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="عنوان آگهی را اینجا وارد کنید"
                  shadow={4}
                  textAlign={'center'}
                  value={value}
                  variant={'rounded'}
                />
              )}
            />

            <FormControl.ErrorMessage>
              لطفا عنوان آگهی را به درستی وارد کنید
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
        <FormControl isInvalid={!!errors.description} mb={6} mt={4}>
          <Stack mx={1}>
            <FormControl.Label
              _text={{color: 'black', fontSize: 20, fontWeight: 900}}
              color={'black'}>
              توضیحات
            </FormControl.Label>
            <FormControl.HelperText
              _text={{color: 'gray.400', fontWeight: 600, fontSize: 'sm'}}>
              جزئیات و نکات قابل توجه آگهی خود را به شکل کامل و دقیق درج کنید.
              نوشتن اطلاعات تماس غیر مجاز است
            </FormControl.HelperText>
            <Controller
              control={control}
              name={'description'}
              rules={{required: true, maxLength: 1000}}
              render={({field: {onChange, value, onBlur}}) => (
                <TextArea
                  _focus={{bg: 'white'}}
                  autoCompleteType={undefined}
                  bg={'white'}
                  borderWidth={0}
                  fontSize={'md'}
                  fontWeight={600}
                  h={40}
                  mt={4}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  p={4}
                  placeholder="توضیحات آگهی را اینجا درج کنید"
                  rounded={'3xl'}
                  shadow={4}
                  textAlign={'right'}
                  value={value}
                  variant={'rounded'}
                />
              )}
            />

            <FormControl.ErrorMessage>
              لطفا توضیحات را کامل کنید
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
      </ScrollView>
    </CreateAdvertisingLayout>
  );
};

export default AdvertisingTitleScreen;
