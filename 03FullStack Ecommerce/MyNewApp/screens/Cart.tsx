import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useCartStore from '../store/useCartStore.ts';

const Cart = ({navigation}) => {
    const [searchQuery, setSearchQuery] = useState('')
  const { cart, incementQuantity, decrementQuantity, removeFromCart } =
    useCartStore();


  // filter cart item by searchQuery (case-insensitive)
  const filteredProducts = cart.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )


  const subtotal = cart
    .map(item => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
    const total=Math.round(subtotal)

  console.log(total);
  return (
    <ScrollView 
    style={{ marginTop: 0,
     flex: 1,
      backgroundColor: 'white' }}>
      <View
                style={{
                  backgroundColor: '#4199c7ff',
                  padding: 10,
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 9,
                }}
              >
                <View
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
                    placeholder="Search by name"
                    placeholderTextColor="#A9A9A9"
                    style={{ fontSize: 16, flex: 1, marginLeft: 6, color: '#000' }}
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                  />
                </View>
              </View>
      <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '400' }}>Subtotal : </Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Rs.{total}</Text>
      </View>

      <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>
      {cart.length >= 1 ? (
         <Pressable
      onPress={()=>navigation.navigate('Confirm')}
        style={{
          backgroundColor: '#FFC72C',
          padding: 10,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text>Proceed to Buy ({cart.length}) items</Text>
      </Pressable>
      ):(
  <Pressable
  onPress={()=>navigation.navigate("Home")}
        style={{
          backgroundColor: '#FFC72C',
          padding: 10,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text>Shoping now</Text>
      </Pressable>
      )}
    

      <Text
        style={{
          height: 1,
          borderColor: '#D0D0D0',
          borderWidth: 1,
          marginTop: 15,
        }}
      />

      <View style={{ marginHorizontal: 10 }}>
        {filteredProducts?.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: 'white',
              marginVertical: 10,
              borderBottomColor: '#F0F0F0',
              borderWidth: 2,
              borderLeftWidth: 0,
              borderTopWidth: 0,
            }}
          >
            <Pressable
              style={{
                marginVertical: 10,
                flexDirection: 'row',
              }}
            >
              <View>
                <Image
                  style={{ width: 140, height: 140, resizeMode: 'contain' }}
                  source={{ uri: item?.image }}
                />
              </View>
              <View style={{ marginHorizontal: 15 }}>
                <Text numberOfLines={3} style={{ width: 150, marginTop: 15 }}>
                  {item?.title}
                </Text>
                <Text
                  style={{ fontSize: 17, fontWeight: 'bold', marginTop: 6 }}
                >
                  Rs.{item?.price}
                </Text>
                <Text style={{ color: 'green', marginTop: 6 }}>In Stock</Text>
              </View>
            </Pressable>

            <Pressable
              style={{
                marginTop: 10,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 7,
                }}
              >
                {item.quantity > 1 ? (
                  <Pressable
                    onPress={() => decrementQuantity(item)}
                    style={{
                      backgroundColor: '#D8D8D8',
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <Ionicons name="remove" size={20} color="black" />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => decrementQuantity(item)}
                    style={{
                      backgroundColor: '#D8D8D8',
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <Ionicons name="trash" size={20} color="black" />
                  </Pressable>
                )}

                <Pressable
                  style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                  }}
                >
                  <Text>{item?.quantity}</Text>
                </Pressable>

                <Pressable
                  onPress={() => incementQuantity(item)}
                  style={{
                    backgroundColor: '#D8D8D8',
                    padding: 7,
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                  }}
                >
                  <Ionicons name="add" size={20} color="black" />
                </Pressable>
              </View>

              <Pressable
                onPress={() => removeFromCart(item)}
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: '#C0C0C0',
                  borderWidth: 0.6,
                }}
              >
                <Text>Delete</Text>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Cart;
