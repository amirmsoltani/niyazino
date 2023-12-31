import React, {FC} from 'react';
import {Box, HStack, Pressable, Text, VStack} from 'native-base';
import {Chart21, Clock, Stickynote} from 'iconsax-react-native';
import {mapStatus} from '~/util/MapStatus';

type PropsType = {
  title: string;
  category: string;
  time: string;
  id: number;
  price: string;
  status?: 'active' | 'pending' | 'rejected';

  onPress?: (id: number) => void;
};
const AdvertisingCard: FC<PropsType> = ({
  time,
  title,
  id,
  category,
  onPress,
  price,
  status,
}) => {
  return (
    <Pressable
      _pressed={{bg: 'orange.300'}}
      alignItems={'center'}
      bg={'white'}
      flex={1}
      flexDirection={'row'}
      m={2}
      onPress={() => onPress?.(id)}
      p={4}
      rounded={'3xl'}
      shadow={4}>
      <Box bg={'orange.100'} p={3} rounded={'full'}>
        <Stickynote color={'black'} size={28} />
      </Box>
      <VStack flex={1} ml={2}>
        <Text fontSize={'md'} fontWeight={700}>
          {title}
        </Text>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Text fontSize={'xs'} my={2}>
            {category}
          </Text>
          {status ? (
            <Text fontSize={'xs'} fontWeight={700}>
              {mapStatus[status]}
            </Text>
          ) : null}
        </HStack>
        <HStack space={2}>
          <HStack>
            <Clock color={'gray'} size={16} />
            <Text color={'gray.500'} fontSize={'xs'} ml={2}>
              {time}
            </Text>
          </HStack>
          <HStack flex={1}>
            <Chart21 color={'gray'} size={16} />
            <Text color={'gray.500'} fontSize={'xs'} ml={2}>
              {price}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default AdvertisingCard;
