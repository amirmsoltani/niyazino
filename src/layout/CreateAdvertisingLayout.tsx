import React, {FC, ReactNode} from 'react';
import {Badge, Box, Button, HStack, IconButton, Stack, StatusBar, Text, VStack} from "native-base";
import {Add} from "iconsax-react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {RootParamList} from "~/screens/type";

type PropsType = { children: ReactNode };

const tabItems: { name: string; path: keyof RootParamList }[] = [
    {name: "دسته بندی", path: "createAdvertisingCategoryScreen"},
    {name: "عنوان", path: "createAdvertisingTitleScreen"},
    {name: "مشخصات", path: "createAdvertisingDescriptionScreen"},
    {name: "تایید هویت", path: "createAdvertisingAuthorizeScreen"},
]
const CreateAdvertisingLayout: FC<PropsType> = ({children}) => {
    const navigation = useNavigation();
    const route = useRoute();
    let find = -1;
    return (
        <VStack bg={"blueGray.100"} h={"full"} justifyContent={"space-between"}>
            <StatusBar backgroundColor={"white"}/>
            <Stack bg={"white"} roundedBottom={"3xl"} shadow={6} py={4} px={6}>
                <HStack justifyContent={"space-between"}
                        w={"full"} alignItems={"center"}>
                    <IconButton icon={<Add color={"black"} size={42} rotation={45}/>} p={0}
                                onPress={() => navigation.reset({index: 0, routes: [{name: "dashboardScreen"}]})}/>
                    <Text fontSize={"2xl"} fontWeight={"800"}>ثبت آگهی</Text>
                </HStack>
                <HStack justifyContent={"space-between"} my={6}>
                    {
                        tabItems.map(({name, path}, index) => {
                            const color = find === -1 ? "orange.600" : "gray.400";
                            find = route.name === path ? index : find;
                            return (<Box w={"1/5"} key={name}>
                                <Text textAlign={"center"} color={color}>{name}</Text>
                                <Badge variant={"solid"} w={"full"} mt={2} rounded={"3xl"}
                                       backgroundColor={color}/>
                            </Box>);
                        })
                    }
                </HStack>
            </Stack>
            <Stack flex={1} py={4}>
                {children}
            </Stack>
            <HStack pb={8} px={6} space={4} justifyContent={"space-between"}>
                <Button
                    borderWidth={2}
                    borderColor={"gray.400"}
                    _pressed={{bg: "coolGray.300"}}
                    onPress={() => find === 0 ? navigation.reset({
                        routes: [{name: "dashboardScreen"}],
                        index: 0
                    }) : navigation.goBack()}
                    rounded={"3xl"}
                    variant={"outline"}
                    _text={{color: "gray.400", fontWeight: "500", fontSize: "lg"}}
                    flex={1}
                    py={4}
                >
                    {find === 0 ? "انصراف" : "قبلی"}
                </Button>
                <Button
                    _pressed={{bg: "orange.400"}}
                    onPress={() => find + 1 < tabItems.length && navigation.navigate(tabItems[find + 1].path)}
                    rounded={"3xl"}
                    _text={{color: "white", fontWeight: "500", fontSize: "lg"}}
                    flex={1}
                    bg={"orange.600"}
                    py={4}
                >
                    بعدی
                </Button>
            </HStack>
        </VStack>
    );
};

export default CreateAdvertisingLayout;