import { Linking, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React from 'react';

const ActionCard = () => {

  function openLink(url) {
    Linking.openURL(url).catch(() =>
      Alert.alert("Can't open this link:", url)
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ActionCard</Text>

      <TouchableOpacity style={styles.button} onPress={() => openLink('https://www.google.com')}>
        <Text style={styles.buttonText}>🌐 Open Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => openLink('tel:03001234567')}>
        <Text style={styles.buttonText}>📞 Call Me</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => openLink('mailto:example@gmail.com')}>
        <Text style={styles.buttonText}>📧 Send Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => openLink('whatsapp://send?phone=+923001234567&text=Hello')}>
        <Text style={styles.buttonText}>💬 WhatsApp Me</Text>
      </TouchableOpacity>

    </View>
  );
};

export default ActionCard;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 15,
    backgroundColor: '#bdb8b89f',
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  }

});
