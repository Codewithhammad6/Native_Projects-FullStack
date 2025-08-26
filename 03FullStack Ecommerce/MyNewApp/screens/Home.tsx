import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductItem from './components/ProductItem';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import userStore from '../store/userStore.ts';
import { useFocusEffect } from '@react-navigation/native';
import useProductStore from '../store/useProductStore.ts';

const Home = ({ navigation }) => {
  const {products: myProducts, fetchProducts} = useProductStore()

  const trendingProduct = myProducts.filter((product) => product.trendingDeal === "yes")
  const todayDealProduct = myProducts.filter((product) => product.todayDeal === "yes")

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("ladies");
  const [items, setItems] = useState([
    { label: "Men's", value: "men" },
    { label: 'jewelery', value: 'jewelery' },
    { label: 'electronics', value: 'electronics' },
    { label: "women's", value: "ladies" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const { getAddresses } = userStore();
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  // Filter products by searchQuery (case-insensitive)
  const filteredProducts = myProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Filter products by category
  const categoryProducts = filteredProducts.filter(item => item.category.toLowerCase().includes(category.toLowerCase()))

  // Handle search input change
  const handleSearchChange = (text) => {
    setSearchQuery(text)
    setIsSearching(text.length > 0)
  }

  // reusable function
  const fetchAddresses = async () => {
    try {
      const result = await getAddresses();
      setAddresses(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
    fetchProducts()
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
      fetchProducts()
      setSearchQuery('')
      setIsSearching(false)
    }, [])
  );

  const list = [
    {
      id: '0',
      image: 'https://m.media-amazon.com/images/I/715Sdi8YZeL._AC_SL1500_.jpg',
      name: 'Home',
    },
    {
      id: '1',
      image:
        'https://www.shutterstock.com/image-vector/mega-deals-sale-banner-design-260nw-2579940129.jpg',
      name: 'Deals',
    },
    {
      id: '2',
      image:
        'https://i5.walmartimages.com/seo/VILINICE-Noise-Cancelling-Headphones-Wireless-Bluetooth-Over-Ear-Headphones-with-Microphone-Black-Q8_b994b99c-835f-42fc-8094-9f6be0f9273b.be59955399cdbd1c25011d4a4251ba9b.jpeg',
      name: 'Electronics',
    },
    {
      id: '3',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvTvmXmBZVUImDmHO8--1PGs8I7p-M9eNVDcmfYi1MTX8_w3_TEp2ZOGm1CEM-imjwqOM&usqp=CAU',
      name: 'Mobiles',
    },
    {
      id: '4',
      image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTURYwFUYJn4rJc37lwvAEFi-BkHLpD00R9MQ&s',
         name: 'Fashion',
    },
  ];

  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://img.lazcdn.com/us/domino/cfd35d4d-c66f-4f8a-8577-40f233b36dc1_PK-1976-688.jpg_2200x2200q80.jpg_.webp',
    'https://img.lazcdn.com/us/domino/35577a99-4600-40e4-b391-93f2c92e1a9a_PK-1976-688.jpg_2200x2200q80.jpg_.webp',
    'https://img.lazcdn.com/us/domino/cec1828b-baf9-44be-a516-f6daa1b6f22f_PK-1976-688.jpg_2200x2200q80.jpg_.webp',
    'https://img.lazcdn.com/us/domino/20008dff-c0db-4530-aa6b-1496415f8e1d_PK-1976-688.jpg_2200x2200q80.jpg_.webp',
  ];

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    let interval;
    
    // Only set up the interval if the component is mounted and scrollRef exists
    if (scrollRef.current) {
      interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        
        // Check if scrollRef.current exists before calling scrollTo
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            x: screenWidth * nextIndex,
            animated: true,
          });
        }
      }, 4000); // scroll every 4 sec
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, images.length, screenWidth]);

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === 'android' ? 5 : 0,
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <ScrollView>
          <View
            style={{
              backgroundColor: '#4199c7ff',
              padding: 10,
              alignItems: 'center',
              flexDirection: 'row',
              gap: 9,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                borderRadius: 6,
                alignItems: 'center',
                flex: 1,
                height: 40,
                paddingHorizontal: 10,
              }}
            >
              <Ionicons name="search" size={20} color="gray" />
              <TextInput
                placeholder="Search by name"
                placeholderTextColor="#A9A9A9"
                style={{ fontSize: 16, flex: 1, marginLeft: 6, color: '#000' }}
                value={searchQuery}
                onChangeText={handleSearchChange}
              />
              {isSearching && (
                <Pressable onPress={() => {
                  setSearchQuery('')
                  setIsSearching(false)
                }}>
                  <Ionicons name="close-circle" size={20} color="gray" />
                </Pressable>
              )}
            </View>
          </View>

          {isSearching ? (
            // Show search results
            <View style={{ flex: 1, minHeight: 500 }}>
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: 10,
                backgroundColor: '#f0f0f0'
              }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  Search Results
                </Text>
                <Text style={{ fontSize: 14, color: '#666' }}>
                  {filteredProducts.length} products found
                </Text>
              </View>

              {filteredProducts.length > 0 ? (
                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  padding: 5,
                }}>
                  {filteredProducts.map((item, index) => (
                    <Pressable
                      onPress={() => {
                        navigation.navigate('Info', { item: item })
                        setSearchQuery('')
                        setIsSearching(false)
                      }}
                      key={index}
                      style={{
                        width: '50%',
                        padding: 10,
                      }}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: '100%', height: 150, resizeMode: 'contain' }}
                      />
                      <Text 
                        numberOfLines={2} 
                        style={{ marginTop: 5, fontSize: 12 }}
                      >
                        {item.title}
                      </Text>
                      <Text style={{ fontWeight: 'bold', marginTop: 5 }}>
                        ${item.price}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                  <Ionicons name="search-outline" size={60} color="#ccc" />
                  <Text style={{ marginTop: 10, fontSize: 16, color: '#666', textAlign: 'center' }}>
                    No products found for "{searchQuery}"
                  </Text>
                  <Text style={{ marginTop: 5, fontSize: 14, color: '#999', textAlign: 'center' }}>
                    Try different keywords
                  </Text>
                </View>
              )}
            </View>
          ) : (
            // Show regular home content
            <>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  padding: 10,
                  backgroundColor: '#4198c785',
                  alignItems: 'center',
                }}
              >
                <Ionicons name="location-outline" size={26} color="black" />
                <Pressable>
                  {selectedAddress ? (
                      <Text style={{ fontSize: 14, fontWeight: '500' }}>
                    {selectedAddress?.name} - {selectedAddress?.street}
                  </Text>
                  ) :(
                   <Text style={{ fontSize: 14, fontWeight: '500' }}>
                    choose your address
                  </Text>
                  )}
                </Pressable>
                <Ionicons name="chevron-down-outline" size={22} color="black" />
              </Pressable>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {list.map((item, index) => (
                  <TouchableOpacity
                  onPress={()=>{navigation.navigate('SearchProduct',{item:item.name})}}
                    key={index}
                    style={{
                      padding: 5,
                      margin: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        resizeMode: 'contain',
                      }}
                      resizeMode="cover"
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        fontWeight: '500',
                        marginTop: 5,
                      }}
                    >
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
              >
                {images.map((uri, index) => (
                  <View
                    key={index}
                    style={{
                      width: screenWidth,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      source={{ uri }}
                      style={{ width: 412, height: 150, resizeMode: 'contain' }}
                    />
                  </View>
                ))}
              </ScrollView>

              <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>
                Trending Deals of this week
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                {trendingProduct?.map((item, index) => (
                  <Pressable
                    onPress={() => navigation.navigate('Info', { item: item })}
                    key={index}
                    style={{
                      flexWrap:'wrap',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                      marginHorizontal:20,
                    }}
                  >
                    <Image
                      style={{ width: 140, height: 140, resizeMode: 'contain' }}
                      source={{ uri: item.image }}
                    />
                  </Pressable>
                ))}
              </View>

              <Text
                style={{
                  height: 1,
                  borderColor: '#D0D0D0',
                  borderWidth: 2,
                  marginTop: 15,
                }}
              ></Text>

              <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>
                Today's Deals
              </Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {todayDealProduct?.map((item, index) => (
                  <Pressable
                    onPress={() => navigation.navigate('Info', { item: item })}
                    key={index}
                    style={{
                      marginVertical: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      style={{ width: 140, height: 140, resizeMode: 'contain' }}
                      source={{ uri: item.image }}
                    />
                    {item?.offer && (
 <View
                      style={{
                        backgroundColor: '#E31837',
                        marginTop: 10,
                        borderRadius: 10,
                        paddingVertical: 5,
                        width: 130,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          fontSize: 13,
                          fontWeight: 'bold',
                        }}
                      >
                        Upto {item.offer}
                      </Text>
                    </View>
                    )}
                   
                  </Pressable>
                ))}
              </ScrollView>

              <Text
                style={{
                  height: 1,
                  borderColor: '#D0D0D0',
                  borderWidth: 2,
                  marginTop: 15,
                }}
              ></Text>

              <View
                style={{
                  marginHorizontal: 10,
                  marginTop: 20,
                  width: '45%',
                  marginBottom: open ? 50 : 15,
                }}
              >
                <DropDownPicker
                  style={{
                    borderColor: '#B7B7B7',
                    height: 30,
                    marginBottom: open ? 120 : 15,
                  }}
                  open={open}
                  value={category}
                  items={items}
                  setOpen={setOpen}
                  setValue={setCategory}
                  setItems={setItems}
                  placeholder="choose category"
                  onOpen={onGenderOpen}
                  zIndex={3000}
                  zIndexInverse={1000}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {categoryProducts.map((item, index) => (
                  <ProductItem item={item} key={index} />
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        swipeDirection={['up', 'down']}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={{ backgroundColor: 'white', height: 400, padding: 10 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>
              Choose your Location
            </Text>
            <Text style={{ marginTop: 5, fontSize: 16, color: 'gray' }}>
              Select a delivery location to see product availability and
              delivery options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {addresses?.map((item, index) => (
              <Pressable
              onPress={()=>setSelectedAddress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap:3,
                  marginRight:15,
                  marginTop:10,
                  backgroundColor:selectedAddress ===item ? "#8bc2e085" :"white"
                }}
              >
                <View style={{flexDirection:'row',alignItems:'center',gap:3}}>
                  <Text style={{fontSize:13,fontWeight:'bold'}}>{item?.name}</Text>
                   <Ionicons name="location" size={20} color="red" />
                </View>
                <Text numberOfLines={1} style={{width:130,fontSize:13,textAlign:'center'}}>{item?.houseNo}, {item?.landmark}</Text>
                <Text numberOfLines={1} style={{width:130,fontSize:13,textAlign:'center'}}>{item?.street}</Text>
                <Text numberOfLines={1} style={{width:130,fontSize:13,textAlign:'center'}}>Pakistan</Text>
                
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                navigation.navigate('Address');
                setModalVisible(false);
              }}
              style={{
                height: 140,
                width: 140,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#0066b2',
                }}
              >
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: 'column', gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
            >
              <Ionicons name="information-circle-outline" size={23} color="red" />
              <Text style={{ color: '#d82d13ff', fontWeight: '400' }}>
               Instructions
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
            >
              <Ionicons name="location" size={25} color="#0066b2" />
              <Text style={{ color: '#0066b2', fontWeight: '400' }}>
                Enter an Pakistan pincode
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
            >
              <Ionicons name="earth" size={25} color="#0066b2" />
              <Text style={{ color: '#0066b2', fontWeight: '400' }}>
                Deliver intside Pakistan
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Home;