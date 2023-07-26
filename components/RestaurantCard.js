import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import Tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";
import { StarIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity"

const RestaurantCard = ({ imgUrl, title, address, rating }) => {
  useDeviceContext(Tw);
  return (
    <Pressable style={Tw`flex gap-5 bg-primary py-4 rounded-lg mr-4`}>
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
    </Pressable>
  );
};

export default RestaurantCard;
