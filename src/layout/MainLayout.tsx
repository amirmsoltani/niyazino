import React, {FC, ReactNode} from 'react';
import {HStack, IconButton, Stack, useTheme, VStack} from "native-base";
import {StyleSheet} from "react-native";
import {Add, Home2, MessageMinus, Note} from "iconsax-react-native";
import {TabItem} from "~/components";
import {ColorType} from "native-base/lib/typescript/components/types";

type Props = { children: ReactNode, bg?: ColorType };
const MainLayout: FC<Props> = ({children, bg = "orange.600"}) => {
    const {colors} = useTheme();
    return (
        <VStack justifyContent={"space-between"} h="full" bg={bg}>
            <Stack flex={1}>
                {children}
            </Stack>
            <HStack h={"28"} w={"full"} shadow={9} roundedTop={"3xl"} bg={"white"} alignItems={"center"} px={"8"}
                    justifyContent={"space-between"}>
                <IconButton icon={<Add color={colors.black} size={28}/>} rounded={"full"} bg={"orange.600"} h={"14"}
                            w={"14"}/>
                <IconButton icon={<MessageMinus color={colors.gray["400"]} size={28}/>} rounded={"full"} h={"14"}
                            w={"14"}/>
                <IconButton icon={<Note color={colors.gray["400"]} size={28}/>} rounded={"full"} h={"14"} w={"14"}/>
                <TabItem active>
                    <IconButton icon={<Home2 color={colors.black} size={28}/>} rounded={"full"} h={"14"} w={"14"}/>
                </TabItem>
            </HStack>
        </VStack>
    );
};

export default MainLayout;


const styles = StyleSheet.create({
    tabs: {
        shadowColor: "red",
        shadowOpacity: 1,
        shadowRadius: 30,
        shadowOffset: {width: 2, height: 2},
    }
})