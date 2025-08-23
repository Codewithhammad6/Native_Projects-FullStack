import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import userStore from '../store/userStore.ts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useCartStore from '../store/useCartStore.ts';

const ConfirmationScreen = ({navigation}) => {
  const steps = [
    { title: 'Address', content: 'Address Form' },
    { title: 'Delivery', content: 'Delivery Options' },
    { title: 'Payment', content: 'Payment Details' },
    { title: 'Place Order', content: 'Order Summary' },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const { getAddresses,addOrders } = userStore();
  const [selectedAddress, setSelectedAddress] = useState();
  const [option, setOption] = useState();
  const [selectedOption, setSelectedOption] = useState('');

  const fetchAddresses = async () => {
    try {
      const result = await getAddresses();
      setAddresses(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);

const {cart,cleanCart} = useCartStore()

  
  const subtotal = cart
    .map(item => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
    const total=Math.round(subtotal)



const handlerPlaceOrder=()=>{
const orderData ={
cartItems:cart,
totalPrice:total,
shippingAddress:selectedAddress,
paymentMethod:selectedOption
}
addOrders(orderData)
navigation.navigate("Order")
cleanCart()
}

const pay =async()=>{
try {


Alert.alert("On Process use Cash on Delivery")

//   const orderData ={
// cartItems:cart,
// totalPrice:total,
// shippingAddress:selectedAddress,
// paymentMethod:"card"
// }
// addOrders(orderData)
// navigation.navigate("Order")
// cleanCart()
} catch (error) {
  console.log("error",error)
}
}

  return (
    <ScrollView style={{ marginTop: 25 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 30 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            justifyContent: 'space-between',
          }}
        >
          {steps.map((step, index) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: index < currentStep ? 'green' : '#ccc',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>

              <Text style={{ textAlign: 'center', marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Select Delivery Address
            </Text>
          </View>

          <Pressable>
            {addresses?.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: '#D0D0D0',
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  paddingBottom: 17,
                  marginVertical: 7,
                  borderRadius: 6,
                  marginHorizontal: 10,
                }}
              >
                {selectedAddress && selectedAddress._id === item._id ? (
                  <Ionicons name="radio-button-on" size={24} color="#008397" />
                ) : (
                  <Ionicons
                    onPress={() => setSelectedAddress(item)}
                    name="radio-button-off"
                    size={24}
                    color="gray"
                  />
                )}

                <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                      {item?.name}
                    </Text>
                    <Ionicons name="location" size={20} color="red" />
                  </View>
                  <Text style={{ fontSize: 15, color: '#181818' }}>
                    {item?.houseNo}, {item?.landmark}
                  </Text>
                  <Text style={{ fontSize: 15, color: '#181818' }}>
                    {item?.street}
                  </Text>
                  <Text style={{ fontSize: 15, color: '#181818' }}>
                    Pakistan
                  </Text>
                  <Text style={{ fontSize: 15, color: '#181818' }}>
                    Phone No : {item?.mobileNo}
                  </Text>
                  <Text style={{ fontSize: 15, color: '#181818' }}>
                    PostalCode : {item?.postalCode}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      marginTop: 10,
                    }}
                  >
                    <Pressable
                      style={{
                        backgroundColor: '#f5f5f5ff',
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.5,
                        borderColor: '#D0D0D0',
                      }}
                    >
                      <Text>Edit</Text>
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: '#F5F5F5',
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.5,
                        borderColor: '#D0D0D0',
                      }}
                    >
                      <Text>Remove</Text>
                    </Pressable>
                  </View>

                  <View>
                    {selectedAddress && selectedAddress._id === item._id && (
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        style={{
                          backgroundColor: '#008397',
                          padding: 10,
                          paddingVertical: 6,
                          borderRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 5,
                        }}
                      >
                        <Text style={{ testAlign: 'center', color: 'white' }}>
                          Deliver to this Address
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </>
      )}

      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Choose your delivery options
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 8,
              gap: 7,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            {option ? (
              <Ionicons
                onPress={() => setOption(!option)}
                name="radio-button-on"
                size={24}
                color="#008397"
              />
            ) : (
              <Ionicons
                onPress={() => setOption(!option)}
                name="radio-button-off"
                size={24}
                color="gray"
              />
            )}

            <Text style={{ flex: 1 }}>
              <Text style={{ color: 'green', fontWeight: '500' }}>
                Tomorrow by 10pm
              </Text>{' '}
              - FREE delivery with your Prime membership
            </Text>
          </View>

          <Pressable
            onPress={() => setCurrentStep(2)}
            style={{
              backgroundColor: '#FFC72C',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Select your payment Method
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 8,
              gap: 7,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            {selectedOption === 'cash' ? (
              <Ionicons name="radio-button-on" size={24} color="#008397" />
            ) : (
              <Ionicons
                onPress={() => setSelectedOption('cash')}
                name="radio-button-off"
                size={24}
                color="gray"
              />
            )}

            <Text style={{ flex: 1 }}>Cash on Delivery</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 8,
              gap: 7,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            {selectedOption === 'card' ? (
              <Ionicons name="radio-button-on" size={24} color="#008397" />
            ) : (
              <Ionicons
                onPress={() => {
                  setSelectedOption('card');
                  Alert.alert('JazzCash/Debit card', 'Pay Online', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel is pressed'),
                    },
                    {
                      text: 'OK',
                      onPress: () => pay(),
                    },
                  ]);
                }}
                name="radio-button-off"
                size={24}
                color="gray"
              />
            )}
            <Text style={{ flex: 1, textDecorationLine: 'line-through'}}>Jazz Cash / Credit or debit card</Text>
          </View>
          {selectedOption && selectedOption === 'cash' && (
            <Pressable
              onPress={() => setCurrentStep(3)}
              style={{
                backgroundColor: '#FFC72C',
                padding: 10,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}
            >
              <Text>Continue</Text>
            </Pressable>
          )}
         
        </View>
      )}

      {currentStep == 3 && selectedOption === 'cash' && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Order Now</Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                Save 5% and never run out
              </Text>
              <Text style={{ fontSize: 15, color: 'gray', marginTop: 5 }}>
                Turn on auto deliveries
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="gray" />
          </View>

<View style={{padding:8,borderWidth:1,backgroundColor:'white',borderColor:'#D0D0D0',marginTop:10}}>
  <Text>Shiping to {selectedAddress?.name}</Text>

<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
  <Text style={{fontSize:16,fontWeight:'500',color:'gray'}}>Items</Text>
  <Text style={{fontSize:16,color:'gray'}}>Rs.{total}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
  <Text style={{fontSize:16,fontWeight:'500',color:'gray'}}>Delivery</Text>
  <Text style={{fontSize:16,color:'gray'}}>Rs.0</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
  <Text style={{fontSize:20,fontWeight:'bold'}}>Order Total</Text>
  <Text style={{fontSize:17,color:'#C60C30',fontWeight:'bold'}}>Rs.{total}</Text>
</View>
</View>

<View style={{padding:8,borderWidth:1,backgroundColor:'white',borderColor:'#D0D0D0',marginTop:10}}>
  <Text style={{fontSize:16,color:'gray'}}>Pay With</Text>
  <Text style={{fontSize:16,fontWeight:'600',marginTop:7}}>Pay on delivery (Cash)</Text>
</View>

<Pressable
onPress={()=>handlerPlaceOrder()}
style={{backgroundColor:'#FFC72C',marginTop:20,padding:10,borderRadius:20,justifyContent:'center',alignItems:'center'}}>
  <Text>Place your order</Text>
</Pressable>

        </View>
      )}




    </ScrollView>
  );
};

export default ConfirmationScreen;
