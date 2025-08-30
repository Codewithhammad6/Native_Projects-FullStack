import { ScrollView, Pressable, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, {useCallback, useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import userStore from '../store/userStore.ts';
import { useFocusEffect } from '@react-navigation/native';

const AddAddressScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState([]);
  const { getAddresses ,delAddress} = userStore();
  const [searchQuery, setSearchQuery] = useState('')




  // filter address by searchQuery (case-insensitive)
  const filteredAddress = addresses.filter((address) =>
    address?.name.toLowerCase().includes(searchQuery.toLowerCase())
  )


  // reusable function
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

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );


  const HandlerDelAddress =(id)=>{
delAddress(id)
setAddresses((prev) => prev.filter((addr) => addr._id !== id));

  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 0}}>
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
              style={{ fontSize: 16, flex: 1, marginLeft: 6,paddingBottom:6, color: '#000' }}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
        </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Your Addresses</Text>

        <Pressable
          onPress={() => navigation.navigate('Add')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 7,
            paddingHorizontal: 5,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderWidth: 1,
            marginTop: 10,
            borderColor: '#D0D0D0',
          }}
        >
          <Text>Add a new Address</Text>
          <Ionicons name="chevron-forward-outline" size={22} color="black" />
        </Pressable>

        <Pressable>
          {filteredAddress?.map((item, index) => (
            <Pressable
              key={index}
              style={{
                borderWidth: 1,
                borderColor: '#D0D0D0',
                padding: 10,
                flexDirection: 'column',
                gap: 5,
                marginTop: 15,
              }}
            >
              <View style={{flexDirection:'row',alignItems:'center',gap:3}}>
                <Text style={{fontSize:15,fontWeight:'bold'}}>{item?.name}</Text>
                <Ionicons name="location" size={20} color="red" />
              </View>
              <Text style={{fontSize:15,color:'#181818'}}>{item?.houseNo}, {item?.landmark}</Text>
              <Text style={{fontSize:15,color:'#181818'}}>{item?.street}</Text>
              <Text style={{fontSize:15,color:'#181818'}}>Pakistan</Text>
              <Text style={{fontSize:15,color:'#181818'}}>Phone No : {item?.mobileNo}</Text>
              <Text style={{fontSize:15,color:'#181818'}}>PostalCode : {item?.postalCode}</Text>
           

           <View style={{flexDirection:'row',alignItems:'center',
            gap:8,marginTop:10
           }}>
         

            <TouchableOpacity
            onPress={()=>HandlerDelAddress(item._id)}
            style={{backgroundColor:'#F5F5F5',paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.5,borderColor:'#D0D0D0'}}>
              <Text>Remove</Text>
            </TouchableOpacity>

           </View>

            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;
