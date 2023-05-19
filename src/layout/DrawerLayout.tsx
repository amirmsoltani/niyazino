import React, {FC, ReactNode, useEffect, useReducer, useRef} from 'react';
import {
  Avatar,
  Button,
  HStack,
  Pressable,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import {defaultDrawerContextValue, DrawerContext, drawerReducer} from '~/hooks';
import {CallCalling, Icon, Receipt21, Save2} from 'iconsax-react-native';
import {RootParamList} from '~/screens/type';
import {Animated, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const sixtyPercent = Math.floor(width * 0.6);
const drawerItems: {
  name: string;
  path: keyof RootParamList;
  Icon: Icon;
}[] = [
  {
    name: 'آگهی های من',
    path: 'userAdvertisingScreen',
    Icon: Receipt21,
  },
  {name: 'نشان شده ها', path: 'createAdvertisingTitleScreen', Icon: Save2},
  {
    name: 'پشتیبانی',
    path: 'createAdvertisingSpecificationsScreen',
    Icon: CallCalling,
  },
];
type PropsType = {children: ReactNode};
const DrawerLayout: FC<PropsType> = ({children}) => {
  const translateX = useRef(new Animated.Value(sixtyPercent)).current;
  const navigation = useNavigation();

  const [state, dispatch] = useReducer(
    drawerReducer,
    defaultDrawerContextValue,
  );

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: state.open ? 0 : -sixtyPercent,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [state.open]);
  const closeDrawer = () => {
    dispatch({type: 'CHANGE_STATUS', payload: {isOpen: false}});
  };
  const {sizes, colors} = useTheme();
  return (
    <DrawerContext.Provider value={{...state, dispatch}}>
      <Animated.View
        style={{
          transform: [{translateX: translateX}],
          zIndex: 100,
          position: 'absolute',
          right: 0,
          paddingVertical: sizes[6],
          top: 0,
          flexDirection: 'column',
          width: sixtyPercent,
          height: '100%',
          backgroundColor: colors.white,
        }}>
        <HStack alignItems={'center'} justifyContent={'center'} px={6}>
          <Text fontWeight={600} mr={4}>
            ۰۹۱۵۷۱۲۳۱۰۳
          </Text>
          <Avatar bg={'coolGray.200'}>AM</Avatar>
        </HStack>
        <Button
          borderColor={'orange.400'}
          mx={6}
          my={4}
          py={2}
          variant={'outline'}>
          خروج از حساب کاربری
        </Button>
        <VStack borderTopColor={'gray.200'} borderTopWidth={1}>
          {drawerItems.map(({name, Icon}) => (
            <Pressable
              key={name}
              _pressed={{bg: 'orange.300'}}
              borderBottomColor={'gray.200'}
              borderBottomWidth={1}
              flexDirection={'row'}
              justifyContent={'flex-end'}
              px={6}
              py={4}
              onPress={() => {
                closeDrawer();
                navigation.navigate('userAdvertisingScreen');
              }}>
              <Text fontWeight={'600'} mr={'10'}>
                {name}
              </Text>
              <Icon color={'black'} />
            </Pressable>
          ))}
        </VStack>
      </Animated.View>
      <Pressable
        bottom={0}
        display={state.open ? 'flex' : 'none'}
        left={0}
        onPress={closeDrawer}
        position={'absolute'}
        right={sixtyPercent}
        top={0}
        zIndex={1}
      />
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerLayout;
