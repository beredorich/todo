import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import './App.css';
import TaskBox from './TaskBox';
import { taskList } from './tasks.js'

function App() {

  // Initialize taskBox List
  const [taskBoxes, setTaskBoxes] = useState([{ id: 1, description: '', complete: false }]);

  // Transfer taskBox List from tasks.js
  useEffect(() => {
    setTaskBoxes(() => (
      taskList.map((task, id) => ({
        id: task.id,
        description: task.description,
        complete: task.complete
      }))
    ));
  }, []);

  //Add a new taskBox to the list
  const addTaskBox = () => {
    setTaskBoxes((prevTaskBoxes) => {
      const newId = prevTaskBoxes.length > 0 ? prevTaskBoxes[prevTaskBoxes.length - 1].id + 1 : 1;
      return [
        ...prevTaskBoxes,
        { id: newId, description: '', complete: false },
      ];
    });
  };

  //Delete a taskBox from the list
  const deleteTaskBox = (indexToDelete: number) => {
    setTaskBoxes((prevTaskBoxes) => prevTaskBoxes.filter((_, index) => index !== indexToDelete));
  };

  //Update a taskBox in the list
  const updateTask = (index: number, newName: string, complete: boolean) => {
    setTaskBoxes((prevTaskBoxes) => {
      const updatedTaskBoxes = [...prevTaskBoxes];
      updatedTaskBoxes[index].description = newName;
      updatedTaskBoxes[index].complete = complete;
      return updatedTaskBoxes;
    });
  };

  //Console Log the Task List
  const saveTaskList = () => {
    console.log(taskBoxes)
  }

  return (
    <Box className='App'>
      <Box className='TitleBox'>
        <Typography variant='h1'>To Do</Typography>
        <Button onClick={saveTaskList}><SaveIcon /></Button>
      </Box >
      <Box className='TaskBoxContainer' sx={{ width: '100%' }}>
        {taskBoxes.map((taskBox, index) => (
          <TaskBox
            key={taskBox.id}
            uniqueKey={taskBox.id}
            addTaskBox={addTaskBox}
            index={index}
            onDelete={() => deleteTaskBox(index)}
            updateTask={(newName: string, complete: boolean) => updateTask(index, newName, complete)}
            initialChecked={taskBox.complete}
            initialTaskName={taskBox.description}
          />
        ))}
        <Button onClick={addTaskBox}>
          <Box><AddIcon /></Box>
          <Typography>New Task</Typography>
        </Button>
      </Box>
    </Box >
  );
}


export default App;
