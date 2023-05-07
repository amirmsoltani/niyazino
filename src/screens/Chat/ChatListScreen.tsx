import React, {FC} from 'react';
import {MainLayout} from '~/layout';
import {
  Button,
  HStack,
  Image,
  ScrollView,
  Stack,
  StatusBar,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import {useDrawer} from '~/hooks';
import {ChatCard} from '~/components';
import {StackScreenProps} from '@react-navigation/stack';
import {RootParamList} from '~/screens/type';

const menuIcon = require('src/assets/images/menuIcon.png');

type Props = StackScreenProps<RootParamList, 'chatListScreen'>;

const ChatListScreen: FC<Props> = ({navigation}) => {
  const {colors} = useTheme();
  const {setDrawerStatus} = useDrawer();
  return (
    <MainLayout bg={'blueGray.200'}>
      <StatusBar
        backgroundColor={colors.blueGray['200']}
        barStyle={'dark-content'}
      />
      <VStack px={6}>
        <HStack alignItems={'center'} h={14} justifyContent={'space-between'}>
          <Text fontSize={'lg'} fontWeight={'600'}>
            چت نیازینو
          </Text>

          <Button
            _pressed={{bg: 'orange.300'}}
            onPress={() => setDrawerStatus(true)}
            p={2}
            variant={'ghost'}>
            <Image
              alt={'icon'}
              m={0}
              maxH={'30px'}
              maxW={'30px'}
              resizeMode={'contain'}
              source={menuIcon}
            />
          </Button>
        </HStack>
      </VStack>
      <Stack flex={1}>
        <ScrollView>
          <ChatCard
            id={1}
            onPress={() => navigation.navigate('chatScreen', {id: 1})}
            time={'۴۰ دقیقه پیش'}
            title={'خودروی بی.ام.دبلیو ۲۰۰۲ شما را خریداریم'}
            user={'امیر سلطانی'}
          />
          <ChatCard
            id={2}
            onPress={() => navigation.navigate('chatScreen', {id: 2})}
            time={'۴۰ دقیقه پیش'}
            title={'دوچرخه دنده ای کوهستان لازم دارم'}
            user={'اسد خلیلی'}
          />
          <ChatCard
            id={3}
            onPress={() => navigation.navigate('chatScreen', {id: 3})}
            time={'۴۰ دقیقه پیش'}
            title={'خودروی بی.ام.دبلیو ۲۰۰۲ شما را خریداریم'}
            user={'علی صحرایی فر'}
          />
        </ScrollView>
      </Stack>
    </MainLayout>
  );
};

export default ChatListScreen;
