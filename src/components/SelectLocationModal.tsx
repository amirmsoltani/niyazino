import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Box,
  Button,
  Checkbox,
  FlatList,
  HStack,
  Input,
  Modal,
  Spinner,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import {
  ArrowRight,
  EmojiSad,
  LocationTick,
  SaveRemove,
  SearchNormal1,
} from 'iconsax-react-native';
import {useHttpRequest} from '~/hooks';
import {CityType, DistrictType, ProvinceType} from '~/types';
import {
  advertisingRemoveData,
  advertisingSetData,
  clearLocation,
  deleteDistrict,
  setLocation,
  setRemoveDistrict,
} from '~/store/slices';

export type RefType = {
  isOpen: boolean;
  setStatus: (open?: boolean) => void;
};

type PropsType = {
  defaultOpen?: boolean;
  global?: boolean;
  closeButtonHidden?: boolean;
};

type StateType = {
  isOpen: boolean;
};

const SelectLocationModal = forwardRef<RefType, PropsType>((props, ref) => {
  const {
    request,
    dispatch,
    state: {response, districts, stage, province_id},
  } = useHttpRequest({
    clearAfterUnmount: ['cityList', 'districtList'],
    selector: ({
      http: {provinceList, cityList, districtList},
      locations,
      advertising,
    }) => {
      const stage =
        (((props.global && locations.city) || advertising.city_id) &&
          'districts') ||
        (((props.global && locations.province) || advertising.province_id) &&
          'cities') ||
        'provinces';
      return {
        stage,
        response:
          (stage === 'districts' && districtList) ||
          (stage === 'cities' && cityList) ||
          provinceList,
        ...(props.global
          ? {
              districts: locations.districts,
              city_id: locations.city?.id,
              province_id: locations.province?.id,
            }
          : {
              districts: advertising.districts_ids,
              city_id: advertising.city_id,
              province_id: advertising.province_id,
            }),
      };
    },

    initialRequests: (request, state) => {
      if (state.province_id || state.city_id) {
        request((state.city_id && 'districtList') || 'cityList', {
          params: {id: state.city_id! || state.province_id!},
        });
      }
    },
  });
  const [state, setState] = useState<StateType>({
    isOpen: props.defaultOpen ?? false,
  });
  const [searchValue, setSearchValue] = useState('');
  const setStatus: RefType['setStatus'] = (open = false) => {
    if (open !== state.isOpen) {
      setState({...state, isOpen: open});
    }
  };

  useImperativeHandle(ref, () => ({isOpen: state.isOpen, setStatus}), [state]);
  const stageName =
    (stage === 'districts' && 'منطقه') ||
    (stage === 'cities' && 'شهر') ||
    'استان';

  const list = response?.data?.data[response!.data.__typename];
  const filterList =
    list?.filter(item => item.name.includes(searchValue)) || [];
  const {colors} = useTheme();
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={state.isOpen}
      onClose={setStatus}
      avoidKeyboard>
      <Modal.Content w={'full'}>
        {props.closeButtonHidden ? null : <Modal.CloseButton />}
        <Modal.Header>{'انتخاب ' + stageName}</Modal.Header>

        <VStack flexGrow={1} px={4}>
          <Input
            _focus={{bg: 'white'}}
            bg={'white'}
            borderWidth={0}
            fontSize={'md'}
            fontWeight={'500'}
            h={'14'}
            m={1}
            mt={4}
            placeholder={`نام ${stageName} را وارد کنید`}
            placeholderTextColor={'gray.300'}
            pr={4}
            shadow={2}
            textAlign={'right'}
            value={searchValue}
            variant={'rounded'}
            InputLeftElement={
              <Box pl={4}>
                <SearchNormal1 color="black" size={20} />
              </Box>
            }
            onChangeText={text => {
              setSearchValue(text);
            }}
          />
          <FlatList<ProvinceType | CityType | DistrictType>
            data={filterList}
            h={'64'}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            my={4}
            px={4}
            windowSize={6}
            ListEmptyComponent={() =>
              response?.httpRequestStatus === 'loading' ? (
                <Spinner />
              ) : stage === 'districts' ? null : (
                <VStack alignItems={'center'}>
                  <EmojiSad color={'gray'} />
                  <Text color={'gray.400'} fontWeight={'600'} mt={'2'}>
                    اطلاعاتی موجود نیست
                  </Text>
                </VStack>
              )
            }
            ListHeaderComponent={
              stage === 'districts' ? (
                <Checkbox
                  flexDirection={'row-reverse'}
                  h={16}
                  justifyContent={'space-between'}
                  size={'sm'}
                  value={'-1'}
                  w={'full'}
                  isChecked={
                    (districts &&
                      ((Array.isArray(districts) && districts.includes('-1')) ||
                        '-1' in (districts as any))) ||
                    false
                  }
                  onChange={isSelected => {
                    if (props.global) {
                      if (isSelected) {
                        dispatch(clearLocation('districts'));
                        dispatch(
                          setLocation({
                            _name: 'districts',
                            value: {id: -1, title: 'تمامی منطقه ها'},
                          }),
                        );
                      } else {
                        dispatch(deleteDistrict(-1));
                      }
                    } else {
                      dispatch(advertisingSetData({districts_ids: ['-1']}));
                    }
                  }}>
                  {'تمامی منطقه ها'}
                </Checkbox>
              ) : null
            }
            renderItem={({item}) =>
              stage === 'districts' ? (
                <Checkbox
                  flexDirection={'row-reverse'}
                  h={16}
                  justifyContent={'space-between'}
                  size={'sm'}
                  value={item.id.toString()}
                  w={'full'}
                  isChecked={
                    (districts &&
                      ((Array.isArray(districts) &&
                        districts.includes(item.id.toString())) ||
                        item.id in (districts as any))) ||
                    false
                  }
                  onChange={isSelected => {
                    if (props.global) {
                      if (isSelected) {
                        if ('-1' in (districts as any)) {
                          dispatch(deleteDistrict(-1));
                        }
                        dispatch(
                          setLocation({
                            _name: 'districts',
                            value: {id: item.id, title: item.name},
                          }),
                        );
                      } else {
                        dispatch(deleteDistrict(item.id));
                      }
                    } else {
                      if (
                        Array.isArray(districts) &&
                        districts.includes('-1')
                      ) {
                        dispatch(advertisingSetData({districts_ids: []}));
                      }
                      dispatch(setRemoveDistrict(item.id.toString()));
                    }
                  }}>
                  {item.name}
                </Checkbox>
              ) : (
                <Button
                  _text={{fontWeight: '500'}}
                  my={2}
                  onPress={() => {
                    request(
                      stage === 'provinces' ? 'cityList' : 'districtList',
                      {
                        params: {
                          id: item.id,
                        },
                      },
                    );
                    setSearchValue('');
                    if (props.global) {
                      dispatch(
                        setLocation({
                          _name: stage === 'provinces' ? 'province' : 'city',
                          value: {id: item.id, title: item.name},
                        }),
                      );
                    } else {
                      dispatch(
                        advertisingSetData({
                          [stage === 'provinces' ? 'province_id' : 'city_id']:
                            item.id,
                        }),
                      );
                    }
                  }}>
                  {item.name}
                </Button>
              )
            }
          />
        </VStack>
        {stage !== 'provinces' ? (
          <Modal.Footer
            justifyContent={stage === 'city' ? 'flex-end' : 'space-between'}>
            <Button
              _pressed={{bg: 'orange.400'}}
              bg={'orange.200'}
              onPress={() => {
                setSearchValue('');
                if (stage === 'districts') {
                  request('cityList', {params: {id: province_id!}});
                }
                if (props.global) {
                  dispatch(
                    clearLocation((stage === 'cities' && 'province') || 'city'),
                  );
                } else {
                  dispatch(
                    advertisingRemoveData(
                      (stage === 'cities' && 'province_id') || 'city_id',
                    ),
                  );
                }
              }}>
              <ArrowRight color={colors.gray['600']} />
            </Button>
            <HStack display={stage === 'districts' ? 'flex' : 'none'}>
              <Button
                _pressed={{bg: 'orange.400'}}
                bg={'red.200'}
                mr={2}
                onPress={() => {
                  if (props.global) {
                    dispatch(clearLocation('districts'));
                  } else {
                    dispatch(advertisingSetData({districts_ids: []}));
                  }
                }}>
                <SaveRemove color={colors.gray['600']} />
              </Button>
              <Button
                _pressed={{bg: 'orange.400'}}
                bg={'success.200'}
                onPress={() => {
                  setStatus(false);
                }}>
                <LocationTick color={colors.gray['600']} />
              </Button>
            </HStack>
          </Modal.Footer>
        ) : null}
      </Modal.Content>
    </Modal>
  );
});

export default SelectLocationModal;
