import React, {FC, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootParamList} from '~/screens/type';
import {
  Button,
  HStack,
  Image,
  Spinner,
  StatusBar,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import {useDrawer, useHttpRequest} from '~/hooks';
import {VirtualizeMainLayout} from '~/layout';
import {EmojiSad} from 'iconsax-react-native';
import {AdvertisingCard} from '~/components';
import {changeToJalali, regMapToJalali} from '~/util/ChangeToJalali';
import dayjs from 'dayjs';
import {findParentCategory} from '~/util/FindParentCategory';

type Props = StackScreenProps<RootParamList, 'userAdvertisingScreen'>;

const menuIcon = require('src/assets/images/menuIcon.png');

type StateType = {
  page: number;
};
const UserAdvertisingScreen: FC<Props> = ({navigation}) => {
  const [filters, setFilters] = useState<StateType>({page: 1});
  const lastFilter = useRef<StateType>(filters);
  const {
    request,
    state: {list, category},
  } = useHttpRequest({
    deps: [filters],
    selector: state => ({
      list: state.http.userAdvertisements,
      category: state.categories,
    }),
    clearAfterUnmount: ['userAdvertisements'],
    initialRequests: request => {
      request('userAdvertisements', {queryString: {page: filters.page}});
    },
    onUpdate: () => {
      if (filters.page !== lastFilter.current!.page) {
        const queryString: {page: number} = {
          page: filters.page,
        };

        request('userAdvertisements', {
          queryString,
          addToList:
            lastFilter.current!.page !== filters.page && filters.page !== 1,
        });
        lastFilter.current = filters;
      }
    },
  });

  const onPress = (id: number) => {
    navigation.navigate('advertisingDetailScreen', {id});
  };
  const {setDrawerStatus} = useDrawer();
  const {colors} = useTheme();
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
          <HStack alignItems={'center'} h={14} justifyContent={'space-between'}>
            <Text fontSize={20} fontWeight={700}>
              آگهی های خودم
            </Text>
            <HStack alignItems={'center'}>
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
        </VStack>
      }
      hiddenElements={
        <>
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
      ListFooterComponent={
        list?.httpRequestStatus === 'loading' && filters.page > 1 ? (
          <VStack alignItems={'center'} justifyContent={'center'} my={4}>
            <Spinner />
          </VStack>
        ) : null
      }
      ListHeaderComponent={
        list?.httpRequestStatus === 'loading' &&
        list.data &&
        filters.page === 1 ? (
          <VStack my={2}>
            <Spinner />
          </VStack>
        ) : undefined
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
      onMomentumScrollBegin={event => {
        if (event.nativeEvent.contentOffset.y === 0) {
          lastFilter.current = {...lastFilter.current, page: 0};
          setFilters({...filters, page: 1});
        }
      }}
      renderItem={({item}) => {
        const selectedCategory =
          category.categoriesObject[
            findParentCategory(item.category_id, category.categoriesObject)[0]
          ];
        return (
          <AdvertisingCard
            id={item.id}
            onPress={onPress}
            price={'سیصد تا هفصد میلیون تومان'}
            title={item.title}
            category={`${selectedCategory.title} /${
              category.categoriesObject[item.category_id].title
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

export default UserAdvertisingScreen;
