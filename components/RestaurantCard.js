import React from "react";
import { Text, View, Image, Pressable, Animated } from "react-native";
import Tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";
import { StarIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({ id, imgUrl, title, address, rating,description,dishes }) => {
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

  return (
    <Pressable
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      style={Tw`flex gap-5 bg-primary pb-4 rounded-lg mr-4 hover:bg-white/50`}
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          address,
          rating,
          description,
          dishes,
        });
      }}
    >
      <Animated.View
        style={{
          opacity: animated,
        }}
      >
        <Image
          source={{
            uri: urlFor(imgUrl).url(),
          }}
          style={Tw`w-64 h-40 rounded-lg`}
        />
        <View style={Tw`flex flex-row justify-between items-center  p-2 `}>
          <View style={Tw`flex gap-2`}>
            <View style={Tw`flex-row gap-2`}>
              <Text style={Tw`font-bold`}>{title}</Text>
              <View style={Tw`flex-row gap-1 justify-center items-center`}>
                <StarIcon style={Tw`text-third`} size={18} />
                <Text style={Tw`text-third`}>{rating}</Text>
              </View>
            </View>

            <Text style={Tw`text-graytwo`}>{address}</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default RestaurantCard;
