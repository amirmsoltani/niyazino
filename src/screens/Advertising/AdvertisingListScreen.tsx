import React, {FC, useRef} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootParamList} from '~/screens/type';
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Input,
  Pressable,
  ScrollView,
  Stack,
  StatusBar,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import {useDrawer} from '~/hooks';
import {MainLayout} from '~/layout';
import {Add, Filter, Location, Menu, SearchNormal1} from 'iconsax-react-native';
import {
  SelectLocationModal,
  SelectLocationModalRef,
  AdvertisingCard,
} from '~/components';

type Props = StackScreenProps<RootParamList, 'advertisingListScreen'>;

const menuIcon = require('src/assets/images/menuIcon.png');

const AdvertisingListScreen: FC<Props> = ({navigation}) => {
  const selectLocationRef = useRef<SelectLocationModalRef>(null);
  const onPress = (id: number) => {
    navigation.navigate('advertisingDetailScreen', {id});
  };
  const {setDrawerStatus} = useDrawer();
  const {colors} = useTheme();
  return (
    <MainLayout bg={'blueGray.200'}>
      <SelectLocationModal ref={selectLocationRef} />
      <StatusBar
        backgroundColor={colors.blueGray['200']}
        barStyle={'dark-content'}
      />
      <VStack px={6}>
        <HStack h={14} justifyContent={'space-between'}>
          <AspectRatio ratio={16 / 9}>
            <Image
              alt={'logo'}
              h={'full'}
              resizeMode={'contain'}
              source={require('~/assets/images/logoOrange.png')}
              w={'full'}
            />
          </AspectRatio>
          <HStack alignItems={'center'}>
            <Box mr={6}>
              <IconButton
                bg={'white'}
                onPress={() => selectLocationRef.current!.setStatus(true)}
                p={3}
                rounded={'full'}
                icon={
                  <Location color={'black'} size={18} variant={'TwoTone'} />
                }
              />
              <Box
                alignItems={'center'}
                bg={'orange.600'}
                h={4}
                justifyContent={'center'}
                left={-4}
                position={'absolute'}
                rounded={'full'}
                top={-4}
                w={4}
                zIndex={1}>
                <Text color={'white'} fontSize={'2xs'}>
                  ۴
                </Text>
              </Box>
            </Box>
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
        </HStack>
        <Input
          bg={'white'}
          borderWidth={0}
          fontSize={'md'}
          fontWeight={500}
          mt={4}
          placeholder={'جستجو در میان آگهی ها'}
          shadow={4}
          variant={'rounded'}
          leftElement={
            <Box pl={4}>
              <SearchNormal1 color="black" size={20} />
            </Box>
          }
        />
        <HStack alignItems={'center'} mt={4}>
          <Pressable
            _pressed={{bg: 'orange.300'}}
            alignItems={'center'}
            bg={'white'}
            flexDirection={'row'}
            mr={4}
            p={3}
            pl={12}
            rounded={'full'}
            shadow={4}
            w={'78%'}>
            <Box
              bg={'white'}
              p={3}
              position={'absolute'}
              rounded={'full'}
              shadow={6}>
              <Menu color={'black'} variant={'TwoTone'} />
            </Box>
            <Text fontSize={'xs'} fontWeight={500} ml={2}>
              دسته بندی:
            </Text>
            <Text fontWeight={'700'}>مشخص نشده</Text>
          </Pressable>
          <Pressable
            _pressed={{bg: 'orange.400'}}
            alignItems={'flex-end'}
            bg={'orange.600'}
            flexGrow={1}
            h={8}
            justifyContent={'center'}
            px={2}
            rounded={'full'}>
            <Box
              bg={'white'}
              left={0}
              p={3}
              position={'absolute'}
              rounded={'full'}>
              <Filter color={'black'} size={14} />
            </Box>
            <Add
              color={'white'}
              size={18}
              style={{transform: [{rotate: '45deg'}]}}
            />
          </Pressable>
        </HStack>
        <HStack flexWrap={'wrap'} mt={4} space={'sm'}>
          <Pressable
            alignItems={'center'}
            bg={'black'}
            flexDirection={'row'}
            p={2}
            rounded={'full'}>
            <Text color={'white'} fontSize={'md'}>
              مدل ۹۶
            </Text>
            <Add
              color={'white'}
              size={30}
              style={{transform: [{rotate: '45deg'}]}}
            />
          </Pressable>
          <Pressable
            alignItems={'center'}
            bg={'black'}
            flexDirection={'row'}
            px={5}
            py={2}
            rounded={'full'}>
            <Text color={'white'} fontSize={'md'}>
              آکبند
            </Text>
            <Add
              color={'white'}
              size={30}
              style={{transform: [{rotate: '45deg'}]}}
            />
          </Pressable>
          <Pressable
            alignItems={'center'}
            bg={'black'}
            flexDirection={'row'}
            px={5}
            py={2}
            rounded={'full'}>
            <Text color={'white'} fontSize={'md'}>
              پژو
            </Text>
            <Add
              color={'white'}
              size={30}
              style={{transform: [{rotate: '45deg'}]}}
            />
          </Pressable>
        </HStack>
      </VStack>
      <Stack flex={1}>
        <ScrollView _contentContainerStyle={{pb: 8}} p={2} nestedScrollEnabled>
          <AdvertisingCard
            category={'وسایل نقلیه / خودروی سواری'}
            id={1}
            onPress={onPress}
            price={'سیصد تا هفصد میلیون تومان'}
            time={'۴۰ دقیقه پیش'}
            title={'خودروی بی.ام.دبلیو ۲۰۰۲ شما را خریداریم'}
          />
          <AdvertisingCard
            category={'وسایل نقلیه / دوچرخه'}
            id={1}
            onPress={onPress}
            price={'هزار تا دوهزار تومان'}
            time={'۴۰ دقیقه پیش'}
            title={'دوچرخه دنده ای کوهستان لازم دارم'}
          />
          <AdvertisingCard
            category={'وسایل نقلیه / خودروی سواری'}
            id={1}
            onPress={onPress}
            price={'توافقی'}
            time={'۴۰ دقیقه پیش'}
            title={'خودروی بی.ام.دبلیو ۲۰۰۲ شما را خریداریم'}
          />
        </ScrollView>
      </Stack>
    </MainLayout>
  );
};

export default AdvertisingListScreen;
