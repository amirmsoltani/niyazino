import React, {useState} from 'react';
import {CreateAdvertisingLayout} from '~/layout';
import {
  Button,
  FlatList,
  Heading,
  HStack,
  ScrollView,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {EmojiSad, Menu} from 'iconsax-react-native';
import {useAppDispatch, useAppSelector} from '~/hooks/reduxHooks';
import {advertisingRemoveData, advertisingSetData} from '~/store/slices';
import {findParentCategory} from '~/util/FindParentCategory';

const AdvertisingCategoryScreen = () => {
  const dispatch = useAppDispatch();
  const {categories, selectedId} = useAppSelector(state => ({
    categories: state.categories,
    selectedId: state.advertising.category_id,
  }));

  const [selectedCategory, setSelectedCategory] = useState<
    Array<null | number>
  >([
    null,
    ...(selectedId
      ? findParentCategory(selectedId, categories.categoriesObject)
      : []),
  ]);

  const renderList = (parent_id: null | number, index: number) => (
    <FlatList
      key={(parent_id || 'null').toString()}
      flexGrow={0}
      mt={6}
      showsHorizontalScrollIndicator={false}
      w={'full'}
      _contentContainerStyle={{
        py: 1,
        minW: 'full',
        justifyContent: 'flex-end',
      }}
      data={categories.categoriesList.filter(
        category => category.parent_id === parent_id,
      )}
      ListEmptyComponent={() => (
        <VStack alignItems={'center'} w={'full'}>
          <EmojiSad color={'orange'} />
          <Text color={'orange.300'} fontWeight={'500'}>
            دسته بندی یافت نشد
          </Text>
        </VStack>
      )}
      renderItem={({item}) => (
        <Button
          key={item.id}
          _pressed={{bg: 'orange.300'}}
          fontWeight={'600'}
          h={'12'}
          mx={2}
          px={6}
          rounded={'full'}
          shadow={2}
          _text={{
            fontWeight: '600',
            color:
              selectedId === item.id ||
              (selectedCategory.length > index + 1 &&
                selectedCategory[index + 1] === item.id)
                ? 'white'
                : 'black',
          }}
          bg={
            selectedId === item.id ||
            (selectedCategory.length > index + 1 &&
              selectedCategory[index + 1] === item.id)
              ? 'black'
              : 'white'
          }
          onPress={() => {
            if (item.childExist) {
              setSelectedCategory(selectedCategory => {
                const newSelectedCategory = selectedCategory.slice(
                  0,
                  index + 1,
                );
                newSelectedCategory.push(item.id);
                if (selectedId) {
                  dispatch(advertisingRemoveData('category_id'));
                }
                return newSelectedCategory;
              });
            } else {
              dispatch(advertisingSetData({category_id: item.id}));
            }
          }}>
          {item.title}
        </Button>
      )}
      horizontal
      invertStickyHeaders
      nestedScrollEnabled
    />
  );
  return (
    <CreateAdvertisingLayout
      validateForNext={() => {
        return !!selectedId;
      }}>
      <ScrollView
        _contentContainerStyle={{minH: 'full', pb: 4}}
        h={'full'}
        pt={4}>
        <Stack px={6}>
          <Heading size={'md'}>انتخاب دسته بندی</Heading>
          <Text color={'gray.400'} fontSize={'md'} fontWeight={'500'}>
            لطفا دسته بندی مورد نظر خودتان را برای ثبت آگهی انتخاب بفرمائید
          </Text>
        </Stack>
        {renderList(null, 0)}
        {selectedCategory
          .slice(1)
          .map((parent_id, index) => renderList(parent_id, index))}

        <VStack flexGrow={1} justifyContent={'flex-end'} mb={4} px={6}>
          <HStack
            bg={'white'}
            justifyContent={'flex-start'}
            px={4}
            py="12px"
            rounded={'3xl'}
            shadow={5}>
            <Menu color={'black'} rotation={90} size={24} variant={'TwoTone'} />

            <Text fontSize={'md'} ml={2} bold>
              {selectedCategory.length > 1
                ? categories.categoriesObject[selectedCategory[1] as number]
                    .title
                : '-'}
            </Text>
            <Text fontSize={'md'} bold>
              /
            </Text>
            <Text fontSize={'md'} bold>
              {selectedId ? categories.categoriesObject[selectedId].title : '-'}
            </Text>
          </HStack>
        </VStack>
      </ScrollView>
    </CreateAdvertisingLayout>
  );
};

export default AdvertisingCategoryScreen;
