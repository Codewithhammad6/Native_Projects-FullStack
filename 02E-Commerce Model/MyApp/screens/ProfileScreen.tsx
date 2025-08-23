import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useStore from '../store/userStore.ts';

const ProfileScreen = () => {

  const navigation = useNavigation();
  const {logout,user} = useStore()



  const users = {
    name: `${user?.name}`,
    email: `${user?.email}`,
    joinDate: `${user?.createdAt}`,
    stats: {
      workouts: 42,
      hours: 36,
      achievements: 5
    }
  };

  const menuItems = [
    { icon: 'settings', name: 'Settings' },
    { icon: 'history', name: 'Activity History' },
    { icon: 'star', name: 'Achievements' },
    { icon: 'help', name: 'Help & Support' },
    { icon: 'logout', name: 'Log Out' },
  ];



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#3498db" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity>
            <Icon name="edit" size={24} color="#3498db" />
          </TouchableOpacity>
        </View>

        {/* User Info Section */}
        <View style={styles.profileSection}>
          <Image 
            source={require('../assets/images.jpg')}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{users.name}</Text>
          <Text style={styles.userEmail}>{users.email}</Text>
          <Text style={styles.joinDate}>{users.joinDate}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{users.stats.workouts}</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{users.stats.hours}</Text>
              <Text style={styles.statLabel}>Hours</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{users.stats.achievements}</Text>
              <Text style={styles.statLabel}>Achievements</Text>
            </View>
          </View>
        </View>

        {/* Profile Menu */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={() => {
                if (item.name === 'Log Out') {
                  logout()
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  });
                }
              }}
            >
              <View style={styles.menuIconContainer}>
                <Icon name={item.icon} size={24} color="#3498db" />
              </View>
              <Text style={styles.menuText}>{item.name}</Text>
              <Icon name="chevron-right" size={24} color="#95a5a6" />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <Text style={styles.versionText}>App Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  backButton: {
    padding: 5,
  },
  profileSection: {
    alignItems: 'center',
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#3498db',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  joinDate: {
    fontSize: 14,
    color: '#bdc3c7',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
  },
  statItem: {
    alignItems: 'center',
    padding: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  menuContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  menuIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    marginLeft: 10,
  },
  versionText: {
    textAlign: 'center',
    color: '#bdc3c7',
    marginVertical: 25,
    fontSize: 12,
  },
});

export default ProfileScreen;