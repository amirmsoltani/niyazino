import React, {FC} from 'react';
import {Box, HStack, Pressable, Text, VStack} from 'native-base';
import {Clock, User} from 'iconsax-react-native';

type PropsType = {
  title: string;
  user: string;
  time: string;
  id: number;
  onPress?: (id: number) => void;
};
const ChatCard: FC<PropsType> = ({user, title, id, time, onPress}) => {
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
      <Box bg={'gray.100'} p={3} rounded={'full'} shadow={4}>
        <User color={'black'} size={28} />
      </Box>
      <VStack flex={1} ml={4}>
        <Text fontSize={'md'} fontWeight={700}>
          {user}
        </Text>
        <Text fontSize={'xs'} my={2}>
          {title}
        </Text>
        <HStack space={2}>
          <HStack>
            <Clock color={'gray'} size={16} />
            <Text color={'gray.500'} fontSize={'xs'} ml={2}>
              {time}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default ChatCard;
