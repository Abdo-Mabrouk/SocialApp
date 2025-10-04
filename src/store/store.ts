import { configureStore } from '@reduxjs/toolkit'
import { userDataReducer, userLoginReducer, userSignUpReducer } from './Slice/user.slice'
import { PostsReducer, userPostsReducer } from './Slice/Poste.slice';

export const myStore =  configureStore({
    reducer: {
      userLoginReducer,
      userSignUpReducer,
      userDataReducer,
      PostsReducer,
      userPostsReducer
    }
  });


  type AppStore = typeof myStore;

  export type AppGetState = ReturnType <AppStore["getState"]>

  export type AppDispatch = AppStore["dispatch"]
