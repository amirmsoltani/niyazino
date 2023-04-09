import React, {FC, ReactNode} from 'react';
import {HStack, IconButton, ScrollView, Stack, useTheme} from "native-base";
import {StyleSheet} from "react-native";
import {Add, Home2, MessageMinus, Note} from "iconsax-react-native";
import {TabItem} from "~/components";
import {ColorType} from "native-base/lib/typescript/components/types";
import {useNavigation, useRoute} from "@react-navigation/native";

type Props = { children: ReactNode, bg?: ColorType };

const items = [
    {name: "chat", Icon: MessageMinus},
    {name: "note", Icon: Note},
    {name: "dashboardScreen", Icon: Home2},
];
const MainLayout: FC<Props> = ({children, bg = "orange.600"}) => {
    const {colors} = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    return (
        <ScrollView h="full" bg={bg} _contentContainerStyle={{minH: "full"}}>
            <Stack flex={1}>
                {children}
            </Stack>
            <HStack h={"28"} w={"full"} shadow={9} roundedTop={"3xl"} bg={"white"} alignItems={"center"} px={"8"}
                    justifyContent={"space-between"}>
                <IconButton icon={<Add color={colors.black} size={28}/>} rounded={"full"} bg={"orange.600"} h={"14"}
                            w={"14"} onPress={() => navigation.navigate("createAdvertisingCategoryScreen")}/>
                {
                    items.map(({name, Icon}) => (
                        <TabItem active={route.name === name} key={name}>
                            <IconButton
                                icon={<Icon color={route.name === name ? "black" : colors.gray["400"]} size={28}/>}
                                rounded={"full"} h={"14"}
                                w={"14"}/>
                        </TabItem>
                    ))
                }

            </HStack>
        </ScrollView>
    )
        ;
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