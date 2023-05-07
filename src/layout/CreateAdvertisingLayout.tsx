import React, {FC, ReactNode} from 'react';
import {
  Badge,
  Box,
  Button,
  HStack,
  IconButton,
  Stack,
  StatusBar,
  Text,
  VStack,
} from 'native-base';
import {Add} from 'iconsax-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RootParamList} from '~/screens/type';

type PropsType = {children: ReactNode};

const tabItems: {name: string; path: keyof RootParamList}[] = [
  {name: 'دسته بندی', path: 'createAdvertisingCategoryScreen'},
  {name: 'عنوان', path: 'createAdvertisingTitleScreen'},
  {name: 'مشخصات', path: 'createAdvertisingSpecificationsScreen'},
  {name: 'تایید هویت', path: 'createAdvertisingAuthorizeScreen'},
];
const CreateAdvertisingLayout: FC<PropsType> = ({children}) => {
  const navigation = useNavigation();
  const route = useRoute();
  let find = -1;
  return (
    <VStack
      bg={'blueGray.100'}
      h={'full'}
      justifyContent={'space-between'}
      safeArea>
      <StatusBar backgroundColor={'white'} />
      <Stack bg={'white'} px={6} py={4} roundedBottom={'3xl'} shadow={6}>
        <HStack
          alignItems={'center'}
          justifyContent={'space-between'}
          w={'full'}>
          <IconButton
            icon={<Add color={'black'} rotation={45} size={42} />}
            p={0}
            onPress={() =>
              navigation.reset({index: 0, routes: [{name: 'dashboardScreen'}]})
            }
          />
          <Text fontSize={'2xl'} fontWeight={'800'}>
            ثبت آگهی
          </Text>
        </HStack>
        <HStack justifyContent={'space-between'} my={6}>
          {tabItems.map(({name, path}, index) => {
            const color = find === -1 ? 'orange.600' : 'gray.400';
            find = route.name === path ? index : find;
            return (
              <Box key={name} w={'1/5'}>
                <Text color={color} textAlign={'center'}>
                  {name}
                </Text>
                <Badge
                  backgroundColor={color}
                  mt={2}
                  rounded={'3xl'}
                  variant={'solid'}
                  w={'full'}
                />
              </Box>
            );
          })}
        </HStack>
      </Stack>
      <Stack flex={1} py={4}>
        {children}
      </Stack>
      <HStack justifyContent={'space-between'} pb={8} px={6} space={4}>
        <Button
          _pressed={{bg: 'coolGray.300'}}
          _text={{color: 'gray.400', fontWeight: '500', fontSize: 'lg'}}
          borderColor={'gray.400'}
          borderWidth={2}
          flex={1}
          py={4}
          rounded={'3xl'}
          variant={'outline'}
          onPress={() =>
            find === 0
              ? navigation.reset({
                  routes: [{name: 'dashboardScreen'}],
                  index: 0,
                })
              : navigation.goBack()
          }>
          {find === 0 ? 'انصراف' : 'قبلی'}
        </Button>
        <Button
          _pressed={{bg: 'orange.400'}}
          _text={{color: 'white', fontWeight: '500', fontSize: 'lg'}}
          bg={'orange.600'}
          flex={1}
          py={4}
          rounded={'3xl'}
          onPress={() =>
            find + 1 < tabItems.length &&
            navigation.navigate(tabItems[find + 1].path)
          }>
          بعدی
        </Button>
      </HStack>
    </VStack>
  );
};

export default CreateAdvertisingLayout;
