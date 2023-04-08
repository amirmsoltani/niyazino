import React, {FC, ReactNode} from 'react';
import {Badge, Center} from "native-base";

type PropsType = { active?: boolean, children: ReactNode }
const TabItem: FC<PropsType> = ({active = false, children}) => {
    return (
        <Center>
            {children}
            {active ?
                <Badge variant={"solid"} position={"absolute"} colorScheme={"orange"} bottom={-5}
                       rounded={"full"} pt={1} pl={1} pb={0} pr={0}/> : null}
        </Center>
    );
};

export default TabItem;