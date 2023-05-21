import React, {FC, useRef, useState} from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  HStack,
  IconButton,
  Image,
  Pressable,
  ScrollView,
  Spinner,
  Stack,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import {CreateAdvertisingLayout} from '~/layout';
import {Add, Location} from 'iconsax-react-native';
import {
  PricePickerModal,
  PricePickerModalRef,
  SelectLocationModal,
  SelectLocationModalRef,
  SelectSpecificationsActionSheet,
  SelectSpecificationsActionSheetRef,
} from '~/components';
import {launchImageLibrary} from 'react-native-image-picker';
import {Dimensions} from 'react-native';
import {useHttpRequest} from '~/hooks';
import {advertisingClear, setRemoveAssets} from '~/store/slices';
import {createAdvertisingAfterUploadPhotos} from '~/store/Actions';
import {StackScreenProps} from '@react-navigation/stack';
import {RootParamList} from '~/screens/type';

const {width} = Dimensions.get('window');

type Props = StackScreenProps<
  RootParamList,
  'createAdvertisingSpecificationsScreen'
>;
const AdvertisingSpecificationsScreen: FC<Props> = ({navigation}) => {
  const {
    dispatch,
    state: {districts_ids, districtsList, images, auth, isLoading, upload},
  } = useHttpRequest({
    selector: state => ({
      districts_ids: state.advertising.districts_ids,
      districtsList: state.http.districtList,
      images: state.advertising.assets,
      auth: state.http.verifyCode,
      isLoading: [
        state.http.uploadFile?.httpRequestStatus,
        state.http.createAdvertisements?.httpRequestStatus,
      ].includes('loading'),
      create: state.http.createAdvertisements,
      upload: state.http.uploadFile,
    }),
    onUpdate: (lastState, state) => {
      if (
        lastState.create?.httpRequestStatus === 'loading' &&
        state.create?.httpRequestStatus === 'success'
      ) {
        const name = state!.create.data!.__typename;
        navigation.reset({
          index: 2,
          routes: [
            {name: 'dashboardScreen'},
            {name: 'advertisingListScreen'},
            {
              name: 'advertisingDetailScreen',
              params: {
                id: state!.create!.data!.data![name]!.id,
              },
            },
          ],
        });
        dispatch(advertisingClear());
      }
    },
  });
  const [dirty, setDirty] = useState(false);
  const locationModalRef = useRef<SelectLocationModalRef>(null);
  const specificationRef = useRef<SelectSpecificationsActionSheetRef>(null);
  const pricePickerRef = useRef<PricePickerModalRef>(null);
  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'}).then(response => {
      if (!response.didCancel) {
        dispatch(setRemoveAssets(response.assets![0]));
      }
    });
  };
  const {colors, sizes} = useTheme();
  const [agreedPrice, setAgreedPrice] = useState(false);
  return (
    <CreateAdvertisingLayout
      isLoading={isLoading}
      validateForNext={() => {
        setDirty(true);
        if (!districts_ids?.length) {
          return false;
        }
        if (auth?.httpRequestStatus === 'success') {
          dispatch(createAdvertisingAfterUploadPhotos());
          return false;
        }
        return true;
      }}>
      <SelectLocationModal ref={locationModalRef} />
      <SelectSpecificationsActionSheet ref={specificationRef} />
      <PricePickerModal ref={pricePickerRef} />
      <Stack
        alignItems={'center'}
        bg={'#00000060'}
        bottom={0}
        display={upload?.httpRequestStatus === 'loading' ? 'flex' : 'none'}
        justifyContent={'center'}
        left={0}
        position={'absolute'}
        right={0}
        top={0}
        zIndex={100}>
        <VStack bg={'white'} padding={6} rounded={'xl'} shadow={8}>
          <Text>آپلود تصاویر</Text>
          <Spinner mt={2} size={'lg'} />
        </VStack>
      </Stack>
      <ScrollView p={6}>
        <FormControl isInvalid={!districts_ids?.length && dirty}>
          <Stack mx={1}>
            <FormControl.Label
              _text={{color: 'black', fontSize: 20, fontWeight: 700}}
              color={'black'}>
              محدوده جغرافیایی
            </FormControl.Label>
            <FormControl.HelperText
              _text={{color: 'gray.400', fontWeight: 600, fontSize: 'sm'}}>
              میتوانید یک یا چند مکان را برای نمایش آگهی خود انتخاب کنید. انتخاب
              حداقال یک مکان الزامی است
            </FormControl.HelperText>
            <HStack alignItems={'center'} flexWrap={'wrap'} my={4}>
              {(districts_ids as string[])?.map(district => {
                const data = districtsList?.data?.data[
                  districtsList?.data?.__typename
                ].find(item => item.id === +district);
                return (
                  <Button
                    key={district}
                    _pressed={{bg: 'orange.400'}}
                    bg={'white'}
                    leftIcon={<Location color={'black'} />}
                    mr={4}
                    py={'4'}
                    rounded={'full'}
                    _text={{
                      color: 'black',
                    }}>
                    {district === '-1' ? 'تمامی منطقه ها' : data?.name}
                  </Button>
                );
              })}
              <HStack alignItems={'center'} my={2}>
                <IconButton
                  bg={'orange.600'}
                  icon={<Add color={'white'} size={32} />}
                  mr={2}
                  onPress={() => locationModalRef.current?.setStatus(true)}
                  rounded={'full'}
                />
                <Text fontWeight={500}>موقعیت جدید</Text>
              </HStack>
            </HStack>
            <FormControl.ErrorMessage>
              لطفا یک محدوده جغرافیایی انتخاب کنید
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
        <FormControl mt={4} isInvalid>
          <Stack mx={1}>
            <FormControl.Label
              _text={{color: 'black', fontSize: 20, fontWeight: 700}}
              color={'black'}>
              تصاویر
              <Text fontSize={'2xs'}>اختیاری</Text>
            </FormControl.Label>
            <FormControl.HelperText
              _text={{color: 'gray.400', fontWeight: 600, fontSize: 'sm'}}>
              می توانید برای دریافت بازخورد بهتر ، در صورت لزوم یک یا چند تصویر
              به آگهی اضافه کنید
            </FormControl.HelperText>
            <HStack
              alignItems={'center'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}
              my={6}
              px={2}>
              <Pressable
                _pressed={{bg: 'orange.400'}}
                alignItems={'center'}
                bg={'white'}
                h={(width - sizes['6'] * 2) * 0.42}
                justifyContent={'center'}
                onPress={openGallery}
                rounded={'3xl'}
                shadow={4}
                w={(width - sizes['6'] * 2) * 0.42}>
                <Box
                  bg={'orange.600'}
                  mb={2}
                  p={2}
                  rounded={'full'}
                  shadow={9}
                  style={{shadowColor: colors.orange['600']}}>
                  <Add color={'white'} size={32} />
                </Box>

                <Text fontWeight={'400'}>تصویر جدید</Text>
              </Pressable>
              {images?.map(image => (
                <Box
                  key={image.fileName}
                  alignItems={'center'}
                  bg={'white'}
                  h={(width - sizes['6'] * 2) * 0.42}
                  justifyContent={'center'}
                  mb={4}
                  rounded={'3xl'}
                  shadow={4}
                  w={(width - sizes['6']) * 0.42}>
                  <IconButton
                    bg={'red.500'}
                    p={1}
                    position={'absolute'}
                    right={4}
                    rounded={'full'}
                    top={4}
                    zIndex={10}
                    icon={
                      <Add
                        color={'white'}
                        size={18}
                        style={{transform: [{rotate: '45deg'}]}}
                      />
                    }
                    onPress={() => {
                      dispatch(setRemoveAssets(image));
                    }}
                  />
                  <Image
                    alt={'image'}
                    h={'full'}
                    resizeMode={'cover'}
                    rounded={'3xl'}
                    source={{uri: image.uri}}
                    w={'full'}
                  />
                </Box>
              ))}
            </HStack>
          </Stack>
        </FormControl>
        <FormControl mt={4} isInvalid>
          <Stack mx={1}>
            <FormControl.Label
              _text={{color: 'black', fontSize: 20, fontWeight: 700}}
              color={'black'}>
              خصوصیات
            </FormControl.Label>
            <FormControl.HelperText
              _text={{color: 'gray.400', fontWeight: 600, fontSize: 'sm'}}>
              می توانید برای محصول خود، خصوصیاتی از جمله رنگ، سال تولید، اندازه
              و غیره را انتخاب و وارد کنید
            </FormControl.HelperText>
            <HStack alignItems={'center'} my={6} px={2}>
              <IconButton
                bg={'orange.600'}
                icon={<Add color={'white'} size={26} />}
                onPress={() => specificationRef.current!.setStatus(true)}
                rounded={'full'}
              />
              <VStack justifyContent={'space-between'} ml={4} w={'3/6'}>
                <Text fontSize={'sm'} fontWeight={'500'}>
                  افزودن خصوصیت
                </Text>
                <Text color={'gray.400'} fontSize={'xs'} fontWeight={600}>
                  خصوصیات بیشتر سبب بهتر دیده شدن آگهی می شود
                </Text>
              </VStack>
            </HStack>
            <VStack my={6} px={2}>
              <HStack
                alignItems={'center'}
                justifyContent={'space-between'}
                mb={6}>
                <VStack>
                  <Text color={'gray.400'} fontSize={'sm'} fontWeight={600}>
                    تعداد سیلندر
                  </Text>
                  <Text fontSize={'md'} fontWeight={'800'}>
                    ۴عدد
                  </Text>
                </VStack>
                <IconButton
                  bg={'red.500'}
                  p={1}
                  rounded={'full'}
                  icon={
                    <Add
                      color={'white'}
                      size={18}
                      style={{transform: [{rotate: '45deg'}]}}
                    />
                  }
                />
              </HStack>
              <HStack
                alignItems={'center'}
                justifyContent={'space-between'}
                mb={6}>
                <VStack alignItems={'flex-start'}>
                  <Text color={'gray.400'} fontSize={'sm'} fontWeight={600}>
                    سال تولید
                  </Text>
                  <Text fontSize={'md'} fontWeight={'800'}>
                    ۱۳۹۶
                  </Text>
                </VStack>
                <IconButton
                  bg={'red.500'}
                  p={1}
                  rounded={'full'}
                  icon={
                    <Add
                      color={'white'}
                      size={18}
                      style={{transform: [{rotate: '45deg'}]}}
                    />
                  }
                />
              </HStack>
              <HStack
                alignItems={'center'}
                justifyContent={'space-between'}
                mb={6}>
                <VStack>
                  <Text color={'gray.400'} fontSize={'sm'} fontWeight={600}>
                    شرکت سازنده
                  </Text>
                  <Text fontSize={'md'} fontWeight={'800'}>
                    پژو سیتروئن
                  </Text>
                </VStack>
                <IconButton
                  bg={'red.500'}
                  p={1}
                  rounded={'full'}
                  icon={
                    <Add
                      color={'white'}
                      size={18}
                      style={{transform: [{rotate: '45deg'}]}}
                    />
                  }
                />
              </HStack>
            </VStack>
          </Stack>
        </FormControl>
        <FormControl mt={4} pb={10} isInvalid>
          <Stack mx={1}>
            <FormControl.Label
              _text={{color: 'black', fontSize: 20, fontWeight: 700}}
              color={'black'}>
              بازه ی قیمتی
            </FormControl.Label>
            <FormControl.HelperText
              _text={{color: 'gray.400', fontWeight: 600, fontSize: 'sm'}}>
              می توانید برای دریافت پیشنهادات بهتر، حدود قیمتی محصول مورد نظر
              خود را مشخص کنید
            </FormControl.HelperText>
            <VStack mt={4}>
              <Checkbox
                borderWidth={0}
                my={4}
                onChange={agreed => setAgreedPrice(agreed)}
                shadow={4}
                value={'agreedPrice'}>
                قیمت توافقی
              </Checkbox>
              <Button
                _pressed={{bg: 'gray.200'}}
                _text={{color: 'gray.400', fontSize: 'md', fontWeight: '600'}}
                bg={agreedPrice ? 'gray.200' : 'white'}
                disabled={agreedPrice}
                fontSize={'md'}
                onPress={() => pricePickerRef.current!.setStatus(true)}
                rounded={'full'}
                shadow={4}
                textAlign={'center'}>
                حداقل قیمت
              </Button>
              <Text
                fontSize={'md'}
                fontWeight={600}
                my={4}
                textAlign={'center'}>
                تا
              </Text>
              <Button
                _pressed={{bg: 'gray.200'}}
                _text={{color: 'gray.400', fontSize: 'md', fontWeight: '600'}}
                bg={agreedPrice ? 'gray.200' : 'white'}
                disabled={true}
                fontSize={'md'}
                onPress={() => pricePickerRef.current!.setStatus(true)}
                rounded={'full'}
                shadow={4}
                textAlign={'center'}>
                حداکثر قیمت
              </Button>
            </VStack>
          </Stack>
        </FormControl>
      </ScrollView>
    </CreateAdvertisingLayout>
  );
};

export default AdvertisingSpecificationsScreen;
