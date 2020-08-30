import React,{useState} from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '70%',
    marginTop: '20px',
    margin:'auto',
  },
  textfield:{
  	width:'90%',
  	maxWidth:'95%',
  	minHeight:'80px',
  	maxHeight:'120px',
  	padding:'15px'
  }
}));


const AddPost=(props)=>{
	const { user } = props;

	const classes = useStyles();
	const[text,setText]=useState('')

var objDate = new Date();

var uploadDate =
    objDate.toLocaleString("en", { month: "long" }) + ' ' +
    objDate.toLocaleString("en", {   day: "numeric"}) + ' ' +
    objDate.toLocaleString("en", { year: "numeric"});
  let TimeType
  let hour = objDate.getHours()
	  if(hour<=11) TimeType='AM'
	  	else TimeType='PM'
	  if(hour>12) hour= hour-12
	  	if(hour===0) hour= 12
  let minutes = objDate.getMinutes()
	if(minutes<10) minutes='0'+minutes.toString()

	const fullTime=hour.toString()+' : '+minutes+' '+ TimeType.toString()
  
const handleInputChange=(e)=>{
	e.preventDefault()
	
	 setText({text: e.target.value,userID:user.id,date: uploadDate,time:fullTime})
}
const handleSubmit=(e)=>{
	e.preventDefault()
	
	const { dispatch } = props;
	
	console.log(text)
	if(text!==''){
		dispatch(userActions.addPost(text))
	}
	setText('')

}

	return(<div className={classes.root}>
		<form onSubmit={handleSubmit} noValidate>
		<TextareaAutosize className={classes.textfield}
		      rowsMax={4} value={text.text||''} name='text'
		      aria-label="maximum height" onChange={handleInputChange}
		      placeholder= {`Whats on Your Mind,${user.firstname} ?`}
		      
		/>
		<Button type='submit' variant="contained" color="primary" >
            Post</Button>
        </form>
	</div>)
}


function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

export default connect(mapStateToProps) (AddPost)