import React, { useEffect } from 'react';
import classes              from './Layout.module.css';
import IconButton       from '@material-ui/core/IconButton';
import ChevronLeftIcon  from '@material-ui/icons/ChevronLeft';
import MDrawer          from '@material-ui/core/Drawer';
import NavigationMenu   from './partials/NavigationMenu';

const Drawer = ({className, open, handleCloseMenu, }) => {
  
  
  const [type, setType]   = React.useState(window.innerWidth > 479 ? 'permanent' : 'temporary');
  const drawerClass     = open ? classes.DrawerPaper : classes.DrawerPaperClose;
  let paddingSize = open ? 240 : 72;
  
  const handleWindowResize = () => {
    
    if (window.innerWidth < 480) setType('temporary')
    else setType('permanent')
    // console.log('entrou aqui', hugeScreen)
    // const mobile         = window.innerWidth < 480;
    // console.log("oi", window.innerWidth < 480)
    
  };
  
  useEffect(() => {
    // initiate the event handler
    window.addEventListener('resize', handleWindowResize);
    
    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
 
 
  return (
    <MDrawer variant={type} open={open} classes={ {paper: drawerClass}}  className={classes.Drawer} style={{paddingRight: paddingSize}}>
      <div className={classes.ToolbarIcon}>
        <IconButton onClick={handleCloseMenu}>
          <ChevronLeftIcon/>
        </IconButton>
      </div>
     <NavigationMenu/>
    </MDrawer>
  )

}

export default Drawer
