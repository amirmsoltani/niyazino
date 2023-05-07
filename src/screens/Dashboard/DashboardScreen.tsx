import {FC, useRef} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootParamList} from '~/screens/type';
import {
  Badge,
  Center,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  ScrollView,
  Stack,
  StatusBar,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import {Add, AlignLeft, ArrowLeft2, ArrowRight2} from 'iconsax-react-native';
import {MainLayout} from '~/layout';
import Carousel from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';
import {useDrawer} from '~/hooks';

type Props = StackScreenProps<RootParamList, 'dashboardScreen'>;

const {width} = Dimensions.get('window');
const DashboardScreen: FC<Props> = () => {
  const {colors, sizes} = useTheme();
  const carouselRef = useRef<Carousel<any>>(null);
  const {setDrawerStatus} = useDrawer();
  return (
    <MainLayout bg={'coolGray.100'}>
      <Stack h={'full'}>
        <ScrollView
          _contentContainerStyle={{minH: 'full'}}
          bg={'orange.600'}
          automaticallyAdjustKeyboardInsets
          nestedScrollEnabled>
          <StatusBar backgroundColor={colors.orange['600']} />
          <HStack mt={8} mx={8}>
            <IconButton
              _pressed={{bg: '#ffffff5e'}}
              icon={<AlignLeft color={colors.black} size={32} />}
              onPress={() => setDrawerStatus(true)}
              p={0}
            />
          </HStack>
          <Center mt={20} mx={8}>
            <Image
              alt={'logo'}
              height={'16'}
              resizeMode={'cover'}
              source={require('~/assets/images/logoWhite.png')}
              w={'48'}
            />
            <Text color={'white'} fontSize={'md'} fontWeight={'600'}>
              عصری نو، نیازی نو
            </Text>
            <Input
              _focus={{bg: 'white'}}
              bg={'white'}
              fontSize={'md'}
              fontWeight={'600'}
              h={'55px'}
              mt={6}
              placeholder={'چی نیاز داری بگو برات ثبت کنم؟!'}
              shadow={'4'}
              textAlign={'right'}
              variant={'rounded'}
              InputRightElement={
                <IconButton
                  bg={'orange.600'}
                  icon={<Add color={colors.white} />}
                  m={2}
                  rounded={'full'}
                />
              }
            />
          </Center>
          <HStack alignItems={'center'} mt={12} px={8}>
            <IconButton
              _pressed={{bg: '#ffffff7e'}}
              icon={<ArrowLeft2 color={'#0000007e'} variant={'Bold'} />}
              left={2}
              onPress={() => carouselRef.current?.snapToPrev()}
              position={'absolute'}
            />
            <Carousel
              ref={carouselRef}
              data={[1, 2, 3]}
              itemWidth={width - sizes[8] * 2}
              sliderWidth={width - sizes[8] * 2}
              renderItem={({item}) => (
                <Center h="32">
                  <VStack
                    alignItems={'flex-end'}
                    bg={'black'}
                    h={32}
                    justifyContent={'center'}
                    px={8}
                    rounded={'3xl'}
                    w={'72'}>
                    <Text color={'white'} fontSize={'xs'} fontWeight={'400'}>
                      پرطرفدار ترین
                    </Text>
                    <Text color={'white'} fontSize={'sm'}>
                      خودروی سواری دست دوم کارکرده خوش فرمون خوش پوش
                    </Text>
                  </VStack>
                </Center>
              )}
            />
            <IconButton
              _pressed={{bg: '#ffffff7e'}}
              icon={<ArrowRight2 color={'#0000007e'} variant={'Bold'} />}
              onPress={() => carouselRef.current?.snapToNext()}
              position={'absolute'}
              right={2}
            />
          </HStack>
          <VStack mt={'1/6'}>
            <VStack
              alignSelf={'flex-end'}
              bg={'coolGray.100'}
              px={8}
              roundedTop={'3xl'}
              w={'full'}>
              <Center>
                <Badge
                  colorScheme={'warmGray'}
                  mb={8}
                  mt={4}
                  opacity={0.5}
                  pb={0}
                  pt={'2px'}
                  px={8}
                  rounded={'full'}
                  variant={'solid'}
                />
              </Center>
              <Heading size={'md'}>نیازینو چیه و به چه دردی میخوره؟</Heading>
              <Text
                color={'gray.400'}
                fontWeight={'600'}
                mb={8}
                mt={4}
                textAlign={'justify'}>
                نیازینو پلتفرمی متفاوت از تمام نیازمندی هاست در اینجا به جای
                فروشندگان. خریداران و متقاضیان خدمات و کالا آگهی ثبت میکنند. در
                نیازینو نیازی نیست که خریداران در میان انبوه آگهی های نیازمندی
                ها به دنبال خواسته خود بگردن بلکه آنچه نیاز دارند را ثبت میکنند
                و فروشندگانی که آرن کالا یا خدمات را برای ارائه دارد با خریدار
                ارتباط برقراد میکنند
              </Text>
            </VStack>
          </VStack>
        </ScrollView>
      </Stack>
    </MainLayout>
  );
};

export default DashboardScreen;
