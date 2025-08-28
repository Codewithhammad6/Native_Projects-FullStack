import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Platform, 
  FlatList 
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Picker } from '@react-native-picker/picker'   //  dropdown
import userStore from '../store/userStore.ts'

const ShowOrderScreen = ({ route }) => {
 const { getOrders } = userStore();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const { deleteOrder } = userStore()

  const handlerDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders((prevOrders) => prevOrders.filter((o) => o._id !== orderId));
    } catch (error) {
      console.log("Failed to delete order:", error.message);
    }
  };

  const renderOrder = ({ item, index }) => (
    <View style={styles.card}>
      {/* Order Header */}
      <Text style={styles.title}>Order #{index + 1}</Text>
      <View style={{justifyContent:'space-between',flexDirection:'row'}}>
      <Text style={styles.subText}>
        Date: {new Date(item.createdAt).toDateString()} - {new Date(item.createdAt).toLocaleTimeString()}
      </Text>
      <Text style={styles.subText,{color:"green",fontSize:15}}>
        Status: {item.status}
      </Text>
      </View>
      {/* Products */}
      {item.products.map((p, idx) => (
        <View key={idx} style={styles.itemRow}>
          <Image source={{ uri: p.image }} style={styles.itemImage} />
          <View>
            <Text style={styles.itemText}>{p.name}</Text>
            <Text style={styles.subText}>
              {p.quantity} × Rs {p.price}
            </Text>
          </View>
        </View>
      ))}

      {/* Total */}
      <Text style={styles.total}>Total: Rs {item.totalPrice}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.subText, { fontSize: 18 }]}>
          PaymentMethod :
        </Text>
        <Text style={{ fontSize: 18, color: 'green' }}>
          {" "}On Delivery ({item.paymentMethod})
        </Text>
      </View>

      {/* Customer Info */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.section}>Customer Name: </Text>
        <Text style={[styles.subText, { marginBottom: -9 }]}>
          {item.shippingAddress.name}
        </Text>
      </View>

      {/* Shipping */}
      <Text style={styles.section}>Shipping Address:</Text>
      <Text style={styles.subText}>
        {item.shippingAddress.houseNo}, {item.shippingAddress.street}
      </Text>
      <Text style={styles.subText}>
        {item.shippingAddress.landmark}, {item.shippingAddress.postalCode}
      </Text>
      <Text style={styles.subText}>📞 {item.shippingAddress.mobileNo}</Text>

 
      {/* 🔹 Delete Button */}
      <TouchableOpacity
        onPress={() => handlerDeleteOrder(item._id)}
        style={[styles.button, { backgroundColor: '#f44336' }]}
      >
        <Text style={styles.btnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? 5 : 0,
        flex: 1,
        backgroundColor: '#dfdcdccc',
      }}
    >
      {orders.length === 0 ? (
        <Text style={styles.noOrders}>No orders found</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.container}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  card: {
    backgroundColor: '#ffffffe4',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  subText: { fontSize: 15, color: '#555' },
  section: { marginTop: 9, fontSize: 15, fontWeight: '600' },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10,
    borderRadius: 6,
  },
  itemText: { fontSize: 16, fontWeight: '500' },
  total: { marginTop: 10, fontSize: 16, fontWeight: 'bold', color: '#000' },
  noOrders: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#666' },

  button: {
    marginTop: 12,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '600' },
})

export default ShowOrderScreen
