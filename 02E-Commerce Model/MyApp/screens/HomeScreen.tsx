import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
} from 'react-native';
import React from 'react';
import useStore from '../store/userStore.ts';
const HomeScreen = ({navigation}) => {
const {user,addProduct} = useStore()


const handlerAdd = (item, user) => {
  addProduct({
    itemName: item.itemName,
    price: item.price,
    userId: user?._id || ""
  });
};


const Items = [
    { id: '1', itemName: 'Premium Member',price: '$8.99',image:"require('../assets/images.jpg')" },
    { id: '2', itemName: 'Weekly Challenge', price: '$9.27' },
    { id: '3', itemName: 'New Workout Plan',price: '$12.99' },
  ];



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.userName}>{user?.name}</Text> {/* Replace with actual user name */}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image 
              source={require('../assets/images.jpg')} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

       
<View>
<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
  {Items.map((item) => (
    <View key={item.id} style={styles.box}>
    <Image
    source={require('../assets/images.jpg')}
    />
      <Text>{item.itemName}</Text>
      <Text>{item.price}</Text>
      <TouchableOpacity onPress={()=>{handlerAdd(item,user)}}>
        <Text style={styles.btn}>
          Add
        </Text>
      </TouchableOpacity>
    </View>
  ))}
</ScrollView>

</View>

<TouchableOpacity onPress={()=>{navigation.navigate('Orders')}}>
  <Text style={styles.btn}>Orders</Text>
</TouchableOpacity>
      
       
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 18,
    color: '#7f8c8d',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#3498db',
  },
scrollContainer: {
  padding: 6,
},
box: {
    height: 120,
    width: 120,
    borderRadius: 8,
    backgroundColor: '#979494ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
btn:{
  backgroundColor:'blue',
  paddingHorizontal:5,
  paddingVertical:2,
  color:'white',
  margin:6
}
 

 
});

export default HomeScreen;