import { Button, Checkbox, TextField } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import AnimatedBox from './AnimatedBox';

interface TaskBoxProps {
    addTaskBox: () => void;
    index: number;
    onDelete: () => void;
    uniqueKey: number;
    updateTask: (taskName: string, complete: boolean) => void;
    initialChecked: boolean;
    initialTaskName: string;
}

//Description: Individual TaskBox; contains a checkbox, textfield, and delete button
const TaskBox: React.FC<TaskBoxProps> = ({ addTaskBox, onDelete: handleDelete, uniqueKey, updateTask, initialChecked, initialTaskName }) => {

    // Initialize state with initialChecked and initialTaskName
    const [checked, setChecked] = useState(initialChecked);
    const [taskName, setTaskName] = useState(initialTaskName);

    useEffect(() => {
        setChecked(initialChecked);
        setTaskName(initialTaskName);
    }, [initialChecked, initialTaskName]);

    //initilize state/ref variables
    const textFieldRef = useRef<HTMLInputElement | null>(null);

    //Description: update taskName variable when text is changed, updates task in taskList
    const taskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);
        updateTask(e.target.value, checked)
    }

    //Description: adds textbox when enter is pressed, deletes taskbox when backspace is pressed and textbox is empty
    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskBox();
        } else if (event.key === 'Backspace' && textFieldRef.current?.value === '') {
            handleDelete();
        }
    };

    //Description: toggles task completion
    const handleCheck = () => {
        checked ? updateTask(taskName, false) : updateTask(taskName, true)
    };

    //Description: focuses on new textbox when taskbox is created
    useEffect(() => {
        if (textFieldRef.current) {
            textFieldRef.current.focus();
        }
    }, [uniqueKey]);

    return (
        //Description: AnimatedBox is a custom Box component that animates when it is in view, see src/AnimatedBox.tsx
        <AnimatedBox
            animateDirection='yUp'
            display='flex'
            justifyContent='center'
            alignItems='center'
            border={2}
            borderRadius={4}
            backgroundColor='white'
            mb={2}
            flexDirection='row'
            duration={0.5}
            fontsize={30}>
            <Checkbox onClick={handleCheck} checked={checked} />
            <TextField
                variant='standard'
                placeholder='Add Task'
                InputProps={{ disableUnderline: true }}
                style={{ textDecoration: checked ? 'line-through' : '', fontSize: 40 }}
                onKeyDown={handleEnter}
                inputRef={textFieldRef}
                onChange={taskChange}
                value={taskName}
                fullWidth
            />
            <Button onClick={handleDelete}>
                <ClearIcon style={{ color: '#81d4fa' }} />
            </Button>
        </AnimatedBox >
    );
};
export default TaskBox;