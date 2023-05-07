import React from 'react';
import {CreateAdvertisingLayout} from '~/layout';
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  ScrollView,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {Menu, SearchNormal1} from 'iconsax-react-native';

const categorise = [
  {name: 'خدمات منزل'},
  {name: 'وسایل نقلیه'},
  {name: 'باربری'},
  {name: 'موتور برقی'},
];
const subCategories = [
  {name: 'خودروی سواری'},
  {name: 'موتورسیکلت'},
  {name: 'دوچرخه'},
];
const AdvertisingCategoryScreen = () => {
  return (
    <CreateAdvertisingLayout>
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

        <ScrollView
          flexGrow={0}
          mt={6}
          showsHorizontalScrollIndicator={false}
          style={{direction: 'ltr'}}
          _contentContainerStyle={{
            py: 1,
          }}
          horizontal
          invertStickyHeaders
          nestedScrollEnabled>
          {categorise.map(({name}) => (
            <Button
              key={name}
              _pressed={{bg: 'orange.300'}}
              bg={name === 'وسایل نقلیه' ? 'black' : 'white'}
              fontWeight={'600'}
              h={'12'}
              mx={2}
              px={6}
              rounded={'full'}
              shadow={2}
              _text={{
                fontWeight: '600',
                color: name === 'وسایل نقلیه' ? 'white' : 'black',
              }}>
              {name}
            </Button>
          ))}
        </ScrollView>
        <ScrollView
          _contentContainerStyle={{py: 1}}
          flexGrow={0}
          mt={4}
          showsHorizontalScrollIndicator={false}
          horizontal
          nestedScrollEnabled>
          {subCategories.map(({name}) => (
            <Button
              key={name}
              _pressed={{bg: 'orange.300'}}
              bg={name === 'خودروی سواری' ? 'black' : 'white'}
              fontWeight={'600'}
              h={'12'}
              mx={2}
              px={6}
              rounded={'full'}
              shadow={2}
              _text={{
                fontWeight: '600',
                color: name === 'خودروی سواری' ? 'white' : 'black',
              }}>
              {name}
            </Button>
          ))}
        </ScrollView>

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
              وسایل نقلیه
            </Text>
            <Text fontSize={'md'} bold>
              /
            </Text>
            <Text fontSize={'md'} bold>
              خودروی سواری
            </Text>
          </HStack>
        </VStack>
      </ScrollView>
    </CreateAdvertisingLayout>
  );
};

export default AdvertisingCategoryScreen;
