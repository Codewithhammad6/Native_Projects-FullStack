import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ContactList = () => {
  const contacts = [
    { name: 'Hammad', msg: 'Hy how are you?', imgUrl: require('../assets/images.jpg') },
    { name: 'Sadiq', msg: 'What are you doing?', imgUrl: require('../assets/images1.jpg') },
    { name: 'Ahmad', msg: 'Okay👌', imgUrl: require('../assets/images2.jpg') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact List</Text>

      <ScrollView>
        {contacts.map((contact, index) => (
          <View key={index} style={styles.contact}>
            <Image source={contact.imgUrl} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{contact.name}</Text>
              <Text style={styles.msg}>{contact.msg}</Text>
            </View>
          </View>
        ))}
        </ScrollView>
    </View>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#bcb8b891',
    marginBottom: 20,
    borderRadius: 7,
    paddingBottom:20    
  },
  heading: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#aeababb6',
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  info: {
    marginLeft: 13,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  msg: {
    color: '#676565ff',
  },
});
