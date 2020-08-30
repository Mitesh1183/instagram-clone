import React from 'react';
import './App.css';
import {  Route, Switch,Redirect } from 'react-router-dom';


import Homepage from './component/user/Homepage'
import Signup from './component/Signup'
import Login from './component/Login'
import Profile from './component/user/Profile'
import Userprofile from './component/user/Userprofile'
import Error from './component/Error'
const App=(props)=> {

const PrivateRoute = ({component: Component}) => (
  <Route render={(props) =>
    localStorage.getItem("user") ? <Component {...props} /> : <Redirect to="/login"/>
  }/>
);
const RedirectRoute = ({component: Component}) => (
  <Route render={(props) =>
    localStorage.getItem("user") ? <Redirect to='/home' /> : <Component {...props} />
  }/>
);
  return (
  <>

        <Switch>
          <RedirectRoute exact path={[ '/', '/login']} component={Login}/>
          <PrivateRoute exact path="/home" name="Home" component={Homepage} />
          <RedirectRoute path='/signup' component={Signup} />
          <PrivateRoute path='/home/userprofile/profile' component={Profile} />
          <PrivateRoute path={['/home/userprofile','/home/userprofile/timeline']} component={Userprofile} />
          <Route component={Error} />
        </Switch>
     
    
  </>);
}


export default App;

