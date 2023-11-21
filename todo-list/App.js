import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity, Picker } from 'react-native';
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('Chân tay'); // State cho Picker
  const addTask = () => {
    setTasks([...tasks, { key: Math.random().toString(), value: text, completed: false, category: selectedValue }]);
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
      <Text style={styles.categoryText}>{item.category}</Text>
      <Button title={item.completed ? 'Hoàn tác' : 'Đánh dấu hoàn thành'} onPress={() => completeTask(item.key)} color={item.completed ? 'blue' : 'green'} />
      <Button title="Xóa" onPress={() => deleteTask(item.key)} color="red" />
    </View>
  );
  return (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Nhập tên công việc"
      value={text}
      onChangeText={setText}
    />
    <Text style={styles.label}>Phân loại công việc</Text> {/* Thêm dòng text này */}
    <Picker
      selectedValue={selectedValue}
      style={styles.picker}
      onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
    >
      <Picker.Item label="Chân tay" value="Chân tay" />
      <Picker.Item label="Trí óc" value="Trí óc" />
      <Picker.Item label="Cả hai" value="Cả hai" />
    </Picker>
    <Button title="Thêm công việc" onPress={addTask} />
    <TextInput
      style={styles.input}
      placeholder="Tìm kiếm công việc"
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
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
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
  categoryText: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    marginVertical: 7,
  },
});
export default App;
