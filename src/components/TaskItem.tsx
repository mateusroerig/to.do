import React, { useState, useRef, useEffect } from 'react';

import { Image, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

import { Task } from './TasksList';
import { ItemWrapper } from './ItemWrapper';

interface TaskItemProps {
  task: Task; 
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, newTaskTitle: string) => void;
}

export function TaskItem({ 
  task, 
  index, 
  toggleTaskDone, 
  removeTask, 
  editTask 
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState(task.title)

  const textInputRef = useRef<TextInput>(null)

  useEffect(() => {
    if (isEditing) textInputRef.current?.focus()
    else textInputRef.current?.blur()
  }, [isEditing])

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setNewTaskTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, newTaskTitle);
    setIsEditing(false);  
  }

  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
          <TextInput
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>
      <View style={ styles.iconsContainer } >
        { isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" style={{ paddingRight: 12 }}/>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
            style={{ paddingRight: 12 }}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        ) }

        <View 
          style={ styles.iconsDivider }
        />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingLeft: 12 }}
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
        >          
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  )
}


const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
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
    fontFamily: 'Inter-Medium'
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
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)'
  }
})
