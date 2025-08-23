import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const OrderScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 2,
      tension: 100,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
     navigation.navigate("Main", { screen: "Home" });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons name="checkmark-circle" size={80} color="green" />
      </Animated.View>
      <Text style={styles.text}>Order Placed Successfully!</Text>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
});
