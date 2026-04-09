import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Add Task
  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        title: task,
        done: false,
        missed: false,
      },
    ]);
    setTask('');
  };

  // Mark Done
  const markDone = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: true, missed: false } : t
      )
    );
  };

  // Mark Missed
  const markMissed = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, missed: true, done: false } : t
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Manager</Text>

      {/* Input */}
      <TextInput
        placeholder="Enter your task..."
        value={task}
        onChangeText={setTask}
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ color: '#777', textAlign: 'center', marginTop: 20 }}>
            No tasks yet...
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text
              style={{
                color: item.missed ? 'red' : 'white',
                textDecorationLine:
                  item.done || item.missed ? 'line-through' : 'none',
              }}
            >
              {item.title}
            </Text>

            <View style={{ flexDirection: 'row', gap: 15 }}>
  {!item.done && !item.missed && (
    <>
      <TouchableOpacity onPress={() => markDone(item.id)}>
        <Text style={{ color: 'lightgreen' }}>Done</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => markMissed(item.id)}>
        <Text style={{ color: 'red' }}>Missed</Text>
      </TouchableOpacity>
    </>
  )}
          </View>
          </View>
        )}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    color: 'white',
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 8,
  },
});