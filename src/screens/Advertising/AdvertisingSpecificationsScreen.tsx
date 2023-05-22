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
import {
  advertisingClear,
  advertisingRemoveData,
  advertisingSetData,
  httpClear,
  setRemoveAssets,
} from '~/store/slices';
import {createAdvertisingAfterUploadPhotos} from '~/store/Actions';
import {StackScreenProps} from '@react-navigation/stack';
import {RootParamList} from '~/screens/type';
import {convertNumToPersian} from '~/util/ChangeToJalali';
import {priceFormat} from '~/util/PriceFormat';
import {mapPrice} from '~/util/MapPrice';

const {width} = Dimensions.get('window');

type Props = StackScreenProps<
  RootParamList,
  'createAdvertisingSpecificationsScreen'
>;
const AdvertisingSpecificationsScreen: FC<Props> = ({navigation}) => {
  const {
    dispatch,
    state: {
      districts_ids,
      districtsList,
      advertising,
      auth,
      isLoading,
      upload,
      attributes,
    },
  } = useHttpRequest({
    selector: state => ({
      districts_ids: state.advertising.districts_ids,
      districtsList: state.http.districtList,
      advertising: state.advertising,
      auth: state.http.verifyCode,
      isLoading: [
        state.http.uploadFile?.httpRequestStatus,
        state.http.createAdvertisements?.httpRequestStatus,
      ].includes('loading'),
      create: state.http.createAdvertisements,
      upload: state.http.uploadFile,
      attributes: state.http.attributes,
    }),
    onUpdate: (lastState, state) => {
      if (
        lastState.create?.httpRequestStatus === 'loading' &&
        state.create?.httpRequestStatus === 'success'
      ) {
        dispatch(httpClear(['userAdvertisements']));
        navigation.reset({
          index: 1,
          routes: [{name: 'dashboardScreen'}, {name: 'userAdvertisingScreen'}],
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
  const attributeList = attributes?.data?.data?.[attributes!.data!.__typename];
  return (
    <CreateAdvertisingLayout
      isLoading={isLoading}
      validateForNext={() => {
        setDirty(true);

        if (
          !districts_ids?.length ||
          (!agreedPrice &&
            (!advertising.min_price ||
              !advertising.max_price ||
              +advertising.min_price >= +advertising.max_price)) ||
          attributeList?.find(
            (attribute, index) =>
              attribute.is_required &&
              [undefined, null, '', '-1'].includes(
                advertising.attributes?.[index],
              ),
          ) !== undefined
        ) {
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

        <FormControl
          mt={4}
          isInvalid={
            attributeList?.find(
              (attribute, index) =>
                attribute.is_required &&
                [undefined, null, '', '-1'].includes(
                  advertising.attributes?.[index],
                ),
            ) !== undefined && dirty
          }>
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
              {advertising.attributes
                ?.map((attribute, index) =>
                  [undefined, null, '', '-1'].includes(attribute) ? null : (
                    <HStack
                      key={attribute + index}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                      mb={6}>
                      <VStack>
                        <Text
                          color={'gray.400'}
                          fontSize={'sm'}
                          fontWeight={600}>
                          {attributeList?.[index].title}
                        </Text>
                        <Text
                          fontSize={'md'}
                          fontWeight={'800'}
                          textAlign={'left'}>
                          {attributeList?.[index].type === 'select'
                            ? attributeList[index].options.find(
                                option => option.id.toString() === attribute,
                              )?.title
                            : attributeList?.[index].type === 'text'
                            ? attribute
                            : convertNumToPersian(attribute || '')}
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
                        onPress={() => {
                          const newAttribute = [...advertising.attributes!];
                          newAttribute[index] = '-1';
                          dispatch(
                            advertisingSetData({attributes: newAttribute}),
                          );
                        }}
                      />
                    </HStack>
                  ),
                )
                .filter(node => node !== null)}
            </VStack>
          </Stack>
          <FormControl.ErrorMessage>
            لطفا خصوصیات محصول را تکمیل کنید
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          mt={4}
          pb={10}
          isInvalid={
            !agreedPrice &&
            dirty &&
            (!advertising.min_price ||
              !advertising.max_price ||
              +advertising.min_price >= +advertising.max_price)
          }>
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
                shadow={4}
                value={'agreedPrice'}
                onChange={agreed => {
                  setAgreedPrice(agreed);
                  dispatch(advertisingRemoveData('min_price'));
                  dispatch(advertisingRemoveData('max_price'));
                }}>
                قیمت توافقی
              </Checkbox>
              <Button
                _pressed={{bg: 'gray.200'}}
                _text={{color: 'gray.400', fontSize: 'md', fontWeight: '600'}}
                bg={agreedPrice ? 'gray.200' : 'white'}
                disabled={agreedPrice}
                fontSize={'md'}
                onPress={() => pricePickerRef.current!.setStatus('min', true)}
                rounded={'full'}
                shadow={4}
                textAlign={'center'}>
                {advertising.min_price
                  ? (advertising.min_price in mapPrice
                      ? mapPrice[advertising.min_price]
                      : convertNumToPersian(
                          priceFormat(+advertising.min_price),
                        )) + ' تومان'
                  : 'حداقل قیمت'}
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
                disabled={agreedPrice}
                fontSize={'md'}
                onPress={() => pricePickerRef.current!.setStatus('max', true)}
                rounded={'full'}
                shadow={4}
                textAlign={'center'}>
                {advertising.max_price
                  ? (advertising.max_price in mapPrice
                      ? mapPrice[advertising.max_price]
                      : convertNumToPersian(
                          priceFormat(+advertising.max_price),
                        )) + ' تومان'
                  : 'حداکثر قیمت'}
              </Button>
            </VStack>
          </Stack>
          <FormControl.ErrorMessage>
            {!advertising.min_price || !advertising.max_price
              ? 'لطفا بازه قیمتی را انتخاب کنید'
              : +advertising.max_price <= +advertising.min_price
              ? 'حداکثر قیمت نمی تواند کوچک تر یا برابر با حداقال قیمت باشد'
              : ''}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl my={4} isInvalid>
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
              {advertising.assets?.map(image => (
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
      </ScrollView>
    </CreateAdvertisingLayout>
  );
};

export default AdvertisingSpecificationsScreen;
