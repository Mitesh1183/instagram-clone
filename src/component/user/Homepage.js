import React from 'react';
import { connect } from 'react-redux';

import Header from './Header'
import Cards from './Card'

const Homepage = (props)=> {

    const { user } = props;
    console.log(user)
   
   return (
        <div style={{backgroundColor:'#F2F3F5'}}>
        <Header/>
        <Cards/>

            
       </div> );
    
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

export default connect(mapStateToProps)(Homepage);
