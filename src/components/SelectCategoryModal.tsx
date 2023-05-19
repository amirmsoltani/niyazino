import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Box,
  Button,
  FlatList,
  HStack,
  IconButton,
  Input,
  Modal,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {
  Add,
  CloudAdd,
  EmojiSad,
  Menu,
  SearchNormal1,
} from 'iconsax-react-native';
import {CategoriesType, CategoryType} from '~/types';
import {useAppSelector} from '~/hooks/reduxHooks';

export type RefType = {
  isOpen: boolean;
  setStatus: (open?: boolean) => void;
};

type PropsType = {
  defaultOpen?: boolean;
  onSelect?: (id?: number) => void;
};

type StateType = {
  isOpen: boolean;
};

const SelectCategoryModal = forwardRef<RefType, PropsType>((props, ref) => {
  const {categories} = useAppSelector(state => ({
    categories: state.categories,
  }));
  const [state, setState] = useState<StateType>({
    isOpen: props.defaultOpen ?? false,
  });
  const setStatus: RefType['setStatus'] = (open = false) => {
    if (open !== state.isOpen) {
      setState({...state, isOpen: open});
    }
  };

  useImperativeHandle(ref, () => ({isOpen: state.isOpen, setStatus}), [state]);

  const entries = Object.entries(categories.categoriesObject || {});
  const [selectedCategory, setSelectedCategory] = useState<{
    parent?: number;
    child?: number;
  }>({});

  const [searchValue, setSearchValue] = useState('');

  const filteredCategory = entries.filter(category =>
    category[1].title.includes(searchValue),
  );

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={state.isOpen}
      onClose={setStatus}
      avoidKeyboard>
      <Modal.Content w={'full'}>
        <Modal.CloseButton />
        <Modal.Header>انتخاب دسته بندی</Modal.Header>
        <Modal.Body>
          <Stack>
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
                  props.onSelect?.(
                    +Object.entries(
                      categories.categoriesObject[+id].children,
                    )[0][1].id,
                  );
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
            my={4}
            showsHorizontalScrollIndicator={false}
            _contentContainerStyle={{
              py: 1,
              minW: 'full',
              justifyContent: 'flex-end',
            }}
            data={
              selectedCategory.parent
                ? Object.entries(
                    categories.categoriesObject[selectedCategory.parent]
                      .children,
                  )
                : []
            }
            ListEmptyComponent={() => (
              <VStack alignItems={'center'} w={'full'}>
                {selectedCategory.parent ? (
                  <EmojiSad color={'orange'} />
                ) : (
                  <CloudAdd color={'orange'} />
                )}

                <Text color={'orange.300'} fontWeight={'500'}>
                  {selectedCategory.parent
                    ? 'دسته بندی موجود نیست'
                    : 'لطفا دسته بندی را انتخاب کنید'}
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
                onPress={() => props.onSelect?.(+id)}
                px={6}
                rounded={'full'}
                shadow={2}
                _text={{
                  fontWeight: '600',
                  color:
                    child.id === selectedCategory.child ? 'white' : 'black',
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
              <Menu
                color={'black'}
                rotation={90}
                size={24}
                variant={'TwoTone'}
              />

              <Text fontSize={'md'} ml={2} bold>
                {selectedCategory.parent
                  ? categories.categoriesObject[selectedCategory.parent].title
                  : '-'}
              </Text>
              <Text fontSize={'md'} bold>
                /
              </Text>
              <Text fontSize={'md'} bold>
                {selectedCategory.child
                  ? categories.categoriesObject[selectedCategory.parent!]
                      .children[selectedCategory.child].title
                  : '-'}
              </Text>
              {selectedCategory.parent ? (
                <IconButton
                  bg={'red.500'}
                  icon={<Add color={'white'} size={16} />}
                  ml={4}
                  p={1}
                  rounded={'full'}
                  style={{transform: [{rotate: '45deg'}]}}
                  onPress={() => {
                    setSelectedCategory({});
                    props.onSelect?.(undefined);
                  }}
                />
              ) : null}
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
});

export default SelectCategoryModal;
