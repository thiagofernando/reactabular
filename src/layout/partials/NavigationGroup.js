import React        from 'react';
import List         from '@material-ui/core/List';
import ListItem     from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse       from '@material-ui/core/Collapse';
import NavigationItem from './NavigationItem';


const NavigationGroup = ({className, children, grouper, icon, ...props}) => {
  
  const [open, setOpen] = React.useState(false);
  
  const handleClick = () => {
    setOpen(!open);
  };
  
  return (
    <>
      <NavigationItem text={grouper} icon={icon} handleClick={handleClick} element={open ? <ExpandLessIcon/> : <ExpandMoreIcon/>}/>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
  
};

export default NavigationGroup;
