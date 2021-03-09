import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddBoxIcon from '@material-ui/icons/AddBox';
import RestoreIcon from '@material-ui/icons/Restore';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { nanoid } from 'nanoid';
import Header from '../Components/Header';

const useStyles = makeStyles({
    root: {
        width: '100%',
        backgroundColor: '#041955',
        color: '#fff',
    },
});

const HomeScreen = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const classes = useStyles();
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setTodos(todos.sort());
    }, [todos]);

    const finished = (id) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setValue('');
    };

    console.log(todos);

    const addTask = () => {
        const data = {
            id: nanoid(),
            task,
            time: new Date(),
            isDone: false,
        };
        if (task) {
            setTodos((previous) => [...previous, data]);
            setTask('');
        }
    };

    const deleteTask = (id) => {
        const newTaskList = todos.filter((todo) => todo.id !== id);
        setTodos(newTaskList);
    };

    return (
        <div>
            <Header />
            <section className="section">
                <Typography variant="h4" className="color-white intro" component="h4">
                    What&apos;s Up
                </Typography>
                <Typography variant="h5" className="color-white task-title mb-0" component="h4">
                    Task List
                </Typography>
                <Typography variant="h6" className="color-white task-title mt-0" component="h4">
                    {new Date().toLocaleString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}{' '}
                </Typography>

                {!todos.length ? (
                    <div className="list">
                        <Typography
                            variant="body1"
                            className="color-white todo"
                            component="h5"
                            style={{ paddingBottom: '.5rem', textAlign: 'center' }}
                        >
                            No task is set to do
                        </Typography>
                    </div>
                ) : null}
                <div className="list-area">
                    {todos &&
                        todos
                            .slice()
                            .reverse()
                            .map((todo) => (
                                <div className="list" key={todo.id}>
                                    <IconButton
                                        edge="start"
                                        onClick={() => finished(todo.id)}
                                        color="inherit"
                                        aria-label="menu"
                                    >
                                        {todo.isDone ? (
                                            <CheckCircleIcon className="color-white" />
                                        ) : (
                                            <RadioButtonUncheckedIcon className="color-white" />
                                        )}
                                    </IconButton>
                                    <Typography
                                        variant="body1"
                                        className={
                                            todo.isDone
                                                ? 'color-white todo line-through'
                                                : 'color-white todo'
                                        }
                                        component="h5"
                                    >
                                        {todo.task}
                                    </Typography>
                                    <IconButton
                                        edge="start"
                                        onClick={() => deleteTask(todo.id)}
                                        color="inherit"
                                        aria-label="menu"
                                        className="deleteButton"
                                    >
                                        <DeleteIcon className="color-white deleteButton" />
                                    </IconButton>
                                </div>
                            ))}
                </div>
                <div style={{ height: 50 }} />
            </section>

            <BottomNavigation
                value={value}
                onChange={handleChange}
                className={`${classes.root} fixed-bottom`}
            >
                <BottomNavigationAction
                    label="Recents"
                    value="recents"
                    icon={<RestoreIcon className="color-white" />}
                />
                <BottomNavigationAction
                    label="Events"
                    value="events"
                    icon={<EventAvailableIcon className="color-white" />}
                />
                <BottomNavigationAction
                    label="Add Task"
                    value="addTask"
                    onClick={handleClickOpen}
                    icon={<AddBoxIcon className="color-white" />}
                />
            </BottomNavigation>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Your Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="task"
                        label="Task"
                        type="text"
                        fullWidth
                        onChange={(e) => setTask(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            addTask();
                        }}
                        color="primary"
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default HomeScreen;
