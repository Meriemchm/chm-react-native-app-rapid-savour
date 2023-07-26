import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import Tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";
import { urlFor } from "../sanity";
const Categorycard = ({ imgUrl, title }) => {
  useDeviceContext(Tw);
  return (
    <Pressable style={Tw`px-2`}>
      <View style={Tw`flex justify-center items-center gap-2 `}>
        <Image
          source={{
            uri: urlFor(imgUrl).url(),
          }}
          style={Tw`h-20 w-20 rounded-lg`}
        />

        <Text style={Tw`capitalize`}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default Categorycard;
