import React, {FC, useEffect} from 'react';
import {VirtualizeMainLayout} from '~/layout';
import {HStack, StatusBar, Text, useTheme, VStack} from 'native-base';
import {ChatCard} from '~/components';
import {StackScreenProps} from '@react-navigation/stack';
import {RootParamList} from '~/screens/type';
import {useAppDispatch, useAppSelector} from '~/hooks/reduxHooks';
import socketEmit from '~/store/Actions/socketEmit.action';
import dayjs from 'dayjs';
import {changeToJalali, regMapToJalali} from '~/util/ChangeToJalali';
import {socketClear} from '~/store/slices';
import {RefreshControl} from 'react-native';

type Props = StackScreenProps<RootParamList, 'chatListScreen'>;

const ChatListScreen: FC<Props> = ({navigation}) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(socketEmit('getChats', 1));

    return () => {
      dispatch(socketClear('getChats'));
    };
  }, []);

  const chats = useAppSelector(state => state.socket.getChats);

  return (
    <VirtualizeMainLayout
      bg={'blueGray.200'}
      data={chats?.data?.data || []}
      header={
        <VStack px={6}>
          <HStack alignItems={'center'} h={14} justifyContent={'space-between'}>
            <Text fontSize={'lg'} fontWeight={'600'}>
              چت نیازینو
            </Text>

            {/*<Button*/}
            {/*  _pressed={{bg: 'orange.300'}}*/}
            {/*  onPress={() => setDrawerStatus(true)}*/}
            {/*  p={2}*/}
            {/*  variant={'ghost'}>*/}
            {/*  <Image*/}
            {/*    alt={'icon'}*/}
            {/*    m={0}*/}
            {/*    maxH={'30px'}*/}
            {/*    maxW={'30px'}*/}
            {/*    resizeMode={'contain'}*/}
            {/*    source={menuIcon}*/}
            {/*  />*/}
            {/*</Button>*/}
          </HStack>
        </VStack>
      }
      hiddenElements={
        <StatusBar
          backgroundColor={colors.blueGray['200']}
          barStyle={'dark-content'}
        />
      }
      refreshControl={
        <RefreshControl
          refreshing={chats?.status === 'loading'}
          onRefresh={() => {
            dispatch(socketClear('getChats'));
            dispatch(socketEmit('getChats', 1));
          }}
        />
      }
      renderItem={({item}) => (
        <ChatCard
          id={item.id}
          isRead={item.readed}
          title={item.title}
          onPress={() =>
            navigation.navigate('chatScreen', {
              adId: item.advertisement_id,
              adTitle: item.title,
              // adImage: item.,
              userId: item.user_id,
              userFirstName: item.first_name || undefined,
              userLastName: item.last_name || undefined,
            })
          }
          time={dayjs(item.created_at * 1000)
            .fromNow()
            .replace(regMapToJalali, changeToJalali)}
          user={
            item.first_name || item.last_name
              ? `${item.first_name} ${item.last_name}`
              : 'بدون نام'
          }
        />
      )}
    />
  );
};

export default ChatListScreen;
