import React, {forwardRef, ReactNode} from 'react';
import {FlatList, HStack, IconButton, Stack, useTheme} from 'native-base';
import {Add, Home2, Icon, MessageMinus, Note} from 'iconsax-react-native';
import {TabItem} from '~/components';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RootParamList} from '~/screens/type';
import {IFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList';

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
  {path: 'dashboardScreen', Icon: Home2, name: 'home'},
  {path: 'advertisingListScreen', Icon: Note, name: 'list'},
  {path: 'chatListScreen', Icon: MessageMinus, name: 'chat'},
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
    const {colors} = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    return (
      <Stack bg={props.bg} h={'full'} safeArea>
        {hiddenElements}
        {header}
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
            <TabItem key={name} active={route.name === path}>
              <IconButton
                bg={btn.bg || 'transparent'}
                h={'14'}
                onPress={() => navigation.navigate(path)}
                rounded={'full'}
                w={'14'}
                icon={
                  <Icon
                    size={28}
                    color={
                      btn.color ||
                      (route.name === path ? 'black' : colors.gray['400'])
                    }
                  />
                }
              />
            </TabItem>
          ))}
        </HStack>
      </Stack>
    );
  },
) as <ItemT>(props: Props<ItemT>, ref: any) => any;

export default MainLayout;
