import React from 'react';
import {ScrollView, Text} from 'native-base';
import {CreateAdvertisingLayout} from '~/layout';

const AdvertisingSpecificationsScreen = () => {
  return (
    <CreateAdvertisingLayout>
      <ScrollView flex={1}>
        <Text>Specifications</Text>
      </ScrollView>
    </CreateAdvertisingLayout>
  );
};

export default AdvertisingSpecificationsScreen;
