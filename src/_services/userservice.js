import axios from 'axios'
import { userConstants } from '../_constants';
export const userService = {
    login,
    logout,deletepost,
    getAllUsers,addPost,loadPosts,addComment,loadUserPosts
};

async function login(email, password) {
    try{
        
    const response = await axios.get("http://localhost:3006/users")
       const users =response.data
        let filteredUsers = users.filter(user => {
        return user.email === email && user.password1 === password;
                    });
        if (filteredUsers.length) {
            let user = filteredUsers[0];
            console.log(user)
            if (user) {
              localStorage.setItem("user", JSON.stringify(user));
              console.log('success')
              }
            
          }else{
              console.log("Dose not match email id passs")
            }
      }
    catch(err){
        console.warn("Something went wrong fetching the API...", err);
      }
    
}

function logout() {
   
    localStorage.removeItem('user');
}

async function getAllUsers(dispatch) {
    try{
        const allusers = await axios.get("http://localhost:3006/users")
        .then(
                allusers => dispatch(success(allusers.data))
            );
      function success(allusers) { return { type: userConstants.GETALLUSERS_SUCCESS, allusers } }
    }catch(err){
        console.warn("Something went wrong fetching the API...", err);
      }
}

async function addPost(text,dispatch) {
    try{
        const result = await axios.post("http://localhost:3006/posts",text)
         .then(
                posts => dispatch(success(posts))
            );
    
    function success(posts) { return { type: userConstants.ADDPOST_SUCCESS, posts } }
    }catch(err){
        console.warn("Something went wrong fetching the API...", err);
      }
}

async function addComment(comment,dispatch) {
    try{
        const comments = await axios.post(`http://localhost:3006/comments`,comment)
        .then(
                comments => dispatch(success(comments))
            );
function success(comments) { return { type: userConstants.ADDCOMMENT_SUCCESS, comments } }
    }catch(err){
        console.warn("Something went wrong fetching the API...", err);
      }
}

async function loadPosts(dispatch){
  try {
      const posts = await axios.get('http://localhost:3006/posts')
      .then(
        posts=> dispatch(success(posts.data))
        );
    
    function success(posts) { return { type: userConstants.GETALL_SUCCESS, posts } }

    } catch (error) {
      console.log('error:', error);
    }
}

async function loadUserPosts(id,dispatch){
  try {
      const posts = await axios.get(`http://localhost:3006/posts?userID=${id}`)
      .then(
        posts=> dispatch(success(posts.data))
        );
    function success(posts) { return { type: userConstants.GETALLUSER_SUCCESS, posts } }

    } catch (error) {
      console.log('error:', error);
    }
}

async function deletepost(id,dispatch){
  try {
      const posts = await axios.delete(`http://localhost:3006/posts/${id}`)
      .then(
        posts=> dispatch(success(posts.data))
        );
    function success(posts) { return { type: userConstants.DELETEPOST_SUCCESS, posts } }

    } catch (error) {
      console.log('error:', error);
    }
}

