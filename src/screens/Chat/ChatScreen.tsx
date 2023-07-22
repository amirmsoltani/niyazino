import React, {FC, useEffect} from 'react';
import {
  Box,
  FormControl,
  HStack,
  IconButton,
  Input,
  ScrollView,
  Stack,
  StatusBar,
  Text,
  VStack,
} from 'native-base';
import {ArrowLeft, CameraSlash, Send} from 'iconsax-react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootParamList} from '~/screens/type';
import socketEmit from '~/store/Actions/socketEmit.action';
import {useDispatch} from 'react-redux';

type Props = StackScreenProps<RootParamList, 'chatScreen'>;

const ChatScreen: FC<Props> = ({navigation, route}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      socketEmit('submitMessage', {
        advertisement_id: route.params.adId,
        content: 'aaa',
        image: false,
        to_id: route.params.userId,
      }),
    );
  }, []);
  return (
    <VStack bg={'white'} h={'full'} safeArea>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

      <HStack alignItems={'center'} justifyContent={'space-between'} px={4}>
        <Text fontSize={'lg'} fontWeight={'600'}>
          امیر سلطانی
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
          خودروی بی.ام.دبلیو ۲۰۰۲ شما را خریداریم
        </Text>
      </HStack>
      <Stack flex={1}>
        <ScrollView px={4} py={2} style={{transform: [{rotate: '180deg'}]}}>
          <HStack justifyContent={'flex-end'} px={1} py={2}>
            <HStack
              bg={'orange.100'}
              p={2}
              pr={6}
              rounded={'lg'}
              roundedRight={'full'}
              shadow={1}
              style={{transform: [{rotate: '180deg'}]}}>
              <Text
                alignSelf={'flex-end'}
                fontSize={'2xs'}
                fontWeight={500}
                mr={2}>
                ۵:۳۹ PM
              </Text>
              <Text fontSize={'sm'} fontWeight={'500'}>
                سلام ماشین مدل ۲۰۰۲ دارم
              </Text>
            </HStack>
          </HStack>
          <HStack justifyContent={'flex-start'} px={1} py={2}>
            <HStack
              bg={'warmGray.100'}
              px={3}
              py={2}
              rounded={'lg'}
              roundedLeft={'full'}
              shadow={1}
              style={{transform: [{rotate: '180deg'}]}}>
              <Text
                alignSelf={'flex-end'}
                fontSize={'2xs'}
                fontWeight={500}
                mr={2}>
                ۵:۳۹ PM
              </Text>
              <Text fontSize={'sm'} fontWeight={'500'}>
                قیمت چند؟
              </Text>
            </HStack>
          </HStack>
        </ScrollView>
      </Stack>
      <HStack bg={'gray.100'} h={'20'} p={4} w={'full'}>
        <IconButton
          icon={<Send color={'black'} />}
          mr={1}
          p={2}
          rounded={'full'}
        />

        <FormControl flex={1}>
          <Input
            bg={'white'}
            flex={1}
            fontWeight={'500'}
            h={'16'}
            placeholder={'پیامی بنویسید'}
            textAlign={'right'}
            variant={'rounded'}
          />
        </FormControl>
      </HStack>
    </VStack>
  );
};

export default ChatScreen;
