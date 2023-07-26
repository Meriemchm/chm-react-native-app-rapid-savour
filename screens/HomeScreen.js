import React, { useLayoutEffect } from "react";
import { View, Text, SafeAreaView, TextInput, ScrollView } from "react-native";
import Tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline"; // Check the import statement
import { MagnifyingGlassIcon } from "react-native-heroicons/solid"; // Check the import statement
import Categories from "../components/Categories";
import Featuredrow from "../components/Featuredrow";

const HomeScreen = () => {
  useDeviceContext(Tw);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={Tw`bg-gray-100`}>
      <View style={Tw`flex flex-row justify-between  p-4`}>
        <View style={Tw`flex-1`}>
          <Text style={Tw`text-second text-center text-xl font-bold`}>
            Home
          </Text>
        </View>
        <UserIcon color="black" size={35} />
      </View>
      {/*search*/}
      <View style={Tw`flex-row justify-center items-center pb-2 mx-4 gap-5`}>
        <View style={Tw`bg-primary p-3`}>
          <AdjustmentsHorizontalIcon style={Tw`text-third`} size={25} />
        </View>
        <View style={Tw`flex-row flex-1 justify-between bg-primary p-3`}>
          <TextInput
            placeholder="search for food"
            inputMode="default"
            style={Tw`focus:ring-0 focus:ring-offset-0`}
          />
          <MagnifyingGlassIcon style={Tw`text-third `} size={25} />
        </View>
      </View>
      {/*body*/}
      <ScrollView>
        {/*categorie*/}
        <Categories />

        {/*featured rows*/}
        <Featuredrow title="Offers near you !" />
        <Featuredrow title="Today's best deals" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
