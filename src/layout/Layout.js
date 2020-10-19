import React, { useEffect } from 'react';
import Header    from './Header';
import classes   from './Layout.module.css';
import Drawer    from './Drawer';
import Container from '@material-ui/core/Container';

const Layout = ({children}) => {
  
  const [open, setOpen] = React.useState(window.innerWidth > 479);
  
  const handleDrawerOpen  = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleWindowResize = () => {
    
    if (window.innerWidth < 480) handleDrawerClose();
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
    <div className={classes.Root}>
      <Header open={open} handleOpenMenu={handleDrawerOpen}/>
      <Drawer open={open} handleCloseMenu={handleDrawerClose}/>
      <main className={classes.SiteContent}>
        <div className={classes.HeaderSpacer}/>
        <Container maxWidth="lg" className={classes.Container}>
          {children}
        </Container>
      </main>
    </div>
  );
};


export default Layout;
