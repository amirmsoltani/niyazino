import React, {FC, useRef, useState} from 'react';
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
  Spinner,
  StatusBar,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import {useDrawer, useHttpRequest} from '~/hooks';
import {VirtualizeMainLayout} from '~/layout';
import {
  Add,
  EmojiSad,
  Filter,
  Location,
  Menu,
  SearchNormal1,
} from 'iconsax-react-native';
import {
  AdvertisingCard,
  SelectCategoryModal,
  SelectCategoryModalRef,
  SelectLocationModal,
  SelectLocationModalRef,
} from '~/components';
import {
  changeToJalali,
  convertNumToPersian,
  regMapToJalali,
} from '~/util/ChangeToJalali';
import {AdvertisementListQueryStringType} from '~/types';
import dayjs from 'dayjs';

type Props = StackScreenProps<RootParamList, 'advertisingListScreen'>;

const menuIcon = require('src/assets/images/menuIcon.png');

type StateType = {
  category?: number;
  search?: string;
  page: number;
};
const AdvertisingListScreen: FC<Props> = ({navigation}) => {
  const [filters, setFilters] = useState<StateType>({page: 1});
  const lastFilter = useRef<StateType>(filters);
  const {
    request,
    state: {locations, list, category},
  } = useHttpRequest({
    deps: [filters],
    selector: state => ({
      locations: state.locations,
      list: state.http.listAdvertisements,
      category: state.categories,
    }),
    onUpdate: (lastState, state) => {
      if (
        state.locations.city &&
        state.locations.province &&
        (lastState.locations.city?.id !== state.locations.city?.id ||
          lastState.locations.districts !== state.locations.districts ||
          filters !== lastFilter.current)
      ) {
        const districts = Object.entries(locations.districts);
        const queryString: AdvertisementListQueryStringType = {
          province_id: state.locations.province!.id,
          city_id: state.locations.city!.id,
          page: filters.page,
        };
        if (districts.length) {
          queryString['districts_ids[]'] = districts.map(([id]) => id);
        }
        if (filters.search && filters.search !== '') {
          queryString.title = filters.search;
        }
        if (filters.category) {
          queryString.category_id = filters.category;
        }
        request('listAdvertisements', {
          queryString,
          addList:
            lastFilter.current!.page !== filters.page && filters.page !== 1,
        });
        lastFilter.current = filters;
      }
    },
  });

  const selectLocationRef = useRef<SelectLocationModalRef>(null);
  const selectCategoryRef = useRef<SelectCategoryModalRef>(null);
  const onPress = (id: number) => {
    navigation.navigate('advertisingDetailScreen', {id});
  };
  const {setDrawerStatus} = useDrawer();
  const {colors} = useTheme();
  const districtLength = Object.keys(locations.districts).length;
  return (
    <VirtualizeMainLayout
      bg={'blueGray.200'}
      data={list?.data?.data[list!.data.__typename].data}
      _contentContainerStyle={
        list?.data?.data[list!.data.__typename].data.length
          ? undefined
          : {h: 'full', justifyContent: 'center'}
      }
      header={
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
                    {districtLength > 0 || locations.city
                      ? convertNumToPersian((districtLength || 1).toString())
                      : '۰'}
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
            _focus={{bg: 'white'}}
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
            onChangeText={text => {
              setFilters({...filters, search: text, page: 1});
            }}
          />
          <HStack alignItems={'center'} mt={4}>
            <Pressable
              _pressed={{bg: 'orange.300'}}
              alignItems={'center'}
              bg={'white'}
              flexDirection={'row'}
              mr={4}
              onPress={() => selectCategoryRef.current!.setStatus(true)}
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
              {filters.category ? (
                <Text fontWeight={'700'} ml={2}>{`${
                  category.categoriesObject[
                    category.childrenToParent[filters.category]
                  ].title
                }/${
                  category.categoriesObject[
                    category.childrenToParent[filters.category]
                  ].children[filters.category].title
                }`}</Text>
              ) : (
                <>
                  <Text fontSize={'xs'} fontWeight={500} ml={2}>
                    دسته بندی:
                  </Text>
                  <Text fontWeight={'700'}>مشخص نشده</Text>
                </>
              )}
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
          <HStack flexWrap={'wrap'} mb={2} mt={4} space={'sm'}>
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
      }
      hiddenElements={
        <>
          <SelectLocationModal
            ref={selectLocationRef}
            closeButtonHidden={!locations.province || !locations.city}
            defaultOpen={!locations.province || !locations.city}
            global={true}
          />
          <SelectCategoryModal
            ref={selectCategoryRef}
            onSelect={id => {
              setFilters({...filters, category: id, page: 1});
            }}
          />
          <StatusBar
            backgroundColor={colors.blueGray['200']}
            barStyle={'dark-content'}
          />
        </>
      }
      ListEmptyComponent={() =>
        list?.httpRequestStatus === 'loading' ? (
          <Spinner />
        ) : (
          <VStack alignItems={'center'}>
            <EmojiSad color={'gray'} />
            <Text color={'gray.400'} fontWeight={'600'} mt={'2'}>
              اطلاعاتی موجود نیست
            </Text>
          </VStack>
        )
      }
      onEndReached={() => {
        if (list?.httpRequestStatus === 'success') {
          const data = list.data!.data[list.data!.__typename];
          if (data.last_page > data.current_page) {
            setFilters({
              ...filters,
              page: data.current_page + 1,
            });
          }
        }
      }}
      renderItem={({item}) => {
        const selectedCategory =
          category.categoriesObject[
            category.childrenToParent[item.category_id]
          ];
        return (
          <AdvertisingCard
            id={item.id}
            onPress={onPress}
            price={'سیصد تا هفصد میلیون تومان'}
            title={item.title}
            category={`${selectedCategory.title} /${
              selectedCategory.children[item.category_id].title
            }`}
            time={dayjs(item.created_at)
              .fromNow()
              .replace(regMapToJalali, changeToJalali)}
          />
        );
      }}
    />
  );
};

export default AdvertisingListScreen;
