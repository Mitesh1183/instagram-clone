import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        posts: action.posts
      };
    case userConstants.GETALLUSER_SUCCESS:
      return {
        posts: action.posts
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.ADDPOST_REQUEST:
      return { 
        loading:true
      };
    case userConstants.ADDPOST_SUCCESS:
      return { 
        items: action.posts
      };
    case userConstants.ADDPOST_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.ADDCOMMENT_SUCCESS:
      return { 
        comments: action.comments
      };
    case userConstants.GETALLUSERS_SUCCESS:
      return {
        allusers: action.allusers
      };
    case userConstants.ADDCOMMENT_REQUEST:
      return {
        loading:true
      };
    case userConstants.DELETEPOST_SUCCESS:
      return{
        items:action.posts
      } 
    default:
      return state

  }
}
