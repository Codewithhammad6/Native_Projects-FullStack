import { View, Text, useColorScheme, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

const ElevatedCards = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <Text style={isDark ? styles.whiteText : styles.darkText}>
        Elevated Cards
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        <View style={isDark ? styles.boxWhite : styles.boxDark}>
          <Text>Card 1</Text>
        </View>
        <View style={isDark ? styles.boxWhite : styles.boxDark}>
          <Text>Card 2</Text>
        </View>
       <View style={isDark ? styles.boxWhite : styles.boxDark}>
          <Text>Card 3</Text>
        </View>
        <View style={isDark ? styles.boxWhite : styles.boxDark}>
          <Text>Card 4</Text>
        </View>
        <View style={isDark ? styles.boxWhite : styles.boxDark}>
          <Text>Card 5</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  whiteText: {
    color: '#ffffff',
    marginBottom: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#000000',
    marginBottom: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
scrollContainer: {
  padding: 6,
}
,
  boxWhite: {
    height: 120,
    width: 120,
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  boxDark: {
    height: 120,
    width: 120,
    borderRadius: 8,
    backgroundColor: '#a6a2a2cc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

});

export default ElevatedCards;
