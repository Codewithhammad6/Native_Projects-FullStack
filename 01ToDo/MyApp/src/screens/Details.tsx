import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Details = ({route}) => {
const {Detail}=route.params


  const dateObj = new Date(Detail.createdAt); 

  const formattedDate = dateObj.toLocaleDateString(); // "8/13/2025"
  const formattedTime = dateObj.toLocaleTimeString(); // "11:58 AM"

  return (
    <>
      <Text style={styles.date}>{formattedDate} {formattedTime}</Text>
    <View style={styles.container}>
      <Text style={styles.text}>{Detail.text}</Text>
    </View>
    </>
  )
}
const styles=StyleSheet.create({
container:{
  marginVertical:30,
  marginHorizontal:10
},
text:{
  fontSize:18
},
date:{
  position:'absolute',
  backgroundColor:'#c4bfbfff',
  borderRadius:5,
  paddingVertical:2,
  paddingHorizontal:7,
  top:7,
  right:0
}
})
export default Details