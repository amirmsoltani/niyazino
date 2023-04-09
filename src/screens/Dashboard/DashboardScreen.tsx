import {FC} from 'react';
import {StackScreenProps} from "@react-navigation/stack";
import {RootParamList} from "~/screens/type";
import {
    Badge,
    Button,
    Center,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    ScrollView,
    Stack,
    StatusBar,
    Text,
    useTheme,
    VStack
} from "native-base";
import {Add, AlignLeft} from "iconsax-react-native";
import {MainLayout} from "~/layout";

type Props = StackScreenProps<RootParamList, "dashboardScreen">;

const DashboardScreen: FC<Props> = () => {
    const {colors} = useTheme()
    return (
        <MainLayout bg={"coolGray.100"}>
            <Stack flex={1}>
                <ScrollView bg={"orange.600"} automaticallyAdjustKeyboardInsets
                            _contentContainerStyle={{pb: 6, minH: "full"}} nestedScrollEnabled>
                    <StatusBar backgroundColor={colors.orange["600"]}/>
                    <HStack mt={8} ml={8}>
                        <IconButton icon={<AlignLeft size={32} color={colors.black}/>} p={0}/>
                    </HStack>
                    <Center mt={20} mx={8}>
                        <Image source={require("~/assets/images/logoWhite.png")} alt={"logo"} resizeMode={"center"}
                               w={"48"}
                               height={"24"}/>
                        <Text fontSize={"md"} color={"white"} fontWeight={"600"}>عصر جدیدی در نیازمندی ها</Text>
                        <Input variant={"rounded"} bg={"white"} shadow={"4"} mt={4} h={"55px"}
                               paddingRight={12}
                               textAlign={"center"}
                               fontSize={"md"}
                               fontWeight={"600"}
                               placeholder={"چی نیاز داری بگو برات ثبت کنم؟!"}
                               _focus={{bg: "white"}}
                               leftElement={
                                   <IconButton
                                       icon={<Add color={colors.white}/>}
                                       bg={"orange.600"}
                                       rounded={"full"}
                                       m={2}
                                   />}/>

                    </Center>
                    <HStack mt={4} px={8} flexWrap={"wrap"} justifyContent={"flex-end"} flexDir={"row"}>
                        <Button rounded={"full"} flexGrow={1} bg={"black"} h={"12"} _text={{fontWeight: "600"}} mt={4}
                                mr={"4"}>
                            نقاش لازمم
                        </Button>
                        <Button rounded={"full"} flexGrow={1} bg={"black"} fontWeight={"600"} h={"12"}
                                _text={{fontWeight: "600"}}
                                mt={4}>
                            یک ماشین مدل ۹۶ لازم دارم
                        </Button>
                        <Button rounded={"full"} px={4} bg={"black"} fontWeight={"600"} h={"12"}
                                _text={{fontWeight: "600"}}
                                mt={4} mr={4}>
                            بوس بده
                        </Button>
                        <Button rounded={"full"} px={4} bg={"black"} fontWeight={"600"} h={"12"}
                                _text={{fontWeight: "600"}}
                                mt={4}>(:
                            زن
                            میخوام</Button>
                    </HStack>

                </ScrollView>
            </Stack>
            <Stack bg={"orange.600"}>
                <VStack alignSelf={"flex-end"} bg={"coolGray.100"} w={"full"} roundedTop={"3xl"} px={8}>
                    <Center><Badge colorScheme={"warmGray"} rounded={"full"} pt={"2px"} pb={0} px={8}
                                   variant={"solid"} mt={4} mb={8} opacity={.5}/></Center>
                    <Heading size={"md"}>نیازینو چیه و به چه دردی میخوره؟</Heading>
                    <Text color={"gray.400"} mt={4} mb={8} fontWeight={"600"}>
                        اجازه دهید صفحه درباره ما بگوید شرکت چگونه شروع به کارکرده است یک روایت کوتاهی را...
                        <Text color={"orange.600"} fontWeight={"600"}>
                            {" "} بیشتر
                        </Text>
                    </Text>
                </VStack>
            </Stack>
        </MainLayout>
    );
};

export default DashboardScreen;