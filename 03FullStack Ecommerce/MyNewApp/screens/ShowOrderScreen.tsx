import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import userStore from '../store/userStore';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShowOrderScreen = () => {
  const { getOrders } = userStore();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
     <SafeAreaView
            style={{
              paddingTop: Platform.OS === 'android' ? 5 : 0,
              flex: 1,
              backgroundColor: '#fdfbfbec',
            }}
          >
    <ScrollView style={styles.container}>
      {orders.length === 0 ? (
        <Text style={styles.noOrders}>No orders found</Text>
      ) : (
        orders.map((order, index) => (
          <View key={index} style={styles.card}>
            {/* Order Header */}
            <Text style={styles.title}>Order #{index + 1}</Text>
            <Text style={styles.subText}>Status: {order.status}</Text>
            <Text style={styles.subText}>
              Date: {new Date(order.createdAt).toDateString()}
            </Text>

            {/* Products */}
            {order.products.map((item, idx) => (
              <View key={idx} style={styles.itemRow}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.subText}>
                    {item.quantity} × Rs {item.price}
                  </Text>
                </View>
              </View>
            ))}

            {/* Total */}
            <Text style={styles.total}>Total: Rs {order.totalPrice}</Text>

            {/* Shipping */}
            <Text style={styles.section}>Shipping Address:</Text>
            <Text style={styles.subText}>
              {order.shippingAddress.houseNo}, {order.shippingAddress.street}
            </Text>
            <Text style={styles.subText}>
              {order.shippingAddress.landmark},{' '}
              {order.shippingAddress.postalCode}
            </Text>
            <Text style={styles.subText}>
              📞 {order.shippingAddress.mobileNo}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#a8b1bacf', padding: 12 },
  card: {
    backgroundColor: '#ffffffe2',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  subText: { fontSize: 15, color: '#555' },
  section: { marginTop: 9, fontSize: 15, fontWeight: '600' },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  itemImage: { width: 100, height: 100,resizeMode:'contain', marginRight: 10, borderRadius: 6 },
  itemText: { fontSize: 16, fontWeight: '500' },
  total: { marginTop: 10, fontSize: 16, fontWeight: 'bold', color: '#000' },
  noOrders: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#666' },
});

export default ShowOrderScreen;
