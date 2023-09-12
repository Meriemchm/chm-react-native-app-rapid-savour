import React from "react";
import { Text, View, Image, Pressable, Animated } from "react-native";
import Tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";
import { StarIcon } from "react-native-heroicons/solid";
import Currency from "react-currency-formatter";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";

const BasketContainer = () => {
  useDeviceContext(Tw);
  const navigation = useNavigation();
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
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  if (items?.length === 0) return null;

  return (
    <View style={Tw`absolute bottom-10 w-full z-50 `}>
      <Pressable
        onPressIn={fadeIn}
        onPressOut={fadeOut}
        onPress={() => navigation.navigate("Basket")}
      >
        <Animated.View
          style={{
            opacity: animated,
          }}
        >
          <View
            style={Tw`  mx-5 p-4 rounded-lg bg-third flex-row justify-start items-center gap-2`}
          >
            <Text
              style={Tw` text-primary font-extrabold text-lg bg-third shadow-opacity-10 py-1 px-2`}
            >
              {items.length}
            </Text>
            <Text
              style={Tw` flex-1 text-lg text-center text-primary font-extrabold`}
            >
              View basket
            </Text>
            <Text style={Tw` mt-2 text-primary font-extrabold`}>
              <Currency quantity={basketTotal} />
            </Text>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default BasketContainer;
