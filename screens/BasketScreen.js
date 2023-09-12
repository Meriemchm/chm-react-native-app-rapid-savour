import React, {useMemo, useState } from "react";
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
import { XMarkIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  useDeviceContext(Tw);
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const [groupedItems, setGroupedItems] = useState([]);
  const basketTotal = useSelector(selectBasketTotal);

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

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[items.id] = results[items.id] || []).push(item);
      return results;
    }, {});
    setGroupedItems(groupedItems);
  }, [items]);

  return (
    <SafeAreaView style={Tw`flex-1`}>
      <View >

        <View
          style={Tw`p-5 border-b shadow-opacity-20 flex-row justify-between items-center bg-primary`}
        >
          <View>
            <Text
              style={Tw` text-lg text-center font-extrabold flex-1 capitalize`}
            >
              basket
            </Text>
            <Text style={Tw`text-center text-grayone`}>{restaurant.title}</Text>
          </View>

          <Pressable
            onPressIn={fadeIn}
            onPressOut={fadeOut}
            onPress={navigation.goBack}
          >
            <Animated.View
              style={{
                opacity: animated,
              }}
            >
              <View style={Tw`rounded-full `}>
                <XMarkIcon style={Tw`text-third`} />
              </View>
            </Animated.View>
          </Pressable>
        </View>

        <View
          style={Tw`flex-row items-center gap-4 px-4 py-3 bg-primary my-5 `}
        >
          <Image
            source={{
              uri: urlFor(restaurant.imgUrl).url(),
            }}
            style={Tw`h-20 w-20 rounded-lg`}
          />
          <Text style={Tw` flex-1`}>deliver</Text>

          <Pressable
            onPressIn={fadeIn}
            onPressOut={fadeOut}
            onPress={navigation.goBack}
          >
            <Animated.View
              style={{
                opacity: animated,
              }}
            >
              <Text style={Tw`text-third`}>change</Text>
            </Animated.View>
          </Pressable>
        </View>

        <ScrollView style={Tw`bg-primary`}>
          {Object.entries(groupedItems).map(([key, items]) => {
           
            return (
              <View key={key} style={Tw`flex-row px-4 py-3 gap-2 items-center`}>
                <Text>{items.length}x</Text>
                <Image
                  source={{
                    uri: urlFor(items[0]?.imgUrl).url(),
                  }}
                  style={Tw`h-12 w-12 rounded-full`}
                />
                <Text style={Tw` flex-1 font-bold`}>{items[0]?.name}</Text>
                <Text style={Tw`text-grayone `}>
                  <Currency quantity={items[0]?.price} />
                </Text>

                <Pressable
                  onPressIn={fadeIn}
                  onPressOut={fadeOut}
                  onPress={() => dispatch(removeFromBasket({ id: items[0]?.id }))}
                >
                  <Animated.View
                    style={{
                      opacity: animated,
                    }}
                  >
                    <Text style={Tw`text-third text-xs`}>Remove</Text>
                  </Animated.View>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>

        <View style={Tw`p-5 bg-white mt-5 gap-4 flex justify-end `}>
          <View style={Tw`flex-row justify-between `}>
            <Text style={Tw`text-grayone `}>Subtotal</Text>
            <Text style={Tw`text-grayone `}>
              <Currency quantity={basketTotal} />
            </Text>
          </View>
          <View style={Tw`flex-row justify-between `}>
            <Text style={Tw`text-grayone `}>Delivry fee</Text>
            <Text style={Tw`text-grayone `}>
              <Currency quantity={5.99} />
            </Text>
           
          </View>
          <View style={Tw`flex-row justify-between `}>
            <Text>Order Total</Text>
            <Text style={Tw`font-extrabold`}>
              <Currency quantity={basketTotal + 5.99} />
            </Text>
          </View>
          <Pressable onPressIn={fadeIn} onPressOut={fadeOut} onPress={()=>navigation.navigate('PreparingOrder') } >
            <Animated.View
              style={{
                opacity: animated,
              }}
            >
              <View style={Tw`rounded-lg bg-third p-4`}>
                <Text style={Tw`text-center text-primary text-lg font-bold`}>
                  Place Order
                </Text>
              </View>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
