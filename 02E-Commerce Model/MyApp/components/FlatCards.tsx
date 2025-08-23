import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import React from 'react';

const FlatCards = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <Text style={isDark ? styles.whiteText : styles.darkText}>
        Flat Cards
      </Text>

      <View style={styles.boxes}>
        <View style={[styles.box, { backgroundColor: 'red' }]}>
          <Text style={styles.boxText}>Red</Text>
        </View>
        <View style={[styles.box, { backgroundColor: 'green' }]}>
          <Text style={styles.boxText}>Green</Text>
        </View>
        <View style={[styles.box, { backgroundColor: 'blue' }]}>
          <Text style={styles.boxText}>Blue</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'column',
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
  boxes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 6,
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default FlatCards;
