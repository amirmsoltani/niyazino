import React, {FC, useEffect} from 'react';
import {RootParamList} from "~/screens/type";
import {Box, Center, Image, Spinner} from "native-base";
import {StackScreenProps} from "@react-navigation/stack";

type Props = StackScreenProps<RootParamList, "welcomeScreen">;
const WelcomeScreen: FC<Props> = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("dashboardScreen")
        }, 2000)
    })
    return (
        <Center w={"full"} h={"full"} bg={"orange.600"} safeArea>
            <Box w={"full"} maxW={"full"}>
                <Image source={require("~/assets/images/logoWhite.png")} alt="logo" resizeMode={"center"}/>
                <Spinner color={"white"} size={"lg"}/>
            </Box>
        </Center>
    );
};

export default WelcomeScreen;