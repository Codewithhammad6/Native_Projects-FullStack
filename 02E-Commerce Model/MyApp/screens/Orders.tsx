import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import useStore from '../store/userStore.ts';

const Orders = () => {
  const { getProducts } = useStore();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      console.log(data); // Here you'll see the actual products
    };

    fetchProducts();
  }, []);

  return (
    <View>
      <Text>Orders</Text>
      {products.map((item, index) => (
        <Text key={index}>
          {item.itemName} - {item.price}
        </Text>
      ))}
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});
