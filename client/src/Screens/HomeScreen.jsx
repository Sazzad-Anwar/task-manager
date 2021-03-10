import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
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
    const [name, setName] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setTodos(todos.sort());
        setName(localStorage.getItem('username'));
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
                    What&apos;s Up {name} !
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
                    <Card elevation={20} className="card-press">
                        <CardContent className="d-flex justify-content-around py-0 px-0 bg-color">
                            <Typography
                                variant="body1"
                                className="color-white todo pb-3"
                                component="h5"
                            >
                                No task is set to do !
                            </Typography>
                        </CardContent>
                    </Card>
                ) : null}
                <div className="list-area">
                    {todos &&
                        todos
                            .slice()
                            .reverse()
                            .map((todo) => (
                                <Card elevation={20} className="mb-3 bg-color card-press">
                                    <CardContent className="d-flex justify-content-around py-0 px-0">
                                        <CardActions style={{ position: 'relative' }}>
                                            <IconButton
                                                edge="start"
                                                onClick={() => finished(todo.id)}
                                                color="inherit"
                                                aria-label="menu"
                                                style={{
                                                    left: todo.isDone ? 0 : 0,
                                                    maxWidth: 40,
                                                    position: 'absolute',
                                                }}
                                            >
                                                {todo.isDone ? (
                                                    <CheckCircleIcon className="color-white" />
                                                ) : (
                                                    <RadioButtonUncheckedIcon className="color-white" />
                                                )}
                                            </IconButton>
                                        </CardActions>
                                        <Typography
                                            variant="body1"
                                            className={
                                                todo.isDone
                                                    ? 'color-white todo line-through'
                                                    : 'color-white todo'
                                            }
                                            style={{
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                maxWidth: '20ch',
                                            }}
                                            component="h5"
                                        >
                                            {todo.task}
                                        </Typography>
                                        {todo.isDone ? (
                                            <CardActions>
                                                <IconButton
                                                    edge="start"
                                                    onClick={() => deleteTask(todo.id)}
                                                    color="inherit"
                                                    aria-label="menu"
                                                    className="deleteButton"
                                                    style={{ right: -20 }}
                                                >
                                                    <DeleteIcon className="color-white deleteButton" />
                                                </IconButton>
                                            </CardActions>
                                        ) : (
                                            <CardActions>
                                                <IconButton
                                                    edge="start"
                                                    onClick={() => deleteTask(todo.id)}
                                                    color="inherit"
                                                    aria-label="menu"
                                                    className="deleteButton"
                                                    style={{ right: -20 }}
                                                >
                                                    {/* <DeleteIcon className="color-white deleteButton" /> */}
                                                </IconButton>
                                            </CardActions>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                </div>
                <div style={{ height: 50 }} />
            </section>

            <BottomNavigation
                value={value}
                onChange={handleChange}
                className={`${classes.root} bottom-nav fixed-bottom`}
            >
                <BottomNavigationAction
                    label="Recents"
                    value="recents"
                    className="color-white"
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
                    <DialogContentText id="alert-dialog-description">
                        Get a Checklist for your day in organized !
                    </DialogContentText>
                </DialogContent>
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
