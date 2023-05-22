import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  HStack,
  Input,
  Modal,
  Select,
  Spinner,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {useHttpRequest} from '~/hooks';
import {advertisingSetData} from '~/store/slices';

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

    const {
      state: {attributes, globalAttribute},
      dispatch,
    } = useHttpRequest({
      selector: state => ({
        attributes: state.http.attributes,
        category_id: state.advertising.category_id,
        globalAttribute: state.advertising.attributes || [],
      }),
      clearAfterUnmount: ['attributes'],
      initialRequests: (request, state) => {
        request('attributes', {params: {id: state.category_id!}});
      },
      onUpdate: (lastState, state) => {
        if (
          lastState.attributes?.httpRequestStatus === 'loading' &&
          state.attributes?.httpRequestStatus === 'success'
        ) {
          const attributes = state.attributes!.data!.data[
            state.attributes!.data!.__typename
          ].map(() => '-1');
          dispatch(advertisingSetData({attributes}));
        }
      },
    });
    return (
      <Modal
        isOpen={state.isOpen}
        justifyContent={'flex-start'}
        mt={10}
        onClose={setStatus}
        avoidKeyboard>
        <Modal.Content maxH={'3/5'} w={'full'}>
          <Modal.Header>خصوصیات محصول</Modal.Header>
          <Modal.CloseButton />

          <Modal.Body h={'full'}>
            {attributes?.httpRequestStatus === 'loading' ? (
              <Spinner size={'lg'} />
            ) : null}
            <VStack mb={6}>
              {attributes?.data?.data?.[attributes!.data!.__typename].map(
                (attribute, index) => (
                  <Stack key={attribute.id} mt={6}>
                    <HStack alignItems={'flex-end'}>
                      <Text fontSize={'md'} fontWeight={700}>
                        {attribute.title}
                      </Text>
                      <Text
                        color={'red.600'}
                        display={attribute.is_required ? 'flex' : 'none'}
                        fontSize={'2xs'}
                        ml={2}>
                        اجباری
                      </Text>
                    </HStack>
                    {attribute.type === 'select' ? (
                      <Stack bg={'white'} mt={4} rounded={'3xl'} shadow={4}>
                        <Select
                          bg={'transparent'}
                          borderWidth={0}
                          dropdownCloseIcon={<></>}
                          dropdownOpenIcon={<></>}
                          fontSize={'md'}
                          fontWeight={500}
                          placeholder={`${attribute.title} را انتخاب کنید`}
                          textAlign={'center'}
                          onValueChange={itemValue => {
                            const newAttribute = [...globalAttribute!];
                            newAttribute[index] = itemValue;
                            dispatch(
                              advertisingSetData({attributes: newAttribute}),
                            );
                          }}
                          selectedValue={
                            [undefined, null, '-1', ''].includes(
                              globalAttribute![index],
                            )
                              ? undefined
                              : globalAttribute![index].toString()
                          }>
                          {attribute.options.map(option => (
                            <Select.Item
                              key={option.id}
                              _pressed={{bg: 'orange.200'}}
                              _text={{textAlign: 'center'}}
                              alignItems={'center'}
                              label={option.title}
                              value={option.id.toString()}
                            />
                          ))}
                        </Select>
                      </Stack>
                    ) : (
                      <VStack w={'full'}>
                        <Input
                          _focus={{bg: 'white'}}
                          bg={'white'}
                          borderWidth={0}
                          fontSize={'md'}
                          fontWeight={500}
                          mt={4}
                          placeholder={`${attribute.title} را وارد کنید`}
                          shadow={4}
                          textAlign={'center'}
                          variant={'rounded'}
                          w={'full'}
                          keyboardType={
                            attribute.type === 'text' ? 'default' : 'numeric'
                          }
                          onChangeText={text => {
                            const newAttribute = [...globalAttribute!];
                            newAttribute[index] =
                              attribute.type === 'integer' && text
                                ? text.match(/\d/g)?.join('') || ''
                                : text;
                            dispatch(
                              advertisingSetData({attributes: newAttribute}),
                            );
                          }}
                          value={
                            [undefined, null, '-1', ''].includes(
                              globalAttribute![index],
                            )
                              ? undefined
                              : globalAttribute![index].toString()
                          }
                        />
                      </VStack>
                    )}
                  </Stack>
                ),
              )}
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );
  },
);

export default SelectSpecificationsActionSheet;
