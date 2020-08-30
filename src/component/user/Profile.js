import React,{useState,useEffect} from 'react'
import avtar from './img/avtar.jpg'
import { connect } from 'react-redux';
import useInput from '../customhook/useInput'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import ProfilePhotoUpload from'./ProfilePhotoUpload'
import Leftnavbar from'./Leftnavbar';
import Header from './Header';


import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 700,
  },
  image: {
    width: 'auto',
    height:200,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  tdata: {
  padding: "5px",
  textAlign: 'left',
},
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
  },
}));

const Profile=(props)=>{
	 const classes = useStyles();
const { user } = props;

const [edit,setEdit] = useState(false)
const editing=()=>{
	setEdit(true)
	console.log(edit)
}
const handleCancel=()=>{
	setEdit(false)
}

function validate (values,check) {
    let errors = {};
    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    /*if (!values.password1) {
        errors.password1 = 'Password is required';
    } else if (values.password1.length < 8) {
        errors.password1 = 'Password must be 8 or more characters';
    }
    if (!values.password2) {
        errors.password2 = 'Please Reenter your Password';
    } else if (values.password2 !== values.password1) {
        errors.password2 = 'Password does not match';
    }*/
    if (!values.firstName) {
        errors.firstName = 'FirstName is required';
    } else if (values.firstName.length < 3) {
        errors.firstnname = 'FirstName must be 3 or more characters';
    }
     if (!values.lastName) {
        errors.lastName = 'lastName is required';
    } else if (values.lastName.length < 3) {
        errors.lastName = 'lastName must be 3 or more characters';
    }
     /*if (!values.phone) {
        errors.phone = 'Mobile number is required';
    }else if ( ! /^([0-9])/.test(values.phone) ) {
        errors.phone = 'Enter your valid Mobile number';
    }
     else if (values.phone.length < 10) {
        errors.phone = 'Mobile must be 10 or more number';
    }
     if (!values.city) {
        errors.city = 'city is required';
    } else if (values.city.length < 3) {
        errors.city = 'city must be 3 or more characters';
    }
    if (!values.gender) {
        errors.gender = 'please select your gender';
    } */
    
    if (!values.state) {
        errors.state = 'state is required';
    } 
    
    /*if (check.terms!==true ) {
       
        errors.terms = 'terms & condition must be apply is required';
    }*/

    return errors;
};


const {handleSubmit,handleInputChange,setInputs,
    inputs} = 
          useInput({firstName: '', lastName: '', email: '',phone:''
          	,gender:'',state:'',city:''}, finalsubmit,validate);

useEffect(() => {
    loadUser();
    
  }, []);

const loadUser = async () => {
    if(user.id!==undefined){
       const result = await axios.get(`http://localhost:3006/users/${user.id}`);
              setInputs(result.data);
              console.log(user.id)
          }
   };

async function finalsubmit(event) {
	
		console.log('No errors, submit callback called!');
        await axios.put(`http://localhost:3006/users/${user.id}`, inputs);
	
     }

	return(
		<div>
		<CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        
          <Header/>
        
      </AppBar>
      <Leftnavbar/>
      <main className={classes.content}>
		<Container maxWidth="xl" >
		 <div className={classes.root}>
      	<Paper className={classes.paper}>
        <Grid container spacing={2}>

          <Grid item xs={3} >
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={avtar} />
            </ButtonBase>
            <ProfilePhotoUpload id={user.id}/>
          </Grid>

          <Grid item xs={9}  sm container>
          <form onSubmit={handleSubmit} noValidate>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
              
				<table style={{width:"100%"}}>
				<tbody>
				  <tr>
				    <th className={classes.tdata}> First Name :</th>
				    <td className={classes.tdata}>
				    { edit ? 
				    	<input value={inputs.firstName||''} 
				    		name="firstName"
				    		onChange={handleInputChange} /> 
				    : <span>{inputs.firstName}</span> }
				    </td>
				  </tr>
				  <tr>
				    <th className={classes.tdata}>Last Name :</th>
				    <td className={classes.tdata}>
				    { edit ? 
				    	<input value={inputs.lastName||''}
				    		name="lastName"
				    	 	onChange={handleInputChange} /> 
				    : <span>{inputs.lastName}</span> }
				    </td>
				  </tr>
				  <tr>
				    <th className={classes.tdata}>Mobile Number :</th>
				    <td className={classes.tdata}>
				    { edit ? 
				    	<input value={inputs.phone||''}
				    		name="phone"
				    		onChange={handleInputChange} /> 
				    : <span>{inputs.phone}</span> }
				    </td>
				  </tr>
				  <tr>
				    <th className={classes.tdata}>Email Id :</th>
				    <td className={classes.tdata}>
				    { edit ? 
				    	<input value={inputs.email||''} 
				    		name="email"
				    		onChange={handleInputChange} /> 
				    : <span>{inputs.email}</span> }
				    </td>
				  </tr>
				  <tr>
				    <th className={classes.tdata}>Gender :</th>
				    <td className={classes.tdata}>
				    { edit ? 
				    	<input value={inputs.gender||''} 
				    		name="gender"
				    		onChange={handleInputChange} /> 
				    : <span>{inputs.gender}</span> }
				    </td>
				  </tr>
				  <tr>
				    <th className={classes.tdata}>State :</th>
				    <td className={classes.tdata}>
				    { edit ? 
				    	<input value={inputs.state||''} 
				    		name="state"
				    		onChange={handleInputChange} /> 
				    : <span>{inputs.state}</span> }
				    </td>
				  </tr>
				  <tr>
				    <th className={classes.tdata}>City :</th>
				    <td className={classes.tdata}>
				    { edit ? 
				    	<input value={inputs.city||''} 
				    		name="city"
				    		onChange={handleInputChange} /> 
				    : <span>{inputs.city}</span> }
				    </td>
				  </tr>
				  </tbody>
				</table>

			</Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              {edit?<Button style={{marginBottom:'10px'}} variant="contained" 
              			color="secondary" onClick={handleCancel} >Cancel</Button>:null}
            </Grid>
            <Grid item>
           
            <Button type='submit' variant="contained" color="primary" onClick={edit?handleCancel:editing}>
            {edit?"Done":'Edit Details'}</Button>

            </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
		</Container></main>
		</div>

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

export default connect(mapStateToProps) (Profile)