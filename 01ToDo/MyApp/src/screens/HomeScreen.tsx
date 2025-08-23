import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Button } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, { useEffect, useState } from 'react';
import useStore from '../../store/userStore';

const HomeScreen = ({navigation}) => {
  const [checkedItems, setCheckedItems] = useState({});
const {fetchTodos,todos,loading,deleteTodo} = useStore()


  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

useEffect(()=>{
  fetchTodos()
},[todos])


if(!loading){
      return(
<View style={styles.container}>
  <Text>Loading...</Text>
</View>
    )
}

  return (
    <>
      <TouchableOpacity style={styles.add} onPress={()=>{navigation.navigate('AddTodo')}}>
        <Text style={styles.addText}>
          Add
        </Text>
      </TouchableOpacity>
    <View style={styles.container}>
    
        <ScrollView>
        <View style={styles.todoContainer}>
          {todos.map((todo) => (
            <TouchableOpacity onPress={()=>{navigation.navigate('Details',{Detail:todo})}}>
            <View key={todo._id} style={styles.todoBox}>

              <View style={styles.todoIn}>
              <BouncyCheckbox
                style={styles.checkBox}
                fillColor="#4652d8ff"
                isChecked={!!checkedItems[todo._id]} // Convert to boolean
                onPress={() => toggleCheck(todo._id)}
              />
              <Text 
                style={[
                  styles.todoText,
                  checkedItems[todo._id] && styles.checkedText
                ]} 
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {todo.text}
              </Text>
            </View>
<View style={styles.buttons}>
             <TouchableOpacity
             onPress={() => navigation.navigate('EditTodo',{detail:todo})}
             >
              <Text style={styles.edit}>Edit</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>{deleteTodo(todo._id)}}>
              <Text style={styles.delete}>Del</Text>
             </TouchableOpacity>
</View>


            </View>
            </TouchableOpacity>
          ))}
        </View>
    </ScrollView>
      </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#9fa4a58f',
    padding: 10,
    borderRadius: 5,
    marginTop:50,
    marginBottom:80
  },
  checkBox: {
    width: 35,
    marginVertical:18
  },
  todoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#13132eff',
    overflow: 'hidden',
    padding: 7,
    borderRadius: 4,
  },
  todoIn:{
    flexDirection: 'row',
    alignItems:'center'
  },
  todoText: {
    fontSize: 16,
    color: '#fff',
    width:150,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7
  },
  todoContainer: {
    gap: 7
  },
  edit:{
    color:'white',
    backgroundColor:'#2020f7ff',
    fontSize:18,
    paddingHorizontal:8,
    borderRadius:5
  },
  delete:{
    color:'white',
    backgroundColor:'#e02908ff',
    fontSize:18,
    paddingHorizontal:8,
    borderRadius:5
  },
  buttons:{
    flexDirection:'row',
    gap:7
  },
  add:{
    position:'absolute',
    right:50,
    top:15,
  },
  addText:{
     color:'white',
    backgroundColor:'#2020f7ff',
    fontSize:20,
    paddingHorizontal:10,
    borderRadius:4
  },

});

export default HomeScreen;