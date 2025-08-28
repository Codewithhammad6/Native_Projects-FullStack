import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import userStore from '../store/userStore.ts';
const AddressScreen = ({navigation}) => {
  const [country, setCountry] = useState('Pakistan');
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const {addAddresses,loading} = userStore()

  const handleAddAddress = () => {
    if (!name || !mobileNo || !houseNo || !street || !postalCode) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    const address={
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode
    }
addAddresses(address)
setName('')
setMobileNo('')
setHouseNo('')
setStreet('')
setLandmark('')
setPostalCode('')
setTimeout(() => {
  navigation.goBack()
}, 3000);
};

  return (
    <ScrollView style={{ marginTop: 10,padding:5}}>
      {/* Top bar */}

      <View style={{ marginHorizontal: 10 ,marginBottom:40}}>
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
            Add a new Address
          </Text>
        </View>

        {/* Country */}
        <TextInput
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
          placeholderTextColor="black"
          style={styles.input}
        />

        {/* Full Name */}
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>Full name (First and last name)</Text>
          <TextInput
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="black"
            style={styles.input}
          />
        </View>

        {/* Mobile Nm */}
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>Mobile number</Text>
          <TextInput
            placeholder="Mobile number"
            value={mobileNo}
            onChangeText={setMobileNo}
            placeholderTextColor="black"
            style={styles.input}
          />
        </View>

        {/* House / Flat */}
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>Flat, House No, Building, Company</Text>
          <TextInput
            value={houseNo}
            onChangeText={setHouseNo}
            placeholderTextColor="black"
            style={styles.input}
          />
        </View>

        {/* Area */}
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>Area, Street, Sector, Village</Text>
          <TextInput
            value={street}
            onChangeText={setStreet}
            placeholderTextColor="black"
            style={styles.input}
          />
        </View>

        {/* Landmark */}
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>Landmark</Text>
          <TextInput
            value={landmark}
            onChangeText={setLandmark}
            placeholder="Eg near hospital"
            placeholderTextColor="black"
            style={styles.input}
          />
        </View>

        {/* Pincode */}
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>PostalCode</Text>
          <TextInput
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder="Enter PostalCode"
            keyboardType="numeric"
            placeholderTextColor="black"
            style={styles.input}
          />
        </View>

        {/* Submit Button */}
          {loading ? (
        <Pressable style={styles.button} disabled onPress={handleAddAddress}>
            <Text style={{ fontWeight: 'bold' }}>Adding...</Text>
        </Pressable>
          ):(
        <Pressable style={styles.button} onPress={handleAddAddress}>
          <Text style={{ fontWeight: 'bold' }}>Add Address</Text>
        </Pressable>
          )}
      </View>
    </ScrollView>
  );
};

const styles = {
  input: {
    padding: 10,
    borderColor: '#D0D0D0',
    color: 'black',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  label: { fontSize: 15, fontWeight: 'bold' },
  button: {
    backgroundColor: '#FFC72C',
    padding: 19,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
};

export default AddressScreen;
