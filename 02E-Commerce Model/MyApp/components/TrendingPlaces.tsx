import { View, Text, useColorScheme, StyleSheet, Image } from 'react-native';
import React from 'react';

const TrendingPlaces = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <Text style={isDark ? styles.whiteText : styles.darkText}>
        Trending places
      </Text>

      <View style={styles.card}>
        <Image
          source={require('../assets/pic.jpg')}
          style={styles.image}
        />
        <View style={styles.cardContent}>
          <Text style={styles.title}>Badshahi Mosque</Text>
          <Text style={styles.subtitle}>Lahore city</Text>
          <Text numberOfLines={3} style={styles.info}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ea. Iusto id nemo dolore eaque deserunt saepe, voluptates blanditiis atque minima voluptate natus voluptas deleniti repudiandae non earum veritatis! Obcaecati?</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    
  },
  whiteText: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#000000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#d1cccc75',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop:10,
    width: '100%',
  },
  image: {
    height: 220,
    aspectRatio: 16 / 9,
  resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
    width:350,

  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    color: 'gray',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
  },
});

export default TrendingPlaces;
