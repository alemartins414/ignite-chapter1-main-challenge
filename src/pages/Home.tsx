import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface EditTask {
  id: number;
  newTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.find((task) => task.title === newTaskTitle);

    if (taskExists) {
      return Alert.alert("To.do duplicado", "Este To.do já existe em sua lista de tarefas");
    }

    const newTask: Task = {
      id: tasks.length + 1,
      title: newTaskTitle,
      editing: false,
      done: false
    }
    setTasks(oldState => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldState => oldState.map((state) => { return {...state, done: state.id === id ? !state.done : state.done }}));
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover To.do',
      'Você tem certeza que deseja remover este To.do?',
      [
        { style: 'cancel', text: 'Não'},
        { style: 'destructive', text: 'Sim', onPress: () => {
          setTasks(oldState => oldState.filter((state) => state.id !== id));
        }}
      ])
  }

  function handleEditTaskToggle(id: number) {
    setTasks(oldState => oldState.map((state) => { return {...state, editing: state.id === id ? !state.editing : state.editing }}));
  }

  function handleEditTask(id: number, newTitle: string) {
    setTasks(oldState => oldState.map((state) => { return {...state, title: state.id === id ? newTitle : state.title }}));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.filter(task => !task.done).length} />

      <TodoInput addTask={handleAddTask} />

      { tasks.filter(task => !task.done).length > 0 ?
        <TasksList
          tasks={tasks.filter(task => !task.done)}
          toggleTaskDone={handleToggleTaskDone}
          removeTask={handleRemoveTask}
          editTask={handleEditTask}
          toggleEditTask={handleEditTaskToggle}
        />
       : undefined }

      { tasks.filter(task => task.done).length > 0 ?
        <>
          <Text style={{ marginTop: 20, alignSelf: 'center'}}>
            Tarefas concluídas
          </Text>

          <TasksList
            tasks={tasks.filter(task => task.done)}
            toggleTaskDone={handleToggleTaskDone}
            removeTask={(handleRemoveTask)}
            editTask={(handleEditTask)}
            toggleEditTask={(handleEditTaskToggle)}
          />
        </> : undefined
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})