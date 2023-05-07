import React, {FC, useRef} from 'react';
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  ScrollView,
  Stack,
  StatusBar,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import {
  Add,
  Call,
  Chart21,
  Clock,
  Location,
  Menu,
  MessageMinus,
  Setting2,
} from 'iconsax-react-native';
import Carousel from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootParamList} from '~/screens/type';

const car = require('~/assets/images/car.png');
const car2 = require('~/assets/images/car2.png');
const {width} = Dimensions.get('window');

type Props = StackScreenProps<RootParamList, 'advertisingDetailScreen'>;

const AdvertisingDetailScreen: FC<Props> = ({navigation, route}) => {
  const carouselRef = useRef<Carousel<any>>(null);
  const {sizes} = useTheme();

  return (
    <VStack bg={'white'} h={'full'} safeArea>
      <StatusBar backgroundColor={'white'} />
      <HStack
        alignItems={'center'}
        h={14}
        justifyContent={'space-between'}
        px={6}>
        <Text fontSize={'2xl'} fontWeight={700}>
          جزئیات آگهی
        </Text>
        <IconButton
          onPress={() => navigation.goBack()}
          px={0}
          icon={
            <Add
              color={'black'}
              size={40}
              style={{transform: [{rotate: '45deg'}]}}
            />
          }
        />
      </HStack>
      <Stack flex={1}>
        <Stack h={'full'}>
          <ScrollView pt={6} px={6}>
            <Text fontSize={'lg'} fontWeight={600}>
              خودروی بی.ام.دبلیو ۲۰۰۲ شما را خریداریم
            </Text>
            <Text color={'gray.400'} my={6}>
              می توانید یک یا چند مکان مختلف را برای نمایش آگهی خود انتخاب کنید.
              انتخاب حداقال یک مکان الزامی است
              <Text color={'orange.600'} fontWeight={600}>
                {' '}
                بیشتر
              </Text>
            </Text>

            <HStack
              borderBottomWidth={2}
              borderColor={'gray.300'}
              mb={6}
              pb={4}>
              <HStack alignItems={'center'}>
                <Box bg={'gray.200'} mr={2} p={2} rounded={'full'}>
                  <Clock color={'black'} size={20} variant={'TwoTone'} />
                </Box>
                <Text color={'gray.500'} fontSize={'xs'} fontWeight={600}>
                  ۲۴ دقیقه قبل
                </Text>
              </HStack>
              <HStack alignItems={'center'} ml={4}>
                <Box bg={'gray.200'} mr={2} p={2} rounded={'full'}>
                  <Menu color={'black'} size={20} variant={'TwoTone'} />
                </Box>
                <Text color={'gray.500'} fontSize={'xs'} fontWeight={600}>
                  وسیله نقلیه / خودروی سواری
                </Text>
              </HStack>
            </HStack>
            <HStack
              alignItems={'center'}
              borderBottomWidth={2}
              borderColor={'gray.300'}
              justifyContent={'space-between'}
              mb={4}
              pb={4}>
              <HStack alignItems={'center'}>
                <Box bg={'gray.200'} mr={2} p={2} rounded={'full'}>
                  <Chart21 color={'black'} size={20} />
                </Box>
                <Text fontWeight={600}>محدوده قیمت</Text>
              </HStack>
              <Text color={'gray.400'} fontWeight={600}>
                قیمت توافقی
              </Text>
            </HStack>
            <HStack
              alignItems={'flex-start'}
              borderBottomWidth={2}
              borderColor={'gray.300'}
              justifyContent={'space-between'}
              mb={4}
              pb={4}>
              <HStack alignItems={'center'}>
                <Box bg={'gray.200'} mr={2} p={2} rounded={'full'}>
                  <Location color={'black'} size={20} variant={'TwoTone'} />
                </Box>

                <Text fontWeight={600}>موقعیت جغرافیایی</Text>
              </HStack>
              <VStack>
                <Text color={'gray.400'} fontWeight={600}>
                  چهارمحال و بختیاری
                </Text>
                <Text color={'gray.400'} fontWeight={600}>
                  خراسان رضوی
                </Text>
                <Text color={'gray.400'} fontWeight={600}>
                  تهران
                </Text>
              </VStack>
            </HStack>
            <VStack
              borderBottomWidth={2}
              borderColor={'gray.300'}
              mb={6}
              pb={4}>
              <HStack alignItems={'center'} mb={4}>
                <Box bg={'gray.200'} mr={2} p={2} rounded={'full'}>
                  <Setting2 color={'black'} size={20} variant={'TwoTone'} />
                </Box>
                <Text color={'black'} fontSize={'sm'} fontWeight={600}>
                  خصوصیات محصول
                </Text>
              </HStack>
              <HStack justifyContent={'space-between'} mb={4} pl={4}>
                <Text fontWeight={'600'}>تعداد سیلندر</Text>
                <Text color={'gray.400'} fontWeight={600}>
                  ۴ عدد
                </Text>
              </HStack>
              <HStack justifyContent={'space-between'} mb={4} pl={4}>
                <Text fontWeight={'600'}>سال تولید</Text>
                <Text color={'gray.400'} fontWeight={600}>
                  ۱۳۹۶
                </Text>
              </HStack>
              <HStack justifyContent={'space-between'} pl={4}>
                <Text fontWeight={'600'}>شرکت سازنده</Text>
                <Text color={'gray.400'} fontWeight={600}>
                  پژو سیتروئن
                </Text>
              </HStack>
            </VStack>
            <VStack mb={10}>
              <Carousel
                ref={carouselRef}
                data={[1, 2, 3, 4, 5, 6]}
                itemWidth={width - sizes[6] * 2}
                scrollEnabled={false}
                sliderWidth={width - sizes[8] * 2}
                renderItem={({item}) => (
                  <AspectRatio key={item} ratio={16 / 9}>
                    <Image
                      alt={'image'}
                      h={'full'}
                      source={item % 2 === 0 ? car : car2}
                      w={'full'}
                    />
                  </AspectRatio>
                )}
                nestedScrollEnabled
              />
              <Carousel
                data={[1, 2, 3, 4, 5, 6]}
                itemWidth={(width - sizes[8] * 2) / 6}
                sliderWidth={width - sizes[8] * 2}
                onSnapToItem={slideIndex => {
                  carouselRef.current?.snapToItem(slideIndex);
                }}
                renderItem={({item}) => (
                  <AspectRatio
                    key={item}
                    bg={'gray.200'}
                    ratio={16 / 9}
                    rounded={'xl'}>
                    <Image
                      alt={'image'}
                      h={'full'}
                      source={item % 2 === 0 ? car : car2}
                      w={'full'}
                    />
                  </AspectRatio>
                )}
                nestedScrollEnabled
              />
            </VStack>
          </ScrollView>
        </Stack>
      </Stack>
      <HStack h={'20'} justifyContent={'space-between'} pb={6} px={6}>
        <Button
          _text={{fontSize: 'md'}}
          leftIcon={<Call color={'white'} />}
          rounded={'3xl'}
          w={'3/5'}>
          اطلاعات تماس
        </Button>
        <Button
          _text={{color: 'gray.500', fontSize: 'md'}}
          borderColor={'gray.400'}
          borderWidth={2}
          leftIcon={<MessageMinus color={'gray'} />}
          onPress={() => navigation.navigate('chatScreen', {id: 1})}
          rounded={'full'}
          variant={'outline'}
          w={'2/6'}>
          گفتگو
        </Button>
      </HStack>
    </VStack>
  );
};

export default AdvertisingDetailScreen;
