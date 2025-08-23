import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import ProductItem from './components/ProductItem';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import userStore from '../store/userStore.ts';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('jewelery');
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: 'jewelery', value: 'jewelery' },
    { label: 'electronics', value: 'electronics' },
    { label: "women's clothing", value: "women's clothing" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const { getAddresses } = userStore();


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
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
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
        'https://media.istockphoto.com/id/654003702/photo/acoustic-guitar-on-a-black-background-with-copy-space.jpg?s=612x612&w=0&k=20&c=d7Xw_6RCFG2YPtjmmySGVwUJOGPDP4jGY0X9HCaGrpY=',
      name: 'Music',
    },
    {
      id: '5',
      image:
        'data:image/jpeg;base64,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',
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
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      scrollRef.current.scrollTo({
        x: screenWidth * nextIndex,
        animated: true,
      });
    }, 4000); // scroll every 4 sec

    return () => clearInterval(interval);
  }, [currentIndex]);

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const deals = [
    {
      id: '20',
      title: 'OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)',
      oldPrice: 25000,
      price: 19000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg',
        'https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg',
      ],
      color: 'Stellar Green',
      size: '6 GB RAM 128GB Storage',
    },
    {
      id: '30',
      title:
        'Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers',
      oldPrice: 74000,
      price: 26000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg',
        'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
      ],
      color: 'Cloud Navy',
      size: '8 GB RAM 128GB Storage',
    },
    {
      id: '40',
      title:
        'Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger',
      oldPrice: 16000,
      price: 14000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg',
      ],
      color: 'Icy Silver',
      size: '6 GB RAM 64GB Storage',
    },
    {
      id: '40',
      title:
        'realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera',
      oldPrice: 12999,
      price: 10999,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg',
      ],
      color: 'Sky Blue',
      size: '8 GB RAM 64GB Storage',
    },
  ];

  const offers = [
    {
      id: '0',
      title:
        'Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)',
      offer: '72% off',
      oldPrice: 7500,
      price: 4500,
      image:
        'https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg',
      ],
      color: 'Green',
      size: 'Normal',
    },
    {
      id: '1',
      title:
        'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
      offer: '40%',
      oldPrice: 7955,
      price: 3495,
      image: 'https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg',
      ],
      color: 'black',
      size: 'Normal',
    },
    {
      id: '2',
      title: 'Aishwariya System On Ear Wireless On Ear Bluetooth Headphones',
      offer: '40%',
      oldPrice: 7955,
      price: 3495,
      image: 'https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg',
      carouselImages: ['https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg'],
      color: 'black',
      size: 'Normal',
    },
    {
      id: '3',
      title:
        'FS1 Pro Smart Mobile|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 3 Days Battery',
      offer: '40%',
      oldPrice: 24999,
      price: 19999,
      image: 'https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg',
      ],
      color: 'Norway Blue',
      size: '8GB RAM, 128GB Storage',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.log('Error message', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === 'android' ? 5 : 0,
          flex: 1,
          backgroundColor: '#fdfbfbec',
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
            <Pressable
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
                placeholder="Search HL.in"
                placeholderTextColor="#A9A9A9"
                style={{ fontSize: 16, flex: 1, marginLeft: 6, color: '#000' }}
              />
            </Pressable>
            <Ionicons name="mic-outline" size={32} color="black" />
          </View>

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
              <Pressable
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
              </Pressable>
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
            {deals.map((item, index) => (
              <Pressable
                onPress={() => navigation.navigate('Info', { item: item })}
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}
              >
                <Image
                  style={{ width: 180, height: 180, resizeMode: 'contain' }}
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
            {offers.map((item, index) => (
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
            {products
              ?.filter(item => item.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>
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
              <Ionicons name="location" size={25} color="#0066b2" />
              <Text style={{ color: '#0066b2', fontWeight: '400' }}>
                Enter an Pakistan pincode
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
            >
              <Ionicons name="locate" size={25} color="#0066b2" />
              <Text style={{ color: '#0066b2', fontWeight: '400' }}>
                Use My Current Location
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
            >
              <Ionicons name="earth" size={25} color="#0066b2" />
              <Text style={{ color: '#0066b2', fontWeight: '400' }}>
                Deliver outside Pakistan
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Home;
