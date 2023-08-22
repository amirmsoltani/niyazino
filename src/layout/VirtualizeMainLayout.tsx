import React, {forwardRef, ReactNode, useRef} from 'react';
import {FlatList, HStack, Stack, Text, useTheme} from 'native-base';
import {Add, Home2, Icon, MessageMinus, Note} from 'iconsax-react-native';
import {
  AuthModal,
  AuthModalRef,
  TabItem,
  UserDataModal,
  UserDataModalRef,
} from '~/components';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RootParamList} from '~/screens/type';
import {IFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList';
import {TouchableOpacity} from 'react-native';
import {useAppSelector} from '~/hooks/reduxHooks';
import {shallowEqual} from 'react-redux';

type Props<ItemI> = IFlatListProps<ItemI> & {
  hiddenElements?: ReactNode;
  header?: ReactNode;
};

const items: {
  name: string;
  Icon: Icon;
  path: keyof Pick<
    RootParamList,
    | 'dashboardScreen'
    | 'advertisingListScreen'
    | 'chatListScreen'
    | 'createAdvertisingCategoryScreen'
  >;
  bg?: ColorType;
  color?: string;
}[] = [
  {path: 'dashboardScreen', Icon: Home2, name: 'داشبورد'},
  {path: 'advertisingListScreen', Icon: Note, name: 'لیست آگهی ها'},
  {path: 'chatListScreen', Icon: MessageMinus, name: 'گفتگو'},
  {
    path: 'createAdvertisingCategoryScreen',
    Icon: Add,
    name: 'add',
    bg: 'orange.600',
    color: 'white',
  },
];
const MainLayout = forwardRef(
  ({hiddenElements, header, ...props}, ref: any) => {
    const {isLogin, self} = useAppSelector(
      state => ({
        isLogin: state.http.verifyCode?.httpRequestStatus === 'success',
        self: state.http.getMe,
      }),
      shallowEqual,
    );
    const authRef = useRef<AuthModalRef>(null);
    const userDataRef = useRef<UserDataModalRef>(null);
    const {colors} = useTheme();
    const navigation = useNavigation();
    const route = useRoute();

    return (
      <Stack bg={props.bg} h={'full'} safeArea>
        {hiddenElements}
        {header}
        <AuthModal ref={authRef} />
        <UserDataModal ref={userDataRef} />
        <Stack flex={1}>
          <FlatList {...props} ref={ref} />
        </Stack>
        <HStack
          alignItems={'center'}
          bg={'white'}
          h={'28'}
          justifyContent={'space-between'}
          px={'8'}
          roundedTop={'3xl'}
          shadow={9}
          w={'full'}>
          {items.map(({name, Icon, path, ...btn}) => (
            <TouchableOpacity
              key={name}
              onPress={() => {
                if (path === 'chatListScreen') {
                  if (!isLogin) {
                    return authRef.current?.setStatus(true);
                  } else if (
                    self?.httpRequestStatus === 'success' &&
                    self.data?.data.user.first_name === null
                  ) {
                    return userDataRef.current?.setStatus(true);
                  }
                }
                navigation.navigate(path);
              }}>
              <TabItem active={route.name === path}>
                <Stack
                  alignItems={'center'}
                  bg={btn.bg || 'transparent'}
                  h={path === 'createAdvertisingCategoryScreen' ? 14 : 'auto'}
                  justifyContent={'center'}
                  pb={path === 'createAdvertisingCategoryScreen' ? 2 : 1}
                  pt={2}
                  rounded={'full'}
                  w={'14'}>
                  <Icon
                    size={28}
                    color={
                      btn.color ||
                      (route.name === path ? 'black' : colors.gray['400'])
                    }
                  />
                </Stack>

                {path !== 'createAdvertisingCategoryScreen' ? (
                  <Text
                    fontSize={12}
                    fontWeight={'semibold'}
                    pb={2}
                    color={
                      btn.color ||
                      (route.name === path ? 'black' : colors.gray['400'])
                    }>
                    {name}
                  </Text>
                ) : null}
              </TabItem>
            </TouchableOpacity>
          ))}
        </HStack>
      </Stack>
    );
  },
) as <ItemT>(props: Props<ItemT>, ref: any) => any;

export default MainLayout;
