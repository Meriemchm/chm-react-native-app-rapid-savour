import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import Tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
const PreparingOrderScreen = () => {
  useDeviceContext(Tw);

  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <SafeAreaView style={Tw`bg-third flex-1 justify-center items-center`}>
      {/* <Animatable.Image
        animation="slideInUp"
        iterationCount={1}
        style={Tw`h-96 w-96`}
      /> */}
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={Tw`text-lg my-10 text-white font-bold text-center`}
      >
        Wainting for Restaurant to accept your order !
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
