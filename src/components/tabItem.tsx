import React, {FC, ReactNode} from 'react';
import {Badge, Center} from 'native-base';

type PropsType = {active?: boolean; children: ReactNode};
const TabItem: FC<PropsType> = ({active = false, children}) => {
  return (
    <Center>
      {children}
      {active ? (
        <Badge
          bottom={-5}
          colorScheme={'orange'}
          pb={0}
          pl={1}
          position={'absolute'}
          pr={0}
          pt={1}
          rounded={'full'}
          variant={'solid'}
        />
      ) : null}
    </Center>
  );
};

export default TabItem;
