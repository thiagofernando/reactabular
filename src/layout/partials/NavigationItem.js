import React         from 'react';
import ListItem                    from '@material-ui/core/ListItem';
import ListItemIcon                from '@material-ui/core/ListItemIcon';
import ListItemText                from '@material-ui/core/ListItemText';
import { useLocation, useHistory } from 'react-router-dom';
import classes                     from './NavigationItem.module.css';


const NavigationItem = ({className, icon, text, handleClick, link, element, ...props}) => {
  
  const history  = useHistory();
  const location = useLocation();
  
  const currentPath = location.pathname;
  const Icon        = icon;
  
  let internalHandleClick = handleClick;
  
  if (!internalHandleClick && !!link) internalHandleClick = () => history.push(link);
  
  return (
    <ListItem button selected={currentPath === link} onClick={internalHandleClick}
              classes={{root: classes.ListItem, selected: classes.SelectedItem}}>
      <ListItemIcon>
        <Icon/>
      </ListItemIcon>
      <ListItemText primary={text}/>
      {element}
    </ListItem>
  );
  
};

export default NavigationItem;
