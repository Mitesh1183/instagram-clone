import React from 'react';
import {NavLink} from 'react-router-dom'
import { userActions } from '../../_actions';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';


import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';



const drawerWidth = '13%';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    marginRight:'10px'
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto'
  },
  navbarmenu:{
    textDecoration:'none',
    color:'black'
  },
  
}));


const Leftnavbar=(props)=>{
   const classes = useStyles();

  return(


    <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
             <NavLink to='/home/userprofile' className={classes.navbarmenu}>
              <ListItem button key='Timeline' >
               Timeline
              </ListItem></NavLink>
              
            
          </List>
          <Divider />
          <List>
          <NavLink to='/home/userprofile/profile' className={classes.navbarmenu}>
            <ListItem button key='About'>
                About 
              </ListItem></NavLink>
          </List>
          <Divider />
          <List>
            <ListItem button key='Log out' onClick={()=>props.dispatch(userActions.logout())}>
               Log out
              </ListItem>
          </List>
        </div>
      </Drawer>

    )
}
function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

export default connect(mapStateToProps) (Leftnavbar);
