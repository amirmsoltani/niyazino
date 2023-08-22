import React, {FC, useRef, useState} from 'react';
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Pressable,
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
import {Dimensions, Modal} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootParamList} from '~/screens/type';
import {useHttpRequest} from '~/hooks';
import dayjs from 'dayjs';
import {
  changeToJalali,
  convertNumToPersian,
  regMapToJalali,
} from '~/util/ChangeToJalali';
import {findParentCategory} from '~/util/FindParentCategory';
import {mapPrice} from '~/util/MapPrice';
import {priceFormat} from '~/util/PriceFormat';
import ImageView from 'react-native-image-zoom-viewer';
import {
  AuthModal,
  AuthModalRef,
  ContactInformationModal,
  ContactInformationModalRef,
  UserDataModal,
  UserDataModalRef,
} from '~/components';

const {width} = Dimensions.get('window');

type Props = StackScreenProps<RootParamList, 'advertisingDetailScreen'>;

const AdvertisingDetailScreen: FC<Props> = ({navigation, route}) => {
  const carouselRef = useRef<Carousel<any>>(null);
  const authRef = useRef<AuthModalRef>(null);
  const userDataRef = useRef<UserDataModalRef>(null);
  const contactRef = useRef<ContactInformationModalRef>(null);
  const [preview, setPreview] = useState<number | undefined>(undefined);
  const {sizes} = useTheme();
  const {
    state: {detail, category, isLogin, contact, self},
    request,
  } = useHttpRequest({
    selector: state => ({
      detail: state.http.detailAdvertisements,
      category: state.categories,
      isLogin: state.http.verifyCode?.httpRequestStatus === 'success',
      contact: state.http.contactInfo,
      self: state.http.getMe,
    }),
    clearAfterUnmount: ['detailAdvertisements'],
    initialRequests: request => {
      request('detailAdvertisements', {params: {id: route.params.id}});
    },
    onUpdate: (lastState, state) => {
      if (
        lastState.contact?.httpRequestStatus === 'loading' &&
        state.contact?.httpRequestStatus === 'success'
      ) {
        contactRef.current?.setStatus(true);
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
      category.categoriesObject[
        findParentCategory(data.category_id, category.categoriesObject)[0]
      ];
    return (
      <Stack flex={1}>
        <Modal
          visible={preview !== undefined}
          onRequestClose={() => {
            setPreview(undefined);
          }}
          transparent>
          <ImageView
            imageUrls={data.images.map(image => ({url: image}))}
            index={preview}
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
        <AuthModal ref={authRef} />
        <UserDataModal ref={userDataRef} />
        <ContactInformationModal
          ref={contactRef}
          phoneNumber={contact?.data?.data?.mobile || ''}
        />
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
                  {category.categoriesObject[data.category_id].title}
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
                {data.min_price && data.max_price
                  ? `${
                      data.min_price in mapPrice
                        ? mapPrice[data.min_price as keyof typeof mapPrice]
                        : priceFormat(data.min_price)
                    } تا ${
                      data.max_price in mapPrice
                        ? mapPrice[data.max_price as keyof typeof mapPrice]
                        : priceFormat(data.max_price)
                    } تومان`
                  : 'قیمت توافقی'}
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
                  {data.province.name}
                </Text>
                <Text color={'gray.400'} fontWeight={600}>
                  {data.city.name}
                </Text>

                {data.districts.length ? (
                  data.districts.map(district => (
                    <Text key={district.id} color={'gray.400'} fontWeight={600}>
                      {district.name}
                    </Text>
                  ))
                ) : (
                  <Text color={'gray.400'} fontWeight={600}>
                    همه محله ها
                  </Text>
                )}
              </VStack>
            </HStack>
            {data.attributes?.length ? (
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
                {data.attributes?.map(attribute => (
                  <HStack
                    key={attribute.id}
                    justifyContent={'space-between'}
                    mb={4}
                    pl={4}>
                    <Text fontWeight={'600'}>{attribute.attribute.title}</Text>
                    <Text color={'gray.400'} fontWeight={600}>
                      {attribute.attribute.type === 'select'
                        ? attribute.option?.title || ''
                        : attribute.attribute.type === 'integer'
                        ? convertNumToPersian(attribute.value || '')
                        : attribute.value}
                    </Text>
                  </HStack>
                ))}

                {/*<HStack justifyContent={'space-between'} mb={4} pl={4}>*/}
                {/*  <Text fontWeight={'600'}>سال تولید</Text>*/}
                {/*  <Text color={'gray.400'} fontWeight={600}>*/}
                {/*    ۱۳۹۶*/}
                {/*  </Text>*/}
                {/*</HStack>*/}
                {/*<HStack justifyContent={'space-between'} pl={4}>*/}
                {/*  <Text fontWeight={'600'}>شرکت سازنده</Text>*/}
                {/*  <Text color={'gray.400'} fontWeight={600}>*/}
                {/*    پژو سیتروئن*/}
                {/*  </Text>*/}
                {/*</HStack>*/}
              </VStack>
            ) : null}
            {data.images.length ? (
              <VStack mb={10}>
                <Carousel
                  ref={carouselRef}
                  data={data.images}
                  itemWidth={width - sizes[6] * 2}
                  scrollEnabled={false}
                  sliderWidth={width - sizes[8] * 2}
                  renderItem={({item, index}) => (
                    <Pressable
                      onPress={() => {
                        setPreview(index);
                      }}>
                      <AspectRatio key={item} ratio={16 / 9}>
                        <Image
                          alt={'image'}
                          h={'full'}
                          source={{uri: item}}
                          w={'full'}
                        />
                      </AspectRatio>
                    </Pressable>
                  )}
                  nestedScrollEnabled
                />
                <Carousel
                  data={data.images}
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
                        source={{uri: item}}
                        w={'full'}
                      />
                    </AspectRatio>
                  )}
                  nestedScrollEnabled
                />
              </VStack>
            ) : null}
          </ScrollView>
        </Stack>
      </Stack>
    );
  };

  const data = detail?.data?.data[detail?.data?.__typename];
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
          isLoading={contact?.httpRequestStatus === 'loading'}
          leftIcon={<Call color={'white'} />}
          rounded={'3xl'}
          w={'3/5'}
          onPress={() => {
            if (isLogin) {
              request('contactInfo', {params: {id: route.params.id}});
            } else {
              authRef.current?.setStatus(true);
            }
          }}>
          اطلاعات تماس
        </Button>
        <Button
          _text={{color: 'gray.500', fontSize: 'md'}}
          borderColor={'gray.400'}
          borderWidth={2}
          disabled={!data}
          leftIcon={<MessageMinus color={'gray'} />}
          rounded={'full'}
          variant={'outline'}
          w={'2/6'}
          onPress={() => {
            if (isLogin) {
              navigation.navigate('chatScreen', {
                adId: data?.id || 0,
                adImage: data?.images.length ? data.images[0] : undefined,
                adTitle: data?.title || '',
                userId: data?.user_id || 0,
              });
            } else if (
              self?.httpRequestStatus === 'success' &&
              self.data?.data.user.first_name === null
            ) {
              return userDataRef.current?.setStatus(true);
            } else {
              authRef.current?.setStatus(true);
            }
          }}>
          گفتگو
        </Button>
      </HStack>
    </VStack>
  );
};

export default AdvertisingDetailScreen;
