/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { postsState } from "@/types/poste.typs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

 const initialState:postsState ={
    Posts: null,
    userPostt: null,
    singlePosts: null,
 };
 

export const getAllPost = createAsyncThunk ('postes/getAllPoste', async (_,{getState})=>{
    const state:any = getState()
    const token = state.userLoginReducer.token    
    const options ={
        url:`https://linked-posts.routemisr.com/posts?limit=50&page=40`,
        method:"GET",
        headers:{
            token
        }
    }
    const {data} = await axios.request(options)
    return data.posts
})
export const getSinglePost = createAsyncThunk ('postes/getSinglePost', async (id:string,{getState})=>{
    const state:any = getState()
    const token = state.userLoginReducer.token    
    const options ={
        url:`https://linked-posts.routemisr.com/posts/${id}`,
        method:"GET",
        headers:{
            token
        }
    }
    const {data} = await axios.request(options)
    return data.post
})
export const getUserPost = createAsyncThunk(
  'postes/getUserPost',
  async (id: string, { getState }) => {
    const state: any = getState();
    const token = state.userLoginReducer.token    
    const options = {
      url: `https://linked-posts.routemisr.com/users/${id}/posts`,
      method: "GET",
      headers: { token }
    };
      const {data} = await axios.request(options);
      console.log(data);
      
      return data;    
  }
);


const postSlice= createSlice({
    name:"allPosts",
    initialState,
    reducers:{},
    extraReducers:function(builder){
        builder.addCase(getAllPost.fulfilled,(state,action)=>{
            state.Posts = action.payload;
        })
        builder.addCase(getAllPost.rejected,()=>{
        })
        builder.addCase(getSinglePost.fulfilled,(state,action)=>{
            state.singlePosts = action.payload;
        })
        builder.addCase(getSinglePost.rejected,()=>{
        })
    }
});
const UserPosts= createSlice({
    name:"UserPosts",
    initialState,
    reducers:{},
    extraReducers:function(builder){
        builder.addCase(getUserPost.fulfilled,(state,action)=>{
            console.log("true in getU  serPosts:");
            console.log({state,action});
            state.userPostt = action.payload;
        })
         builder.addCase(getUserPost.rejected,(state,action)=>{
            console.log("Error in getU  serPosts:");
            console.log({state,action});
        })
    }
});

export const PostsReducer = postSlice.reducer;
export const userPostsReducer = UserPosts.reducer;


