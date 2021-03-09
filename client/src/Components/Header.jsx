import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Avatar, IconButton, Toolbar } from '@material-ui/core';

const Header = () => (
    <div className="sticky-top">
        <AppBar position="static" className="appBar">
            <Toolbar className="toolbar">
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon className="icon" />
                </IconButton>
                <div>
                    <IconButton edge="start" color="inherit" aria-label="search">
                        <Avatar>
                            <img src="https://picsum.photos/200/300" alt="avatar" />
                        </Avatar>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    </div>
);

export default Header;
