import React                      from 'react';
import { Route, Redirect,Switch } from 'react-router-dom';
import { StylesProvider }         from '@material-ui/core/styles';
import { useSelector }            from 'react-redux';
import CssBaseline                from '@material-ui/core/CssBaseline';
import Spinner                    from './components/Spinner';
import Home                       from './containers/Home/Home';
import Table1                     from './containers/Table1/Table1';
import Table2                     from './containers/Table2/Table2';
import Layout                     from './layout/Layout';



const mountRoutes = () => {
  
  const routes = [];
  
  routes.push(<Route  exact path="/" key={'home'} > <Home/> </Route>);
  routes.push(<Route  path="/table1" key={'table1'} > <Table1/> </Route>);
  routes.push(<Route  path="/table2" key={'table2'} > <Table2/> </Route>);
  
  routes.push(<Redirect to="/" key={'redirect'}/>);
  
  return (
    <Switch>
      {routes}
    </Switch>
  );
};

const App = () => {
  
  const {loading}     = useSelector(state => state.app);
  
  return (
    <StylesProvider injectFirst>
      <CssBaseline/>
      {!!loading && <Spinner/>}
      <Layout >
        {mountRoutes()}
      </Layout>
    </StylesProvider>
  );
  
  
};

export default App;
