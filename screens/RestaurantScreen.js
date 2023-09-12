import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Animated,
} from "react-native";
import Tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLongLeftIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import BasketContainer from "../components/BasketContainer";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const {
    params: { id, imgUrl, title, address, rating, description, dishes },
  } = useRoute();
  const dispatch = useDispatch();
  useDeviceContext(Tw);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        address,
        rating,
        description,
        dishes,
      })
    );
  }, [dispatch]);

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
    <>
      <BasketContainer />

      <ScrollView style={Tw`h-full `}>
        <View style={Tw`relative `}>
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            style={Tw`h-40 w-full object-contain `}
          />
          <Pressable
            onPressIn={fadeIn}
            onPressOut={fadeOut}
            onPress={navigation.goBack}
            style={Tw`rounded-full bg-primary absolute p-1 top-15 left-5`}
          >
            <Animated.View
              style={{
                opacity: animated,
              }}
            >
              <ArrowLongLeftIcon style={Tw`text-third `} size={25} />
            </Animated.View>
          </Pressable>
        </View>

        <View style={Tw`bg-primary`}>
          <View style={Tw`px-4 pt-4 `}>
            <Text style={Tw`text-3xl font-bold`}>{title}</Text>
            <View style={Tw`flex-row gap-2 my-1 `}>
              <View style={Tw`flex-row items-center justify-center gap-2 `}>
                <StarIcon style={Tw`text-third `} size={22} />
                <Text style={Tw` text-third`}>{rating}</Text>
                <MapPinIcon style={Tw`text-third  text-3xl font-bold`} />
                <Text style={Tw` text-grayone`}>{address}</Text>
              </View>
            </View>
            <Text style={Tw` text-graytwo py-2`}>{description}</Text>
          </View>
          <Pressable onPressIn={fadeIn} onPressOut={fadeOut}>
            <Animated.View
              style={{
                opacity: animated,
              }}
            >
              <View
                style={Tw`flex flex-row items-center gap-2 border border-gray-100  px-4 py-4`}
              >
                <QuestionMarkCircleIcon style={Tw`text-graytwo `} size={25} />
                <Text style={Tw` pl-1 flex-1 text-md font-bold`}>
                  Have you a food allergy ?
                </Text>
                <ChevronRightIcon style={Tw`text-third `} size={25} />
              </View>
            </Animated.View>
          </Pressable>
        </View>

        <View style={Tw` text-grayone px-4 py-4 pt-4`}>
          <Text style={Tw` font-bold capitalize text-2xl`}>menu</Text>
        </View>

        <View style={Tw` bg-primary px-4 py-4 border-b border-gray-200 h-full`}>
          {dishes?.map((dish) => {
            return (
              <DishRow
                key={dish._id}
                id={dish._id}
                imgUrl={dish.image}
                name={dish.name}
                description={dish.description}
                price={dish.price}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
