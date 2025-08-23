import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import useCartStore from '../../store/useCartStore.ts'
const ProductItem = ({item}) => {
  const {addToCart}=useCartStore()
    const [addedToCart,setAddedToCart]=useState()
  
    const handler=(item)=>{
addToCart(item)
setAddedToCart(true)
setTimeout(() => {
  setAddedToCart(false)
}, 60000);
}

  return (
    <Pressable style={{marginHorizontal:20,marginVertical:25}}>
      <Image
      style={{height:150,width:150, resizeMode:'contain'}}
      source={{uri:item.image}}
      />
      <Text numberOfLines={1} style={{width:150,marginTop:10,fontSize:15,fontWeight:'400'}}>{item.title}</Text>
         <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Rs.{item?.price}</Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
          {item?.rating?.rate} ratings
        </Text>
      </View>
      <Pressable
      onPress={()=>handler(item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
         {addedToCart ? (
                  <Text>Added to Cart</Text>
                ):(
                <Text>Add to Cart</Text>
                )}
      </Pressable>
      
    </Pressable>
  )
}

export default ProductItem

const styles = StyleSheet.create({})