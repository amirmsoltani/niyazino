import React, {FC, ReactNode} from 'react';
import {HStack, IconButton, ScrollView, Stack, useTheme} from 'native-base';
import {Add, Home2, Icon, MessageMinus, Note} from 'iconsax-react-native';
import {TabItem} from '~/components';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RootParamList} from '~/screens/type';

type Props = {children: ReactNode; bg?: ColorType};

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
const MainLayout: FC<Props> = ({children, bg = 'orange.600'}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <Stack safeArea>
      <ScrollView
        _contentContainerStyle={{minH: 'full', maxH: 'full'}}
        bg={bg}
        h="full">
        <Stack flex={1}>{children}</Stack>
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
      </ScrollView>
    </Stack>
  );
};

export default MainLayout;
