import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const Header = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={`${clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })} bg-mix-color`}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            style={{ height: '100vh' }}
        >
            <List>
                <ListItem className="bg-color">
                    <Typography variant="h4" component="h5" className="workbook">
                        Workbook
                    </Typography>
                </ListItem>
                <Link to="/profile">
                    <ListItem button>
                        <ListItemIcon>
                            <Avatar style={{ border: '2px solid #AD60D0' }}>
                                {(
                                    <img
                                        src="/default_image.png"
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '50%',
                                        }}
                                        alt="avatar"
                                    />
                                ) || 'Sazzad'.split()[0]}
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <Link to="/dashboard">
                        <ListItem button className="ml-2">
                            <ListItemIcon>
                                <DashboardIcon className="text-white" />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </Link>
                </Link>
            </List>
        </div>
    );

    return (
        <div className="sticky-top">
            <AppBar position="static" className="appBar">
                <SwipeableDrawer
                    anchor="left"
                    open={state.left}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}
                >
                    {list('left')}
                </SwipeableDrawer>
                <Toolbar className="toolbar">
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={toggleDrawer('left', true)}
                        aria-label="menu"
                    >
                        <MenuIcon className="icon" />
                    </IconButton>
                    <div>
                        <IconButton edge="start" color="inherit" aria-label="search">
                            <Link to="/profile">
                                <Avatar style={{ border: '2px solid #AD60D0' }}>
                                    {(
                                        <img
                                            src="/default_image.png"
                                            style={{
                                                objectFit: 'cover',
                                                borderRadius: '50%',
                                            }}
                                            alt="avatar"
                                        />
                                    ) || 'Sazzad'.split()[0]}
                                </Avatar>
                            </Link>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
