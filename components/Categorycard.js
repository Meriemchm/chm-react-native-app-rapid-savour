import React from "react";
import { View, Text, Pressable, Image, Animated } from "react-native";
import Tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";
import { urlFor } from "../sanity";
const Categorycard = ({ imgUrl, title }) => {
  useDeviceContext(Tw);
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
    <Pressable style={Tw`px-2`} onPressIn={fadeIn} onPressOut={fadeOut}>
      <Animated.View
        style={{
          opacity: animated,
        }}
      >
        <View style={Tw`flex justify-center items-center gap-2 `}>
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            style={Tw`h-20 w-20 rounded-lg`}
          />

          <Text style={Tw`capitalize`}>{title}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default Categorycard;
