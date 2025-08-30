import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Linking,
  Platform,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../utils/axiosInstance.ts';
import { NUMBER } from '@env';

const PaymentScreen = ({ navigation, route }) => {
  const { cart, total, selectedAddress } = route.params;
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Generate a random transaction ID
  const generateTransactionId = () => {
    return 'TXN' + Math.floor(100000000 + Math.random() * 900000000);
  };

  // Open WhatsApp with customer support number
  const openWhatsApp = () => {
    const phoneNumber = NUMBER; 
    let url = '';
    
    if (Platform.OS === 'android') {
      url = `whatsapp://send?phone=${phoneNumber}`;
    } else {
      url = `whatsapp://send?phone=${phoneNumber}`;
    }
    
    Linking.openURL(url).catch(() => {
      Alert.alert(
        'Error',
        'WhatsApp is not installed on your device. Please install WhatsApp to contact support.',
        [{ text: 'OK' }]
      );
    });
  };

  // JazzCash payment integration function
  const initiateJazzCashPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Prepare payment data
      const paymentData = {
        amount: total,
        orderId: generateTransactionId(),
        customerEmail: 'hammadp5087@gmail.com',
        customerMobile: selectedAddress.mobileNo
      };

      // Call your backend to initiate payment
      const response = await axiosInstance.post('/payment/jazzcash/initiate', paymentData);
      
      if (response.data.success) {
        // Open JazzCash payment gateway
        Linking.openURL(response.data.paymentUrl);
      } else {
        Alert.alert("Error", "Failed to initialize payment");
      }
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Error", "Payment initialization failed");
    } finally {
      setIsProcessing(false);
    }
  };
    const handleEmailPress = () => {
    Linking.openURL("mailto:hammadp5087@gmail.com");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Complete Payment</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {cart.map((item, index) => (
             <>
       <Image
            source={{ uri: item.image }}
             style={{ width: '100%', height: 150, resizeMode: 'contain' }}
               />
          <View key={index} style={styles.item}>
           
            <Text numberOfLines={5} style={styles.itemName}>{item.title}</Text>
          </View>
        </>
        ))}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: Rs. {total}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <Text style={styles.addressText}>{selectedAddress.name}</Text>
        <Text style={styles.addressText}>{selectedAddress.houseNo}, {selectedAddress.street}</Text>
        <Text style={styles.addressText}>{selectedAddress.landmark}</Text>
        <Text style={styles.addressText}>{selectedAddress.postalCode}</Text>
        <Text style={styles.addressText}>Phone: {selectedAddress.mobileNo}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentMethod}>
          <View style={styles.methodSelected}>
            <Text style={styles.methodText}>JazzCash</Text>
          </View>
        </View>
        
        <Text style={styles.note}>
          You will be redirected to JazzCash to complete your payment securely.
        </Text>
        
        <TouchableOpacity 
          style={[styles.payButton, isProcessing && styles.disabledButton]}
          onPress={initiateJazzCashPayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.payButtonText}>Pay Rs. {total}</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Need Help?</Text>
        <Text style={styles.helpText}>
          If you encounter any issues with payment, please contact our support team.
        </Text>
        
        <TouchableOpacity 
          style={styles.whatsappButton}
          onPress={openWhatsApp}
        >
          <Icon name="whatsapp" size={20} color="white" style={styles.whatsappIcon} />
          <Text style={styles.whatsappButtonText}>Chat with Support</Text>
        </TouchableOpacity>
        
      <View style={styles.contactInfo}>
      <TouchableOpacity onPress={handleEmailPress}>
        <Text style={[styles.contactText, { color: "blue", textDecorationLine: "underline" }]}>
          Email: hammadp5087@gmail.com
        </Text>
      </TouchableOpacity>
    </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginBottom:30
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2c3e50',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: '#34495e',
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 12,
    marginTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'right',
  },
  addressText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 4,
  },
  paymentMethod: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  methodSelected: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  methodText: {
    color: 'white',
    fontWeight: '500',
  },
  note: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  payButton: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  cancelButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 16,
    textAlign: 'center',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  whatsappIcon: {
    marginRight: 10,
  },
  whatsappButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfo: {
    alignItems: 'center',
    marginBottom:20
  },
  contactText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  phoneText: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default PaymentScreen;