import React, {FC, useEffect} from 'react';
import {RootParamList} from '~/screens/type';
import {Center, Image, Spinner, Text} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<RootParamList, 'welcomeScreen'>;
const WelcomeScreen: FC<Props> = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('dashboardScreen');
    }, 2000);
  });
  return (
    <Center bg={'orange.600'} h={'full'} w={'full'} safeArea>
      <Center maxW={'full'} w={'full'}>
        <Image
          alt="logo"
          h={'28'}
          resizeMode={'center'}
          source={require('~/assets/images/logoWhite.png')}
          width={'64'}
        />
        <Text color={'white'} fontSize={'xl'} fontWeight={'600'}>
          عصری نو، نیازی نو
        </Text>
        <Spinner color={'white'} mt={8} size={'lg'} />
      </Center>
    </Center>
  );
};

export default WelcomeScreen;
