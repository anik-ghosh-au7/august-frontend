import { v4 as uuid } from "uuid";

export const CREATE_POST = "@@post/create";
export const DELETE_POST = "@@post/delete";
export const ADD_COMMENT = "@@post/comment";
export const LIKE_POST = "@@post/like";

const postModel = {
  id: uuid(),
  title: "",
  comments: [],
  liked: false,
};

const initialState = [];

const postReducer = function (state, action) {
  state = state || initialState;

  switch (action.type) {
    case CREATE_POST:
      const post = { ...postModel, title: action.payload, id: uuid() };
      return [...state, post];
    case DELETE_POST:
      const posts = state.filter((post) => post.id !== action.payload);
      return posts;
    case ADD_COMMENT:
      let post_idx = state.findIndex((post) => post.id === action.payload.id);
      state[post_idx] = {
        ...state[post_idx],
        comments: [...state[post_idx]["comments"], action.payload.comment_body],
      };
      console.log("reducer", state);
      return state;
    case LIKE_POST:
      let post_list = state.map((post) => {
        if (post.id === action.payload) {
          return {
            ...post,
            liked: !post.liked,
          };
        }
        return post;
      });
      return post_list;
    default:
      return state;
  }
};

export default postReducer;
