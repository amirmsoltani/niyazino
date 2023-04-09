import React from 'react';
import {CreateAdvertisingLayout} from "~/layout";
import {Box, Button, Heading, HStack, Input, ScrollView, Text, VStack} from "native-base";
import {Menu, SearchNormal1} from "iconsax-react-native";

const categorise = [
    {name: "خدمات منزل"},
    {name: "وسایل نقلیه"},
    {name: "باربری"},
    {name: "موتور برقی"},
]
const subCategories = [
    {name: "خودروی سواری"},
    {name: "موتورسیکلت"},
    {name: "دوچرخه"},
]
const AdvertisingCategoryScreen = () => {
    return (
        <CreateAdvertisingLayout>
            <VStack h={"full"} justifyContent={"flex-start"}>
                <ScrollView automaticallyAdjustKeyboardInsets={true} px={6} pt={4} flexGrow={0}>
                    <Heading size={"md"}>انتخاب دسته بندی</Heading>
                    <Text color={"gray.400"} fontSize={"md"} fontWeight={"500"}>
                        لطفا دسته بندی مورد نظر خودتان را برای ثبت آگهی انتخاب بفرمائید
                    </Text>
                    <Input
                        placeholderTextColor={"gray.300"}
                        placeholder={"نام یک دسته بندی را وارد کنید"}
                        rightElement={<Box pr={4}><SearchNormal1 color="black" size={20}/></Box>}
                        borderWidth={0}
                        fontWeight={"500"}
                        textAlign={"right"}
                        fontSize={"md"}
                        variant={"rounded"}
                        shadow={2}
                        _focus={{bg: "white"}}
                        bg={"white"}
                        mt={6}
                        pl={4}
                        h={"14"}
                        m={1}
                    />

                </ScrollView>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    _contentContainerStyle={{py: 1}}
                    flexGrow={0}
                    horizontal
                    mt={6}
                >
                    {
                        categorise.map(({name}) => (
                                <Button
                                    fontWeight={"600"} h={"12"}
                                    rounded={"full"}
                                    shadow={2}
                                    _text={{fontWeight: "600", color: name === "وسایل نقلیه" ? "white" : "black"}}
                                    key={name}
                                    mx={2}
                                    px={6}
                                    bg={name === "وسایل نقلیه" ? "black" : "white"}
                                >
                                    {name}
                                </Button>
                            )
                        )
                    }
                </ScrollView>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    _contentContainerStyle={{py: 1}}
                    flexGrow={0}
                    horizontal
                    mt={4}
                >
                    {
                        subCategories.map(({name}) => (
                                <Button
                                    fontWeight={"600"} h={"12"}
                                    rounded={"full"}
                                    shadow={2}
                                    _text={{fontWeight: "600", color: name === "خودروی سواری" ? "white" : "black"}}
                                    key={name}
                                    mx={2}
                                    px={6}
                                    bg={name === "خودروی سواری" ? "black" : "white"}
                                >
                                    {name}
                                </Button>
                            )
                        )
                    }
                </ScrollView>
                <VStack flex={1} justifyContent={"flex-end"} px={6} mb={4} flexGrow={1}>
                    <HStack bg={"white"} shadow={5} rounded={"3xl"} justifyContent={"flex-end"} px={4} py="12px">
                        <Text bold fontSize={"md"}>خودروی سواری</Text>
                        <Text bold fontSize={"md"}>/</Text>
                        <Text mr={2} bold fontSize={"md"}>وسایل نقلیه</Text>
                        <Menu variant={"TwoTone"} color={"black"} size={24} rotation={90}/>
                    </HStack>
                </VStack>
            </VStack>

        </CreateAdvertisingLayout>
    )
        ;
};

export default AdvertisingCategoryScreen;