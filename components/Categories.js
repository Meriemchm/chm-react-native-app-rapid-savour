import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Categorycard from "./Categorycard";
import Tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";
import { Coffee } from "../image";
import client from "../sanity";

const Categories = () => {
  useDeviceContext(Tw);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "category"] {
      ...,
    }`
      )
      .then((data) => {
        setCategory(data);
      });
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={Tw`px-4 py-4 `}
    >
      {category?.map(({image,name,_id})=>{
        return (
          <Categorycard key={_id} id={_id} imgUrl={image} title={name}/>
        )
      })}
     
    </ScrollView>
  );
};

export default Categories;
