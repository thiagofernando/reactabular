import React            from 'react';
import Divider          from '@material-ui/core/Divider';
import List             from '@material-ui/core/List';
import DashboardIcon    from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon       from '@material-ui/icons/People';

import NavigationItem  from './NavigationItem';


const NavigationMenu = ({className, ...props}) => {
  
  return (
    <>
      <Divider/>
      <List>
        <div>
          <NavigationItem text={'Main'} link={'/'} icon={DashboardIcon}/>
        </div>
      </List>
      <Divider/>
      <List>
        <div>
          <NavigationItem text={'Table 1'} link={'/table1'} icon={ShoppingCartIcon}/>
          <NavigationItem text={'Table 2'} link={'/table2'} icon={PeopleIcon}/>
        </div>
      </List>
      <Divider/>
    </>
  );
  
};

export default NavigationMenu;
