import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Animated,
  SafeAreaView,
} from "react-native";
import Tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { XMarkIcon } from "react-native-heroicons/outline";
import { selectRestaurant } from "../features/restaurantSlice";
import MapView from "react-native-maps";
const DeliveryScreen = () => {
  useDeviceContext(Tw);
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const animated = new Animated.Value(1);
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    setTimeout((timeout) => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);
  return (
    <View style={Tw`bg-third flex-1 `}>
      <SafeAreaView style={Tw`z-50 `}>
        <View style={Tw`flex-row justify-between items-center p-5`}>
          <Pressable
            onPressIn={fadeIn}
            onPressOut={fadeOut}
            onPress={() => navigation.navigate("Home")}
          >
            <Animated.View
              style={{
                opacity: animated,
              }}
            >
              <View style={Tw`rounded-full `}>
                <XMarkIcon style={Tw`text-primary`} />
              </View>
            </Animated.View>
          </Pressable>
          <Text style={Tw`font-light text-white text-lg `}>Order help</Text>
        </View>
        <View style={Tw`bg-primary mx-5 my-2 rounded-md p-6 z-50 shadow-md `}>
          <View>
            <Text style={Tw` text-grayone text-lg `}>Estimated Arrival</Text>
            <Text style={Tw`text-4xl font-bold `}></Text>
          </View>
        </View>
      </SafeAreaView>

      <MapView></MapView>
      <SafeAreaView style={Tw`bg-primary `}>
        <View>
          <Text>Chami Meriem</Text>
          <Text>Your Rider</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
