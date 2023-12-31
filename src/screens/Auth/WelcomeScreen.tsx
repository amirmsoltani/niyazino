import React, {FC} from 'react';
import {RootParamList} from '~/screens/type';
import {Center, Image, Spinner, StatusBar, Text, useTheme} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {useWelcome} from '~/hooks';

type Props = StackScreenProps<RootParamList, 'welcomeScreen'>;
const WelcomeScreen: FC<Props> = () => {
  const {colors} = useTheme();
  useWelcome();
  return (
    <Center bg={'orange.600'} h={'full'} w={'full'} safeArea>
      <StatusBar backgroundColor={colors.orange['600']} />
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
