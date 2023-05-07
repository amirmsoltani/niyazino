import React from 'react';
import {CreateAdvertisingLayout} from '~/layout';
import {FormControl, Input, ScrollView, Stack, TextArea} from 'native-base';

const AdvertisingTitleScreen = () => {
  return (
    <CreateAdvertisingLayout>
      <ScrollView p={6}>
        <FormControl isInvalid>
          <Stack alignItems={'flex-end'} mx={1}>
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
            <Input
              _focus={{bg: 'white'}}
              bg={'white'}
              borderWidth={0}
              fontSize={'md'}
              fontWeight={600}
              h={'14'}
              mt={4}
              placeholder="عنوان آگهی را اینجا وارد کنید"
              shadow={4}
              textAlign={'center'}
              variant={'rounded'}
            />

            <FormControl.ErrorMessage>
              لطفا عنوان آگهی را به درستی وارد کنید
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
        <FormControl isInvalid>
          <Stack alignItems={'flex-end'} mx={1}>
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
            <TextArea
              _focus={{bg: 'white'}}
              autoCompleteType={undefined}
              bg={'white'}
              borderWidth={0}
              fontSize={'md'}
              fontWeight={600}
              h={40}
              mt={4}
              p={4}
              placeholder="توضیحات آگهی را اینجا درج کنید"
              rounded={'3xl'}
              shadow={4}
              textAlign={'right'}
              variant={'rounded'}
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
