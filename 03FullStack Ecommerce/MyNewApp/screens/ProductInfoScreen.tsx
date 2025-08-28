import {
  ScrollView,
  Pressable,
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  Dimensions,
  Text,
  TouchableOpacity,
  Share,
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


const handler=(item)=>{
addToCart(item)
setAddedToCart(true)
setTimeout(() => {
  setAddedToCart(false)
}, 60000);
}
const offer = item.offer
 const onShare = async () => {
    try {
      const result = await Share.share({
        message:item.title,
        url: 'http://10.0.2.2:19000',
        title: 'Share Product'
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <ScrollView
      style={{ marginTop: 2, flex: 1, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
    >

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {item.carouselImages.map((item, index) => (

<ImageBackground
  key={index}
  source={{ uri: item }}
  style={{
    width: width,
    height: height,
    marginTop: 25,
    resizeMode: 'cover', 
    borderRadius: 10,
    overflow: 'hidden',
  }}
>
  <View
    style={{
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    }}
  >
    {/* Offer Badge */}
    {offer && (
      <View
        style={{
          minWidth: 40,
          height: 40,
          paddingHorizontal: 8,
          borderRadius: 20,
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
          {offer}% OFF
        </Text>
      </View>
    )}

    {/* Share Button */}
    <TouchableOpacity onPress={onShare}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E0E0E0',
        }}
      >
        <Ionicons name="share-social" size={22} color="black" />
      </View>
    </TouchableOpacity>
  </View>
</ImageBackground>

        ))}
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Text numberOfLines={3} style={{ fontSize: 15, fontWeight: '500' }}>{item.title}</Text>
        <View style={{flexDirection:'row',gap:10}}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 6 }}>
          Rs.{item.price}
        </Text>
        {item.oldPrice && (
        <Text style={{ fontSize: 18, fontWeight: '400', marginTop: 6 ,color:"gray", textDecorationLine: 'line-through' }}>
          Rs.{item.oldPrice}
        </Text>
        )}
        </View>
      </View>

      <Text
        style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1 }}
      ></Text>
{item?.color && (
 <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Text>Color: </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.color}</Text>
      </View>
)}
     
{item?.size && (
 <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Text>Size: </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.size}</Text>
      </View>
)}
     
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

        <Pressable
        onPress={()=>{handler(item),navigation.navigate('Confirm')}}
        style={{backgroundColor:'#FFAC1C',padding:10,justifyContent:'center',alignItems:'center',
        marginHorizontal:10,marginVertical:10,borderRadius:20
      }}>
        <Text>Buy Now</Text>
      </Pressable>
      
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
