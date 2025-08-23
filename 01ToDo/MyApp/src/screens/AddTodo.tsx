import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import useStore from '../../store/userStore';
const AddTodo = ({navigation}) => {
    const [text, setText] = useState('');
const {addTodo} = useStore()
    const handler =()=>{
      addTodo(text)
      navigation.popToTop('Home')
    }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your notes:</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Type here..."
        placeholderTextColor="#999"
        value={text}
        onChangeText={(value) => setText(value)}
        multiline={true}          
        numberOfLines={10}        
        textAlignVertical="top" 
      />
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.cancle} onPress={()=>{navigation.popToTop('Home')}}>
        <Text style={styles.btntext}>
          Exit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.save} onPress={()=>{handler()}}>
        <Text style={styles.btntext}>
          Save
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}


export default AddTodo



const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  textArea: {
    height: 250,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  buttons:{
marginVertical:20,
flexDirection:'row',
gap:10
  },
  cancle:{
    backgroundColor:'#8b8888ff',
    width:80,
    alignItems:'center',
    borderRadius:5,
    borderWidth:1
  },
  btntext:{
    fontSize:20,
    color:'white'
  },
  save:{
     backgroundColor:'#1a1ac5ff',
    width:80,
    alignItems:'center',
    borderRadius:5,
    borderWidth:1
  }
});