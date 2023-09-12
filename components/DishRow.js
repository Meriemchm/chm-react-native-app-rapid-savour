import React, { useState } from "react";
import { View, Text, Image, Pressable, Animated } from "react-native";
import Tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../features/basketSlice";
const DishRow = ({ id, imgUrl, name, description, price }) => {
  useDeviceContext(Tw);
  const [pressed, setPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));

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

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, imgUrl, name, description, price }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <Pressable
        onPressIn={fadeIn}
        onPressOut={fadeOut}
        onPress={() => setPressed(!pressed)}
        style={Tw` flex`}
      >
        <Animated.View
          style={{
            opacity: animated,
          }}
        >
          <View style={Tw`flex-row gap-2`}>
            <View style={Tw`flex-1 gap-2`}>
              <Text style={Tw`text-lg mb-1 `}> {name} </Text>
              <Text style={Tw`text-grayone `}>{description}</Text>
              <Text style={Tw`text-grayone mt-2 `}>
                <Currency quantity={price} />
              </Text>
            </View>

            <Image
              source={{
                uri: urlFor(imgUrl).url(),
              }}
              style={Tw`w-24 h-40 rounded-lg `}
            />
          </View>
        </Animated.View>
      </Pressable>

      {pressed && (
        <View>
          <View style={Tw` flex-row items-center`}>
            <Pressable
              onPressIn={fadeIn}
              onPressOut={fadeOut}
              onPress={removeItemFromBasket}
              disabled={!items.length}
            >
              <Animated.View
                style={{
                  opacity: animated,
                }}
              >
                <MinusCircleIcon style={Tw` text-third `} />
              </Animated.View>
            </Pressable>

            <Text style={Tw`px-2 text-graytwo `}>{items.length}</Text>

            <Pressable
              onPressIn={fadeIn}
              onPressOut={fadeOut}
              onPress={addItemToBasket}
            >
              <Animated.View
                style={{
                  opacity: animated,
                }}
              >
                <PlusCircleIcon style={Tw` text-third `} />
              </Animated.View>
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
