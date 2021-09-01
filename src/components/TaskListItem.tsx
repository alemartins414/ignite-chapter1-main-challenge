import React, { useState } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/pencil/pencil.png'
import closeIcon from '../assets/icons/close/close.png'
import { Task } from './TasksList';


interface TasksListItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  toggleEditTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
}



export function TaskListItem({ task, index, toggleTaskDone, removeTask, editTask, toggleEditTask }: TasksListItemProps) {
  const [tempTaskTitle, setTempTaskTitle] = useState(task.title);

  function cancelEdit() {
    setTempTaskTitle(task.title);
    toggleEditTask(task.id)
  }

  return (
    <ItemWrapper index={index}>
      <View style={styles.listItemContainer}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => task.editing ? undefined : toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={styles.taskMarker}
          >
            { task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <View style={styles.infoContainer}>
          {
            task.editing ?
            <TextInput value={tempTaskTitle} onChangeText={setTempTaskTitle} onSubmitEditing={() => editTask(task.id, tempTaskTitle)} style={{ height: 38}}/>
            :
            <Text style={task.done ? styles.taskTextDone : styles.taskText}> {task.title} </Text>
          }
          </View>
        </TouchableOpacity>
      </View>

      { !task.done ?
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            testID={`edit-${index}`}
            style={{ padding: 24 }}
            onPress={() => task.editing ? cancelEdit() : toggleEditTask(task.id)}
          >
            <Image source={task.editing ? closeIcon : editIcon} />
          </TouchableOpacity>

          <View style={styles.iconsDivider} />

          <TouchableOpacity
            disabled={task.editing}
            testID={`trash-${index}`}
            style={[ task.editing ? { opacity: 0.5 } : undefined, { paddingHorizontal: 24 }]}
            onPress={() => removeTask(task.id)}
          >
            <Image source={trashIcon} />
          </TouchableOpacity>
        </View>
       : undefined }
    </ItemWrapper>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flexDirection: 'row',
    marginRight: 0,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  }
})