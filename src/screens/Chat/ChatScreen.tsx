import React, {FC, useEffect, useState} from 'react';
import {
  Box,
  FormControl,
  HStack,
  IconButton,
  Input,
  Pressable,
  ScrollView,
  Stack,
  StatusBar,
  Text,
  VStack,
} from 'native-base';
import {
  Add,
  ArrowLeft,
  CameraSlash,
  Paperclip,
  Send,
} from 'iconsax-react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootParamList} from '~/screens/type';
import {useDispatch} from 'react-redux';
import socketEmit from '~/store/Actions/socketEmit.action';
import {useAppSelector} from '~/hooks/reduxHooks';
import dayjs from 'dayjs';
import {socketClear} from '~/store/slices';
import {convertNumToPersian} from '~/util/ChangeToJalali';
import {Image, Modal, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageView from 'react-native-image-zoom-viewer';

type Props = StackScreenProps<RootParamList, 'chatScreen'>;

const itemProps = {
  another: {
    bg: 'warmGray.100',
    roundedLeft: '24px',
    px: 3,
    py: 2,
  },
  self: {
    bg: 'orange.100',
    p: 2,
    pr: 6,
    roundedRight: '24px',
  },
};
const ChatScreen: FC<Props> = ({navigation, route}) => {
  const dispatch = useDispatch();
  const messages = useAppSelector(state => state.socket.getMessages);
  const [preview, setPreview] = useState<undefined | string>(undefined);
  useEffect(() => {
    dispatch(
      socketEmit('getMessages', {
        advertisement_id: route.params.adId,
        page: 1,
        user_id: route.params.userId,
      }),
    );
    dispatch(socketEmit('readMessage', route.params.adId));
    return () => {
      dispatch(socketClear('getMessages'));
    };
  }, []);
  const [message, setMessage] = useState('');
  const sendMessage = () => {
    dispatch(
      socketEmit('submitMessage', {
        advertisement_id: route.params.adId,
        to_id: route.params.userId,
        content: message,
        image: false,
      }),
    );
    setMessage('');
  };

  const sendImage = () => {
    launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.4,
    }).then(response => {
      if (!response.didCancel) {
        const asset = response.assets![0];
        if (asset.fileSize! > 1024 * 1024 * 4) {
          return;
        }
        dispatch(
          socketEmit('submitMessage', {
            image: false,
            content: `data:${asset.type!};base64,${asset.base64!}`,
            to_id: route.params.userId,
            advertisement_id: route.params.adId,
          }),
        );
      }
    });
  };

  return (
    <VStack bg={'white'} h={'full'} safeArea>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

      <HStack alignItems={'center'} justifyContent={'space-between'} px={4}>
        <Text fontSize={'lg'} fontWeight={'600'}>
          {!route.params.userFirstName
            ? 'کاربر بدون نام'
            : `${route.params.userFirstName} ${route.params.userLastName!}`}
        </Text>
        <IconButton
          icon={<ArrowLeft color={'black'} size={28} />}
          onPress={() => navigation.goBack()}
          p={0}
        />
      </HStack>
      <HStack alignItems={'center'} bg={'gray.100'} mt={4} px={4} py={2}>
        <Box bg={'orange.100'} p={2} rounded={'2xl'}>
          <CameraSlash color={'black'} size={28} />
        </Box>
        <Text color={'gray.500'} fontSize={'xs'} fontWeight={'600'} ml={'2'}>
          {route.params.adTitle}
        </Text>
      </HStack>
      <Stack flex={1}>
        <ScrollView
          _contentContainerStyle={{pb: 4}}
          px={4}
          py={2}
          style={{transform: [{rotate: '180deg'}]}}>
          {messages?.data?.data.map(message => {
            const isBig2000 = message.content?.length > 2000;
            const isImage = message.content?.includes(';base64,');
            return (
              <HStack
                key={message.created_at + message.id}
                px={1}
                py={2}
                justifyContent={
                  message.from_id === route.params.userId
                    ? 'flex-start'
                    : 'flex-end'
                }>
                <Stack
                  minW={24}
                  pb={3}
                  shadow={1}
                  style={[
                    {transform: [{rotate: '180deg'}]},
                    isImage ? {paddingRight: 8, paddingLeft: 8} : null,
                  ]}
                  {...(message.from_id === route.params.userId
                    ? itemProps.another
                    : itemProps.self)}
                  maxW={'5/6'}>
                  {isImage || isBig2000 ? (
                    isBig2000 && !isImage ? null : (
                      <Pressable
                        onPress={() => {
                          setPreview(message.content);
                        }}>
                        <Image
                          alt={'image'}
                          resizeMode={'cover'}
                          source={{
                            uri: message.content,
                          }}
                          style={{
                            width: '100%',
                            aspectRatio: 1,
                            marginBottom: 4,
                            borderRadius: 12,
                          }}
                        />
                      </Pressable>
                    )
                  ) : (
                    <Text fontSize={'sm'} fontWeight={'500'}>
                      {message.content}
                    </Text>
                  )}
                  <Text
                    alignSelf={'flex-start'}
                    bottom={0}
                    fontSize={8}
                    fontWeight={500}
                    left={3}
                    position={'absolute'}>
                    {convertNumToPersian(
                      dayjs(message.created_at * 1000)
                        .locale('fa')
                        .fromNow(),
                    )}{' '}
                    {/*{message.from_id !== route.params.userId ? (*/}
                    {/*  <Text fontSize={'8px'} letterSpacing={-3}>*/}
                    {/*    &#x2713;*/}
                    {/*    {message.readed ? '\u2713' : null}*/}
                    {/*  </Text>*/}
                    {/*) : null}*/}
                  </Text>
                </Stack>
              </HStack>
            );
          })}
        </ScrollView>
      </Stack>
      <HStack
        alignItems={'center'}
        bg={'gray.100'}
        maxH={'40'}
        minH={'20'}
        p={4}
        w={'full'}>
        <TouchableOpacity
          onPress={message.length ? sendMessage : sendImage}
          style={{marginRight: 4, padding: 2}}>
          {message ? <Send color={'black'} /> : <Paperclip color={'black'} />}
        </TouchableOpacity>

        <FormControl
          flex={1}
          minH={`${36 + 14 * Math.min(message?.split('\n').length, 6)}px`}>
          <Input
            bg={'white'}
            flex={1}
            fontWeight={'500'}
            numberOfLines={5}
            onChangeText={message => setMessage(message)}
            placeholder={'پیامی بنویسید'}
            rounded={'24px'}
            textAlign={'right'}
            value={message}
            variant={'rounded'}
            multiline
          />
        </FormControl>
      </HStack>
      <Modal
        visible={!!preview}
        onRequestClose={() => {
          setPreview(undefined);
        }}
        transparent>
        <ImageView
          imageUrls={[
            {
              url: preview!,
            },
          ]}
          renderHeader={() => (
            <HStack justifyContent={'flex-end'}>
              <IconButton
                icon={<Add color={'white'} rotation={45} size={32} />}
                onPress={() => {
                  setPreview(undefined);
                }}
              />
            </HStack>
          )}
        />
      </Modal>
    </VStack>
  );
};

export default ChatScreen;
