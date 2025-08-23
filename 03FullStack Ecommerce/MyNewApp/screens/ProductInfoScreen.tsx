import {
  ScrollView,
  Pressable,
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  Dimensions,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useCartStore from '../store/useCartStore.ts';

const ProductInfoScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const { width } = Dimensions.get('window');
  const height = (width * 100) / 100;

  const [addedToCart,setAddedToCart]=useState()
const {addToCart,cart} =useCartStore()
console.log(cart)


const handler=(item)=>{
addToCart(item)
setAddedToCart(true)
setTimeout(() => {
  setAddedToCart(false)
}, 60000);
}

  return (
    <ScrollView
      style={{ marginTop: 25, flex: 1, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          backgroundColor: '#4199c7ff',
          padding: 10,
          alignItems: 'center',
          flexDirection: 'row',
          gap: 9,
        }}
      >
        <Pressable
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 6,
            alignItems: 'center',
            flex: 1,
            height: 40,
            paddingHorizontal: 10,
          }}
        >
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            placeholder="Search HL.in"
            placeholderTextColor="#A9A9A9"
            style={{ fontSize: 16, flex: 1, marginLeft: 6, color: '#000' }}
          />
        </Pressable>
        <Ionicons name="mic-outline" size={32} color="black" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {item.carouselImages.map((item, index) => (
          <ImageBackground
            style={{ width, height, marginTop: 25, resizeMode: 'contain' }}
            key={index}
            source={{ uri: item }}
          >
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#C60C30',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: 12,
                  }}
                >
                  20% off
                </Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#E0E0E0',
                }}
              >
                <Ionicons name="share-social" size={32} color="black" />
              </View>
            </View>

            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#E0E0E0',
                marginTop: 'auto',
                marginLeft: 15,
                marginBottom: 20,
              }}
            >
              <Ionicons name="heart-outline" size={32} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>{item.title}</Text>
        <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 6 }}>
          Rs.{item.price}
        </Text>
      </View>
      <Text
        style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1 }}
      ></Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Text>Color: </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.color}</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Text>Size: </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.size}</Text>
      </View>
      <Text
        style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1 }}
      ></Text>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginVertical: 5 }}>
          Total : Rs.{item.price}
        </Text>
        <Text style={{ color: '#127072ff' }}>
          FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
        </Text>
      </View>

      <View style={{flexDirection:'row',alignItems:'center',marginVertical:5,gap:5}}>
        <Ionicons name="location-outline" size={32} color="black" />
        <Text style={{ fontSize: 15, fontWeight: '500' }}>
              Sahiwal Dist Sargodha 560035
        </Text>
      </View>
      <Text style={{color:'green',marginHorizontal:10,fontWeight:'500'}}>IN Stock</Text>
      

      <Pressable
      onPress={()=>{handler(item)}}
       style={{backgroundColor:'#FFC72C',padding:10,justifyContent:'center',alignItems:'center',
        marginHorizontal:10,marginVertical:10,borderRadius:20
      }}>
        {addedToCart ? (
          <Text>Added to Cart</Text>
        ):(
        <Text>Add to Cart</Text>
        )}
      </Pressable>

        <Pressable style={{backgroundColor:'#FFAC1C',padding:10,justifyContent:'center',alignItems:'center',
        marginHorizontal:10,marginVertical:10,borderRadius:20
      }}>
        <Text>Buy Now</Text>
      </Pressable>
      
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
