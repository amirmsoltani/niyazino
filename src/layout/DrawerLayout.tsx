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
import {
  defaultDrawerContextValue,
  DrawerContext,
  drawerReducer,
  useHttpRequest,
} from '~/hooks';
import {CallCalling, Icon, Receipt21, Save2} from 'iconsax-react-native';
import {RootParamList} from '~/screens/type';
import {Animated, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {httpClear} from '~/store/slices';
import {syncStorageAction} from '~/store/Actions';
import {AuthModal, AuthModalRef} from '~/components';
import {convertNumToPersian} from '~/util/ChangeToJalali';
import socketEmit from '~/store/Actions/socketEmit.action';

const {width} = Dimensions.get('window');
const sixtyPercent = Math.floor(width * 0.6);
const drawerItems: {
  name: string;
  path: keyof Pick<
    RootParamList,
    'userBookmarksScreen' | 'userAdvertisingScreen'
  >;
  Icon: Icon;
}[] = [
  {
    name: 'آگهی های من',
    path: 'userAdvertisingScreen',
    Icon: Receipt21,
  },
  {name: 'نشان شده ها', path: 'userBookmarksScreen', Icon: Save2},
  {
    name: 'پشتیبانی',
    path: 'userAdvertisingScreen',
    Icon: CallCalling,
  },
];
type PropsType = {children: ReactNode};
const DrawerLayout: FC<PropsType> = ({children}) => {
  const authModalRef = useRef<AuthModalRef>(null);
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

  const {
    state: {isLogin, user},
    dispatch: reduxDispatch,
    request,
  } = useHttpRequest({
    selector: state => ({
      user: state.http.getMe,
      isLogin: state.http.verifyCode?.httpRequestStatus === 'success',
      verifyCode: state.http.verifyCode,
    }),
    onUpdate: (lastState, state) => {
      if (
        (lastState.verifyCode?.httpRequestStatus === 'loading' &&
          state.verifyCode?.httpRequestStatus === 'success') ||
        (lastState.verifyCode?.httpRequestStatus === 'success' &&
          state.verifyCode?.httpRequestStatus === 'idle')
      ) {
        reduxDispatch(syncStorageAction('update'));
      }
      if (
        state.isLogin &&
        ['error', 'idle', undefined].includes(state.user?.httpRequestStatus)
      ) {
        reduxDispatch({type: 'SOCKET_CONNECT'});
        request('getMe', undefined);
      }
    },
  });
  return (
    <DrawerContext.Provider value={{...state, dispatch}}>
      <AuthModal ref={authModalRef} />
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
        {isLogin && user?.httpRequestStatus === 'success' ? (
          <HStack alignItems={'center'} justifyContent={'center'} px={6}>
            <Text fontWeight={600} mr={4}>
              {convertNumToPersian(
                user.data!.data[user.data!.__typename].mobile,
              )}
            </Text>
            <Avatar bg={'coolGray.200'}>AM</Avatar>
          </HStack>
        ) : null}
        <Button
          borderColor={'orange.400'}
          mx={6}
          my={4}
          py={2}
          variant={'outline'}
          onPress={() => {
            if (isLogin) {
              request('logOut', undefined);
              reduxDispatch(socketEmit('disconnect', undefined));
              reduxDispatch(httpClear(['verifyCode', 'getMe']));
            } else {
              authModalRef.current!.setStatus(true);
            }
          }}>
          {isLogin ? 'خروج از حساب کاربری' : 'ورود به حساب کاربری'}
        </Button>
        {isLogin ? (
          <VStack borderTopColor={'gray.200'} borderTopWidth={1}>
            {drawerItems.map(({name, path, Icon}) => (
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
                  navigation.navigate(path);
                }}>
                <Text fontWeight={'600'} mr={'10'}>
                  {name}
                </Text>
                <Icon color={'black'} />
              </Pressable>
            ))}
          </VStack>
        ) : null}
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
