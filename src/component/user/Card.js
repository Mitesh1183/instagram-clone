import React,{useEffect,useState} from 'react';
import avtar from './img/avtar.jpg'
import AddPost from './AddPost'
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '70%',
    marginTop: '30px',

    margin:'auto'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
   paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const Cards=(props)=>{
  const {user,posts} = props

	const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [comment,setComment]=useState({})
  const[currentPost,setCurrentPost]= useState('')
  const handleExpandClick = (id,e) => {
   
    setCurrentPost(id)
    setExpanded(true)
  }
const handleInputChange=(e)=>{
 
  e.preventDefault()
  setComment({comment: e.target.value,userID:user.id,postID:currentPost})
  
}
const handleSubmit=(e)=>{
  e.preventDefault()
  const { dispatch } = props;
  
  if(comment!==''){
    const postid= currentPost
    
    dispatch(userActions.addComment(comment,postid))
  }
}

const [like,setLike]=useState(false)
const [likes,setLikes] =useState('')
const handleLike=(id)=>{
  setLike(!like)
  if(like===true){
    console.log(likes,id)
  }
}

useEffect(() => {
    props.dispatch(userActions.loadPosts())
    getAllUsers()
 }, []);


const[allusers,setAllusers]=useState('')
async function getAllUsers() {
    try{
        const allusers = await axios.get("http://localhost:3006/users")
        setAllusers(allusers.data)
   }catch(err){
        console.warn("Something went wrong fetching the API...", err);
      }
}



  return (
    <div>
    <AddPost/>
    {posts && posts.map((post)=>

    <Card className={classes.root} key={post.id}>
    {allusers && allusers.map((user,id)=> user.id===post.userID?
      <div key={post.id}>
      
      <CardHeader key={id}
        avatar={
          <Avatar alt="Cindy Baker" src={avtar} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user.firstName} 
        subheader={post.date +" "+ post.time}
      />
      <CardMedia
        className={classes.media}
        image={avtar}
        title="Post"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.text}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing >
      <p style={{marginRight:'10px'}}>Likes : {post.likes}</p>
       <Button style={{cursor: 'pointer'}} onClick={()=>handleLike(post.id)}> Like </Button>
        
        <Button value='show' onClick={()=>handleExpandClick(post.id)} style={{cursor: 'pointer'}}>Comments</Button>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    
      <Collapse in={post.id===currentPost? expanded:null} timeout="auto" unmountOnExit>
        <CardContent>
        <form onSubmit={handleSubmit}> 
          <Typography paragraph>Comments:</Typography>
          
          <TextField
           name='comment' value={comment.comment||''}
           onChange={handleInputChange}
          style={{ margin: 8,width:'50%' }}
          placeholder="Enter your Comment"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          />
          <Button  style={{marginTop:'10px'}} type='submit' variant="contained" color="primary" >
            Comment</Button>
            </form>
        </CardContent>
      </Collapse></div>:null)}
    </Card>)}
    </div>
  );
}


function mapStateToProps(state) {
    const { users, authentication } = state;
    const { posts } = users;
    const {user} = authentication
    return {
       posts,users,
        user
    };
}


export default connect(mapStateToProps) (Cards)