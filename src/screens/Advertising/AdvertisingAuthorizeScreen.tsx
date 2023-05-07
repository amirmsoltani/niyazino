import React, {FC, useState} from 'react';
import {CreateAdvertisingLayout} from '~/layout';
import {FormControl, Input, VStack} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {RootParamList} from '~/screens/type';

type Props = StackScreenProps<
  RootParamList,
  'createAdvertisingAuthorizeScreen'
>;

const AdvertisingAuthorizeScreen: FC<Props> = ({navigation}) => {
  const [status, setStatus] = useState<'phone' | 'code'>('phone');
  return (
    <CreateAdvertisingLayout
      validateForNext={() => {
        if (status === 'phone') {
          setStatus('code');
        } else {
          navigation.reset({
            index: 2,
            routes: [
              {name: 'dashboardScreen'},
              {name: 'advertisingListScreen'},
              {name: 'advertisingDetailScreen', params: {id: 1}},
            ],
          });
        }
        return false;
      }}>
      <VStack px={6}>
        {status === 'phone' ? (
          <FormControl>
            <FormControl.Label
              _text={{color: 'black', fontWeight: 600, fontSize: 'md'}}>
              شماره تلفن همراه
            </FormControl.Label>
            <FormControl.HelperText _text={{fontWeight: 600}}>
              شماره تلفن همراه را جهت ارسال کد وارد نموده
            </FormControl.HelperText>
            <Input
              _focus={{bg: 'white'}}
              bg={'white'}
              borderWidth={0}
              fontSize={'lg'}
              fontWeight={'700'}
              mt={4}
              placeholder={'۰۹۱۵-۱۲۳-۴۵۶۷'}
              py={4}
              shadow={4}
              textAlign={'center'}
              variant={'rounded'}
            />
          </FormControl>
        ) : (
          <FormControl>
            <FormControl.Label
              _text={{color: 'black', fontWeight: 600, fontSize: 'md'}}>
              کد
            </FormControl.Label>
            <FormControl.HelperText _text={{fontWeight: 600}}>
              کد ارسال شده به تلفن همراه خود را وارد کنید
            </FormControl.HelperText>
            <Input
              _focus={{bg: 'white'}}
              bg={'white'}
              borderWidth={0}
              fontSize={'lg'}
              fontWeight={'700'}
              mt={4}
              placeholder={'۱-۲-۳-۴'}
              py={4}
              shadow={4}
              textAlign={'center'}
              variant={'rounded'}
            />
          </FormControl>
        )}
      </VStack>
    </CreateAdvertisingLayout>
  );
};

export default AdvertisingAuthorizeScreen;
