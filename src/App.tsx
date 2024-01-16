import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';


function App() {
  const [taskBoxes, setTaskBoxes] = useState([{ checked: '', id: 1 }]);

  const addTaskBox = () => {
    setTaskBoxes((prevTaskBoxes) => [
      ...prevTaskBoxes,
      { checked: '', id: prevTaskBoxes.length + 1 },
    ]);
  };

  const deleteTaskBox = (indexToDelete: number) => {
    setTaskBoxes((prevTaskBoxes) => prevTaskBoxes.filter((_, index) => index !== indexToDelete));
  };

  return (
    <Box className="App" sx={{ margin: 'auto', display: 'flex', flexDirection: 'column', border: 1, width: '80vw', height: '80vh', alignItems: 'center' }}>
      <Typography variant='h2'>To Do</Typography>
      {taskBoxes.map((taskBox, index) => (
        <TaskBox
          key={taskBox.id}
          uniqueKey={taskBox.id} // Pass a unique key to TaskBox
          addTaskBox={addTaskBox}
          index={index}
          onDelete={() => deleteTaskBox(index)}
        />
      ))}
    </Box>
  );
}

interface TaskBoxProps {
  addTaskBox: () => void;
  index: number;
  onDelete: () => void;
  uniqueKey: number;
}

const TaskBox: React.FC<TaskBoxProps> = ({ addTaskBox, index, onDelete, uniqueKey }) => {
  const [checked, setChecked] = useState('');
  const textFieldRef = useRef<HTMLInputElement | null>(null);

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTaskBox();
    } else if (event.key === 'Backspace' && event.currentTarget.value === '') {
      onDelete();
    }
  };

  const handleCheck = () => {
    if (checked === '') {
      setChecked('line-through');
    } else {
      setChecked('');
    }
  };

  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, [uniqueKey]); // Trigger the effect when the uniqueKey changes

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Checkbox onClick={handleCheck} />
      <TextField
        variant='standard'
        placeholder='Add Task'
        InputProps={{ disableUnderline: true }}
        style={{ textDecoration: checked }}
        onKeyDown={handleEnter}
        inputRef={textFieldRef}
      />
    </Box>
  );
};

export default App;
