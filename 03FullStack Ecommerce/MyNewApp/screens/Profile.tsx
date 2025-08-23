import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import userStore from "../store/userStore.ts";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const Profile = ({ navigation }) => {
  const { logout, getOrders, user } = userStore();

  return (
    <>
      <StatusBar backgroundColor="#4199c7ff" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <Text style={styles.brandHL}>HL</Text>
              <Text style={styles.brandDotCom}>.com</Text>
            </View>
            <View style={styles.avatar}>
              <Ionicons name="person" size={28} color="#4199c7ff" />
            </View>
          </View>

        
          <View style={styles.profileCard}>
            <Ionicons name="person-circle" size={70} color="#4199c7ff" />
            <Text style={styles.welcomeText}>
              Welcome, <Text style={styles.userName}>{user?.name}</Text>
            </Text>
            <Text style={styles.emailText}>{user?.email}</Text>
          </View>

        
          <View style={styles.actions}>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => navigation.navigate("ShowOrder")}
            >
              <Ionicons name="receipt-outline" size={22} color="#fff" />
              <Text style={styles.actionText}>My Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => navigation.navigate("Home")}
            >
              <Ionicons name="cart-outline" size={22} color="#fff" />
              <Text style={styles.actionText}>Buy Again</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={() => logout()}>
              <Ionicons name="log-out-outline" size={22} color="#fff" />
              <Text style={styles.actionText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 5 : 0,
    flex: 1,
    backgroundColor: "#fdfbfbec",
  },
  header: {
    backgroundColor: "#4199c7ff",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandHL: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "serif",
    color: "#fff",
  },
  brandDotCom: {
    fontSize: 20,
    fontWeight: "500",
    color: "#fff",
  },
  avatar: {
    borderWidth: 2,
    borderRadius: 50,
    padding: 6,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  profileCard: {
    alignItems: "center",
    marginVertical: 20,
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 10,
    color: "#111",
  },
  userName: {
    fontWeight: "700",
    color: "#4199c7ff",
  },
  emailText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  actions: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4199c7ff",
    padding: 14,
    borderRadius: 12,
    marginVertical: 8,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "600",
  },
});

export default Profile;
