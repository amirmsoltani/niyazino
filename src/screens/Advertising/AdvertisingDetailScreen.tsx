import React, {FC, useRef} from 'react';
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  ScrollView,
  Skeleton,
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
import {useHttpRequest} from '~/hooks';
import dayjs from 'dayjs';
import {changeToJalali, regMapToJalali} from '~/util/ChangeToJalali';

const car = require('~/assets/images/car.png');
const car2 = require('~/assets/images/car2.png');
const {width} = Dimensions.get('window');

type Props = StackScreenProps<RootParamList, 'advertisingDetailScreen'>;

const AdvertisingDetailScreen: FC<Props> = ({navigation, route}) => {
  const carouselRef = useRef<Carousel<any>>(null);
  const {sizes} = useTheme();
  const {
    state: {detail, category, provinceList, districtList, cityLst},
    request,
  } = useHttpRequest({
    selector: state => ({
      detail: state.http.detailAdvertisements,
      category: state.categories,
      provinceList: state.http.provinceList,
      cityLst: state.http.cityList,
      districtList: state.http.districtList,
    }),
    clearAfterUnmount: ['detailAdvertisements'],
    initialRequests: request => {
      request('detailAdvertisements', {params: {id: route.params.id}});
    },
    onUpdate: (lastState, state) => {
      if (
        lastState.detail?.httpRequestStatus === 'loading' &&
        state.detail!.httpRequestStatus === 'success'
      ) {
        request('cityList', {
          params: {
            id: state.detail!.data!.data[state.detail!.data!.__typename]
              .province_id,
          },
        });
        request('districtList', {
          params: {
            id: state.detail!.data!.data[state.detail!.data!.__typename]
              .city_id,
          },
        });
      }
    },
  });

  const loadingSection = () => (
    <VStack flex={1} px={6} space={5}>
      <Skeleton h={'32'} rounded={'xl'} />
      <Skeleton h={'20'} rounded={'xl'} />
      <Skeleton rounded={'xl'} />
      <Skeleton rounded={'xl'} />
      <Skeleton rounded={'xl'} />
      <Skeleton h={'3xs'} rounded={'xl'} />
    </VStack>
  );
  const detailSection = () => {
    const data = detail!.data!.data[detail!.data!.__typename];
    const selectedCategory =
      category.categoriesObject[category.childrenToParent[data.category_id]];
    const districtIds = (data.districts_ids as string)?.split(',') || [];
    return (
      <Stack flex={1}>
        <Stack h={'full'}>
          <ScrollView pt={6} px={6}>
            <Text fontSize={'lg'} fontWeight={600}>
              {data.title}
            </Text>
            <Text color={'gray.400'} my={6}>
              {data.description}
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
                  {dayjs(data.created_at)
                    .fromNow()
                    .replace(regMapToJalali, changeToJalali)}
                </Text>
              </HStack>
              <HStack alignItems={'center'} ml={4}>
                <Box bg={'gray.200'} mr={2} p={2} rounded={'full'}>
                  <Menu color={'black'} size={20} variant={'TwoTone'} />
                </Box>
                <Text color={'gray.500'} fontSize={'xs'} fontWeight={600}>
                  {selectedCategory.title}/{' '}
                  {selectedCategory.children[data.category_id].title}
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
                  {
                    provinceList?.data?.data[
                      provinceList!.data!.__typename
                    ].find(province => province.id === data.province_id)?.name
                  }
                </Text>
                <Text color={'gray.400'} fontWeight={600}>
                  {
                    cityLst?.data?.data[cityLst!.data!.__typename].find(
                      city => city.id === data.city_id,
                    )?.name
                  }
                </Text>

                {districtList?.data?.data[districtList!.data!.__typename]
                  .filter(district =>
                    districtIds.includes(district.id.toString()),
                  )
                  .map(district => (
                    <Text key={district.id} color={'gray.400'} fontWeight={600}>
                      {district.name}
                    </Text>
                  ))}
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
    );
  };
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
        {detail?.httpRequestStatus === 'success' ? detailSection() : null}
        {detail?.httpRequestStatus === 'loading' ? loadingSection() : null}
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
