import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Button,
  FlatList,
  HStack,
  IconButton,
  Modal,
  Text,
  VStack,
} from 'native-base';
import {Add, EmojiSad, Menu} from 'iconsax-react-native';
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

  const [selectedCategory, setSelectedCategory] = useState<
    Array<null | number>
  >([null]);
  const [selectedId, setSelectedId] = useState<number>();

  const renderList = (parent_id: null | number, index: number) => (
    <FlatList
      key={(parent_id || 'null').toString()}
      flexGrow={0}
      mt={3}
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
                  setSelectedId(undefined);
                  props.onSelect?.(undefined);
                }
                return newSelectedCategory;
              });
            } else {
              setSelectedId(item.id);
              props.onSelect?.(item.id);
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
    <Modal
      closeOnOverlayClick={false}
      isOpen={state.isOpen}
      onClose={setStatus}
      avoidKeyboard>
      <Modal.Content w={'full'}>
        <Modal.CloseButton />
        <Modal.Header>انتخاب دسته بندی</Modal.Header>
        <Modal.Body>
          {renderList(null, 0)}
          {selectedCategory
            .slice(1)
            .map((parent_id, index) => renderList(parent_id, index))}

          <VStack flexGrow={1} justifyContent={'flex-end'} mb={4} mt={6} px={6}>
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
                {selectedCategory.length > 1
                  ? categories.categoriesObject[selectedCategory[1]!].title
                  : '-'}
              </Text>
              <Text fontSize={'md'} bold>
                /
              </Text>
              <Text fontSize={'md'} bold>
                {selectedId
                  ? categories.categoriesObject[selectedId].title
                  : '-'}
              </Text>
              {selectedCategory.length > 1 ? (
                <IconButton
                  bg={'red.500'}
                  icon={<Add color={'white'} size={16} />}
                  ml={4}
                  p={1}
                  rounded={'full'}
                  style={{transform: [{rotate: '45deg'}]}}
                  onPress={() => {
                    setSelectedCategory([null]);
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
