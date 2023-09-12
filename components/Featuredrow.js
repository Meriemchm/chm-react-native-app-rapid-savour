import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { ArrowLongRightIcon } from "react-native-heroicons/outline";
import Tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";
import RestaurantCard from "./RestaurantCard";
import client from "../sanity";

const Featuredrow = ({ title }) => {
  useDeviceContext(Tw);
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    client
      .fetch(
        ` *[_type == "restaurants"] {
          ...,
          dishes[]->{
            ...,
          }    
      }`
      )
      .then((data) => {
        setRestaurants(data);
      });
  }, []);

  return (
    <View>
      <View style={Tw`flex flex-row justify-between mt-4 px-4`}>
        <Text style={Tw`text-xl font-bold `}>{title}</Text>
        <ArrowLongRightIcon style={Tw`text-third `} size={30} />
      </View>

      <ScrollView
        horizontal
        style={Tw`px-4 py-4 `}
        showsHorizontalScrollIndicator={false}
      >
        {restaurants?.map(
          ({ name, image, address, rating, _id, description, dishes }) => {
            return (
              <RestaurantCard
                key={_id}
                id={_id}
                imgUrl={image}
                title={name}
                address={address}
                rating={rating}
                description={description}
                dishes={dishes}
              />
            );
          }
        )}
      </ScrollView>
    </View>
  );
};

export default Featuredrow;
