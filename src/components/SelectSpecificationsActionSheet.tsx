import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Actionsheet,
  Box,
  Checkbox,
  HStack,
  Input,
  Stack,
  Text,
} from 'native-base';
import {SearchNormal1} from 'iconsax-react-native';

export type RefType = {
  isOpen: boolean;
  setStatus: (open?: boolean) => void;
};

type PropsType = {defaultOpen?: boolean};

type StateType = {
  isOpen: boolean;
};
const SelectSpecificationsActionSheet = forwardRef<RefType, PropsType>(
  (props, ref) => {
    const [state, setState] = useState<StateType>({
      isOpen: props.defaultOpen ?? false,
    });
    const setStatus: RefType['setStatus'] = (open = false) => {
      if (open !== state.isOpen) {
        setState({...state, isOpen: open});
      }
    };

    useImperativeHandle(ref, () => ({isOpen: state.isOpen, setStatus}), [
      state,
    ]);
    return (
      <Actionsheet isOpen={state.isOpen} onClose={setStatus}>
        <Actionsheet.Content alignItems={'flex-start'} minH={'2/3'} p={6}>
          <Text fontSize={'lg'} fontWeight={700} mt={4}>
            خصوصیات محصول
          </Text>

          <Stack mt={6}>
            <Text fontSize={'md'} fontWeight={700}>
              چه نوع محصولی
            </Text>
            <HStack mt={4}>
              <Checkbox
                _text={{color: 'gray.400'}}
                bg={'gray.200'}
                borderWidth={0}
                boxSize={'18px'}
                mr={6}
                value={'new'}>
                نو
              </Checkbox>
              <Checkbox
                _text={{color: 'gray.400'}}
                bg={'gray.200'}
                borderWidth={0}
                boxSize={'18px'}
                value={'stock'}>
                دست دو
              </Checkbox>
            </HStack>
          </Stack>
          <Stack mt={6}>
            <Text fontSize={'md'} fontWeight={700}>
              سال ساخت
            </Text>
            <Checkbox
              _text={{color: 'gray.400'}}
              bg={'gray.200'}
              borderWidth={0}
              boxSize={'18px'}
              mt={4}
              value={'new'}>
              ۱۳۹۶
            </Checkbox>
            <Checkbox
              _text={{color: 'gray.400'}}
              bg={'gray.200'}
              borderWidth={0}
              boxSize={'18px'}
              mt={4}
              value={'stock'}>
              ۱۳۹۴
            </Checkbox>
            <Checkbox
              _text={{color: 'gray.400'}}
              bg={'gray.200'}
              borderWidth={0}
              boxSize={'18px'}
              mt={4}
              value={'stock'}>
              ۱۳۹۳
            </Checkbox>
          </Stack>
        </Actionsheet.Content>
      </Actionsheet>
    );
  },
);

export default SelectSpecificationsActionSheet;
