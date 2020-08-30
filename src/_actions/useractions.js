import { userConstants } from '../_constants';
import { userService } from '../_services';

function login(email, password) {
    return dispatch => {
        dispatch(request());

        userService.login(email, password)
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getAllUsers() {
    return dispatch => {
       
        userService.getAllUsers(dispatch)
            
    };

}

function addPost(text) {
    return dispatch => {
        dispatch(request());

        userService.addPost(text,dispatch)
           
    };

    function request() { return { type: userConstants.ADDPOST_REQUEST } }
}
function addComment(comment) {
    return dispatch => {
        dispatch(request());
        userService.addComment(comment,dispatch)
            
    };

     function request() { return { type: userConstants.ADDCOMMENT_REQUEST } }
}


function loadPosts() {
  return  (dispatch) => {
   
    userService.loadPosts(dispatch)
    /*.then(
        posts=> dispatch(success(posts))
        );
    
    function success(posts) { return { type: userConstants.GETALL_SUCCESS, posts } }*/
  };
};
function loadUserPosts(id) {
  return  (dispatch) => {
   
    userService.loadUserPosts(id,dispatch)
    /*.then(
        posts=> dispatch(success(posts))
        );
    
    function success(posts) { return { type: userConstants.GETALL_SUCCESS, posts } }*/
  };
};

function deletepost(id) {
  return  (dispatch) => {
   
    userService.deletepost(id,dispatch)
    /*.then(
        posts=> dispatch(success(posts))
        );
    
    function success(posts) { return { type: userConstants.GETALL_SUCCESS, posts } }*/
  };
};


export const userActions = {
    login,
    logout,loadUserPosts,
    getAllUsers,addPost,loadPosts,addComment,deletepost
};