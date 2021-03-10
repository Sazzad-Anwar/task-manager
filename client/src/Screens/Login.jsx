import { AppBar, Toolbar, Card, Typography, TextField, Grid, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import NotesIcon from '@material-ui/icons/Notes';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Login = ({ history }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const handleClick = (erroMsg) => {
        setOpen(true);
        setMsg(erroMsg);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    useEffect(() => {
        setTimeout(() => {
            document.getElementById('card').classList.replace('show', 'hidden');
            document.getElementById('appBar').classList.replace('hidden', 'show');
            document.querySelector('.workbook').classList.add('magictime', 'spaceInLeft');
            document.querySelector('.greet-2').classList.add('magictime', 'spaceInLeft');
            document.querySelector('.greet').classList.add('magictime', 'spaceInRight');
            document.querySelector('.input-card').classList.add('magictime', 'swashIn');
        }, 2000);
    }, []);

    const handleSubmit = () => {
        if (name && phone) {
            localStorage.setItem('username', name);
            localStorage.setItem('phone', phone);
            history.push('/dashboard');
        } else if (!name) {
            handleClick('Name can not be empty');
        } else if (!phone) {
            handleClick('Phone can not be empty');
        }
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={msg}
                action={
                    <>
                        <Button className="text-white" size="small" onClick={handleClose}>
                            Ok
                        </Button>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </>
                }
            />
            <Card elevation={10} className="show" id="card">
                <img
                    className="shadow-lg"
                    src="/logo.png"
                    alt="logo"
                    style={{
                        height: 'auto',
                        width: 'auto',
                        padding: 0,
                        margin: 0,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        border: '1px solid #041955',
                        borderRadius: '22%',
                        boxShadow:
                            '0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 8px 30px 0 rgba(0, 0, 0, 0.19)',
                        transform: 'translate(-50%,-50%)',
                    }}
                />
            </Card>
            <div id="appBar" className="hidden">
                <AppBar position="static" className="appBar">
                    <Toolbar className="toolbar">
                        <Typography variant="h4" component="h5" className="workbook">
                            Workbook
                        </Typography>
                        <Typography variant="h4" component="h5" className="greet">
                            <NotesIcon />
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Typography variant="h4" component="h5" className="greet-2 text-white mx-3 mt-5">
                    Hey Seems you are new!
                </Typography>
                <Card className="m-3 mt-5 p-3 bg-color input-card" elevation={10}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-basic"
                                className="custom-input"
                                fullWidth
                                value={name}
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                label="Your Name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-basic"
                                className="custom-input"
                                type="tel"
                                fullWidth
                                onChange={(e) => setPhone(e.target.value)}
                                label="Your Phone"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="button"
                                onClick={handleSubmit}
                                fullWidth
                                className="pink-btn"
                            >
                                Go
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        </>
    );
};

export default Login;
