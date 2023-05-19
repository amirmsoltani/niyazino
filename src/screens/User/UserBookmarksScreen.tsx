import React, {FC} from 'react';
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

type Props = StackScreenProps<RootParamList, 'userBookmarksScreen'>;

const menuIcon = require('src/assets/images/menuIcon.png');

const UserBookmarksScreen: FC<Props> = ({navigation}) => {
  const {
    request,
    state: {list, category},
  } = useHttpRequest({
    selector: state => ({
      list: state.http.userBookmarks,
      category: state.categories,
    }),
    clearAfterUnmount: ['userBookmarks'],
    initialRequests: request => {
      request('userBookmarks', undefined);
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
      data={list?.data?.data[list!.data.__typename]}
      _contentContainerStyle={
        list?.data?.data[list!.data.__typename].length
          ? undefined
          : {h: 'full', justifyContent: 'center'}
      }
      header={
        <VStack px={6}>
          <HStack alignItems={'center'} h={14} justifyContent={'space-between'}>
            <Text fontSize={20} fontWeight={700}>
              نشان شده ها
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
              آگهی نشدن شده موجود نیست
            </Text>
          </VStack>
        )
      }
      ListHeaderComponent={
        list?.httpRequestStatus === 'loading' && list.data ? (
          <VStack my={2}>
            <Spinner />
          </VStack>
        ) : undefined
      }
      onMomentumScrollBegin={event => {
        if (event.nativeEvent.contentOffset.y === 0) {
          request('userBookmarks', undefined);
        }
      }}
      renderItem={({item}) => {
        const selectedCategory =
          category.categoriesObject[
            category.childrenToParent[item.advertisement.category_id]
          ];
        return (
          <AdvertisingCard
            id={item.id}
            onPress={onPress}
            price={'سیصد تا هفصد میلیون تومان'}
            title={item.advertisement.title}
            category={`${selectedCategory.title} /${
              selectedCategory.children[item.advertisement.category_id].title
            }`}
            time={dayjs(item.advertisement.created_at)
              .fromNow()
              .replace(regMapToJalali, changeToJalali)}
          />
        );
      }}
    />
  );
};

export default UserBookmarksScreen;
