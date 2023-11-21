import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const addTask = () => {
    setTasks([...tasks, { key: Math.random().toString(), value: text, completed: false }]);
    setText('');
  };
  const completeTask = key => {
    setTasks(tasks.map(task => task.key === key ? { ...task, completed: !task.completed } : task));
  };
  const deleteTask = key => {
    setTasks(tasks.filter(task => task.key !== key));
  };
  const renderTask = ({ item }) => (
  <View style={styles.task}>
    <Text style={item.completed ? styles.taskTextCompleted : styles.taskText}>{item.value}</Text>
    <Button title={item.completed ? 'Hoàn tác' : 'Hoàn thành'} onPress={() => completeTask(item.key)} color={item.completed ? 'blue' : 'green'} />
    <Button title="Xóa" onPress={() => deleteTask(item.key)} color="red" />
  </View>
);
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Nhập vào" 
        value={text} 
        onChangeText={setText} 
      />
      <Button title="Thêm" onPress={addTask} />
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={tasks.filter(task => task.value.includes(search))}
        renderItem={renderTask}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
  input: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  taskText: {
    marginRight: 10,
  },
  taskTextCompleted: {
    marginRight: 10,
    textDecorationLine: 'line-through',
    color: 'green',
  },
});
export default App;