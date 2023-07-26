import React from 'react'
import { View, Text, SafeAreaView, TextInput, ScrollView } from "react-native";
import Tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";
import { useNavigation } from "@react-navigation/native";;

const RestaurantScreen = () => {

 useDeviceContext(Tw);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View>
        <Text>
            hello
        </Text>
    </View>
  )
}

export default RestaurantScreen