import React,{useState} from 'react';
import useInput from './customhook/useInput'
import axios from 'axios'
import {NavLink} from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import NativeSelect from '@material-ui/core/NativeSelect';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color:'red'
  },
  
}));

const Signup=(props)=> {
  const classes = useStyles();
 

function validate (values,check) {
    let errors = {};
    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.password1) {
        errors.password1 = 'Password is required';
    } else if (values.password1.length < 8) {
        errors.password1 = 'Password must be 8 or more characters';
    }
    if (!values.password2) {
        errors.password2 = 'Please Reenter your Password';
    } else if (values.password2 !== values.password1) {
        errors.password2 = 'Password does not match';
    }
    if (!values.firstName) {
        errors.firstName = 'FirstName is required';
    } else if (values.firstName.length < 3) {
        errors.firstName = 'FirstName must be 3 or more characters';
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
    
    if (check.terms!==true ) {
       
        errors.terms = 'terms & condition must be apply is required';
    }

    return errors;
};



  const {handleSubmit,handleInputChange,
    inputs,handleCheck,errors,isSubmitting} = 
          useInput({firstName: '', lastName: '', email: '', password1: '',
                    password2: ''}, finalsubmit,validate);

const[successmsg,setSuccessmsg]= useState('Sign up')

 async function finalsubmit() {
        try{
          if(isSubmitting===true){
            const result = await axios.post("http://localhost:3006/users",inputs);
            console.log(result.data);
          }
        }
        catch(err){
        console.warn("Something went wrong fetching the API...", err);
      }
      
        setSuccessmsg('Your Registration successfully')
          setTimeout(()=>{
            props.history.goBack()
          },1000)
        
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        
        {successmsg==='Your Registration successfully'? 
        <Typography component="h1" variant="h5">
          {successmsg}
        </Typography>
        :(
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="off" name="firstName" variant="outlined"
                required fullWidth id="firstName" label="First Name"
                onChange={handleInputChange} value={inputs.firstName || ''} autoFocus
              />
              {errors.firstName && (<p className={classes.error}>{errors.firstName}</p>)}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined" required fullWidth id="lastName" label="Last Name"
                name="lastName" autoComplete="off" onChange={handleInputChange}
                value={inputs.lastName || ''}
              />
              {errors.lastName && (<p className={classes.error}>{errors.lastName}</p>)}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined" required fullWidth id="email" label="Email Address"
                name="email" autoComplete="off" onChange={handleInputChange}
                value={inputs.email || ''}
              />
              {errors.email && (<p className={classes.error}>{errors.email}</p>)}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined" required fullWidth name="password1" label="Password"
                type="password" id="password1" autoComplete="off"
                onChange={handleInputChange} value={inputs.password1 || ''}
              />
              {errors.password1 && (<p className={classes.error}>{errors.password1}</p>)}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined" required fullWidth name="password2" 
                label="Confirm Password" type="password" id="password2"
                autoComplete="off" onChange={handleInputChange}
                value={inputs.password2 || ''}
              />
              {errors.password2 && (<p className={classes.error}>{errors.password2}</p>)}
            </Grid>
            <Grid item xs={12} sm={6}>
            
              <NativeSelect id="select" onChange={handleInputChange} name="state">
                <option value="">Select your state</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Rajsthan">Rajsthan</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
              </NativeSelect>
              {errors.state && (<p className={classes.error}>{errors.state}</p>)}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="primary" name="terms"
                                   onChange={handleCheck} />}
                label="I want to receive inspiration, marketing promotions and updates 
                via email."
              />
              {errors.terms && (<p className={classes.error}>{errors.terms}</p>)}
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth variant="contained" color="primary" className={classes.submit} >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to='./login' variant="body2" style={{textDecoration:'none'}}>
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </form>)}

  </div>
      
    </Container>
  );
}

export default Signup