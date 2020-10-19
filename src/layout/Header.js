import React         from 'react';
import AppBar        from '@material-ui/core/AppBar';
import Toolbar       from '@material-ui/core/Toolbar';
import Typography    from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import classes from './Header.module.css';

import IconButton        from '@material-ui/core/IconButton';
import MenuIcon          from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge             from '@material-ui/core/Badge';


const Header = ({className, open, handleOpenMenu, ...props}) => {
  
  
  const appBarClass     = open ? classes.AppBarShift : classes.AppBar;
  const menuButtonClass = open ? classes.MenuButtonHidden : classes.MenuButton;
  
  const handleLogout = () => {
    console.log("logout")
  };
  
  return (
    
    <AppBar position="fixed" className={appBarClass}>
      <Toolbar className={classes.Toolbar}>
        <IconButton edge="start" color="inherit" aria-label="open drawer"
                    onClick={handleOpenMenu} className={menuButtonClass}>
          <MenuIcon/>
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.Title}>
          Dashboard
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon/>
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={handleLogout}>
          <ExitToAppIcon/>
        </IconButton>
      </Toolbar>
    </AppBar>
  
  );
  
};


export default Header;
