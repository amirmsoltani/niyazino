import React, {useDebugValue, useState} from 'react';
import {CreateAdvertisingLayout} from '~/layout';
import {
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Input,
  ScrollView,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {EmojiSad, Menu, SearchNormal1} from 'iconsax-react-native';
import {useAppDispatch, useAppSelector} from '~/hooks/reduxHooks';
import {advertisingSetData} from '~/store/slices';
import {CategoriesType, CategoryType} from '~/types';

const AdvertisingCategoryScreen = () => {
  const dispatch = useAppDispatch();
  const {categories, selectedId} = useAppSelector(state => ({
    categories: state.categories,
    selectedId: state.advertising.category_id,
  }));

  const entries = Object.entries(categories.categoriesObject || {});
  const [selectedCategory, setSelectedCategory] = useState({
    parent: selectedId
      ? categories.childrenToParent[selectedId]
      : entries[0][1].id,
    child: selectedId || Object.entries(entries[0][1].children)[0][1].id,
  });
  const [searchValue, setSearchValue] = useState('');

  const filteredCategory = entries.filter(category =>
    category[1].title.includes(searchValue),
  );
  return (
    <CreateAdvertisingLayout
      validateForNext={() => {
        dispatch(advertisingSetData({category_id: selectedCategory.child}));
        return true;
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
          <Input
            _focus={{bg: 'white'}}
            bg={'white'}
            borderWidth={0}
            fontSize={'md'}
            fontWeight={'500'}
            h={'14'}
            m={1}
            mt={6}
            onChangeText={value => setSearchValue(value)}
            placeholder={'نام یک دسته بندی را وارد کنید'}
            placeholderTextColor={'gray.300'}
            pr={4}
            shadow={2}
            textAlign={'right'}
            variant={'rounded'}
            InputLeftElement={
              <Box pl={4}>
                <SearchNormal1 color="black" size={20} />
              </Box>
            }
          />
        </Stack>

        <FlatList<[string, CategoriesType]>
          data={filteredCategory}
          flexGrow={0}
          mt={6}
          showsHorizontalScrollIndicator={false}
          w={'full'}
          _contentContainerStyle={{
            py: 1,
            minW: 'full',
            justifyContent: 'flex-end',
          }}
          ListEmptyComponent={() => (
            <VStack alignItems={'center'} w={'full'}>
              <EmojiSad color={'orange'} />
              <Text color={'orange.300'} fontWeight={'500'}>
                دسته بندی یافت نشد
              </Text>
            </VStack>
          )}
          renderItem={({item: [id, category]}) => (
            <Button
              key={id}
              _pressed={{bg: 'orange.300'}}
              bg={category.id === selectedCategory.parent ? 'black' : 'white'}
              fontWeight={'600'}
              h={'12'}
              mx={2}
              px={6}
              rounded={'full'}
              shadow={2}
              _text={{
                fontWeight: '600',
                color:
                  category.id === selectedCategory.parent ? 'white' : 'black',
              }}
              onPress={() => {
                setSelectedCategory({
                  parent: +id,
                  child: +Object.entries(
                    categories.categoriesObject[+id].children,
                  )[0][1].id,
                });
              }}>
              {category.title}
            </Button>
          )}
          horizontal
          invertStickyHeaders
          nestedScrollEnabled
        />

        <FlatList<[string, CategoryType]>
          flexGrow={0}
          mb={4}
          mt={4}
          showsHorizontalScrollIndicator={false}
          _contentContainerStyle={{
            py: 1,
            minW: 'full',
            justifyContent: 'flex-end',
          }}
          data={Object.entries(
            categories.categoriesObject[selectedCategory.parent].children,
          )}
          ListEmptyComponent={() => (
            <VStack alignItems={'center'} w={'full'}>
              <EmojiSad color={'orange'} />
              <Text color={'orange.300'} fontWeight={'500'}>
                دسته بندی موجود نیست
              </Text>
            </VStack>
          )}
          renderItem={({item: [id, child]}) => (
            <Button
              key={id}
              _pressed={{bg: 'orange.300'}}
              bg={child.id === selectedCategory.child ? 'black' : 'white'}
              fontWeight={'600'}
              h={'12'}
              mx={2}
              px={6}
              rounded={'full'}
              shadow={2}
              _text={{
                fontWeight: '600',
                color: child.id === selectedCategory.child ? 'white' : 'black',
              }}>
              {child.title}
            </Button>
          )}
          horizontal
          nestedScrollEnabled
        />

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
              {categories.categoriesObject[selectedCategory.parent].title}
            </Text>
            <Text fontSize={'md'} bold>
              /
            </Text>
            <Text fontSize={'md'} bold>
              {
                categories.categoriesObject[selectedCategory.parent].children[
                  selectedCategory.child
                ].title
              }
            </Text>
          </HStack>
        </VStack>
      </ScrollView>
    </CreateAdvertisingLayout>
  );
};

export default AdvertisingCategoryScreen;
