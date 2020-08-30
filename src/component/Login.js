import React,{useState} from 'react';
import { connect } from 'react-redux';
import{ NavLink} from 'react-router-dom'
import { userActions } from '../_actions';


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

}));

function Login(props) {
  const classes = useStyles();
  const [input,setInput]=useState('')
  const [submitted,setSubmitted]=useState(false)
  
 
  const handleChange=(event)=> {
          event.persist();
    setInput(input => ({...input, [event.target.name]: event.target.value}));
  }

    const handleSubmit=(e)=> {
        e.preventDefault();
        console.log(input)
          
        setSubmitted(true);
        const { email, password } = input;
        const { dispatch } = props;
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }

    
    const { email, password} = input;
   
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined" margin="normal" required fullWidth
            id="email" name="email" value={input.email||''} onChange={handleChange}
            label="Email Address" autoComplete="email" autoFocus
          />
          {submitted && !email && <p>email is required</p> }
          <TextField
            variant="outlined" margin="normal" required fullWidth
            name="password" value={input.password||''} onChange={handleChange}
            label="Password" type="password" id="password" autoComplete="current-password"
          />
          {submitted && !password && <p>Password is required</p> }
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink to="#" variant="body2">
                Forgot password?
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to='/signup' variant="body2" style={{textDecoration:'none'}}>
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

export default connect(mapStateToProps)(Login)