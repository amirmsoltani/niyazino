import React, {FC, ReactNode} from 'react';
import {HStack, IconButton, ScrollView, Stack, useTheme} from 'native-base';
import {Add, Home2, MessageMinus, Note} from 'iconsax-react-native';
import {TabItem} from '~/components';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {useNavigation, useRoute} from '@react-navigation/native';

type Props = {children: ReactNode; bg?: ColorType};

const items = [
  {name: 'chat', Icon: MessageMinus},
  {name: 'note', Icon: Note},
  {name: 'dashboardScreen', Icon: Home2},
];
const MainLayout: FC<Props> = ({children, bg = 'orange.600'}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <Stack safeArea>
      <ScrollView
        _contentContainerStyle={{minH: 'full', maxH: 'full'}}
        h="full">
        <Stack bg={bg} flex={1}>
          {children}
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
          <IconButton
            bg={'orange.600'}
            h={'14'}
            icon={<Add color={colors.black} size={28} />}
            rounded={'full'}
            w={'14'}
            onPress={() =>
              navigation.navigate('createAdvertisingCategoryScreen')
            }
          />
          {items.map(({name, Icon}) => (
            <TabItem key={name} active={route.name === name}>
              <IconButton
                h={'14'}
                rounded={'full'}
                w={'14'}
                icon={
                  <Icon
                    color={route.name === name ? 'black' : colors.gray['400']}
                    size={28}
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
