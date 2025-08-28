import { Image, Pressable, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import useCartStore from '../../store/useCartStore.ts'
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const ProductItem = ({ item }) => {
  const { addToCart } = useCartStore()
  const [addedToCart, setAddedToCart] = useState(false)
  const navigation = useNavigation()

  const handler = (item) => {
    addToCart(item)
    setAddedToCart(true)
    setTimeout(() => {
      setAddedToCart(false)
    }, 8000)
  }

  return (
    <Pressable
      onPress={() => navigation.navigate('Info', { item })}
      style={{
        width: screenWidth / 2 - 20,
        margin: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        elevation: 2
      }}
    >
      <Image
        style={{ height: 120, resizeMode: 'contain', width: "100%" }}
        source={{ uri: item.image }}
      />
      <Text numberOfLines={1} style={{ marginTop: 10, fontSize: 14, fontWeight: '500' }}>
        {item.title}
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Rs.{item?.price}</Text>
        <Text style={{ color: "green", fontWeight: "bold", fontSize: 12 }}>
          In stock
        </Text>
      </View>

      {addedToCart ? (
        <Pressable
          style={{
            backgroundColor: "#f1b205ff",
            padding: 8,
            borderRadius: 20,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text>Added to Cart</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => handler(item)}
          style={{
            backgroundColor: "#FFC72C",
            padding: 8,
            borderRadius: 20,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text>Add to Cart</Text>
        </Pressable>
      )}
    </Pressable>
  )
}

export default ProductItem
