"use client";
import { userLoginState } from "@/types/userLogin.typs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState:userLoginState = {
    token: localStorage.getItem("tokenSocialApp"),
    user: null
}


export const Loginn = createAsyncThunk ('user/login', async (values:{email:string , password:string})=>{
    const options ={
        url:`https://linked-posts.routemisr.com/users/signin`,
        method:"POST",
        data :values
    }
    const {data} = await axios.request(options)
    return data
})
export const SignUp = createAsyncThunk ('user/SignUp', async (values:{email:string , password:string , name:string, rePassword:string, dateOfBirth:string, gender:string})=>{
    const options ={
        url:`https://linked-posts.routemisr.com/users/signup`,
        method:"POST",
        data :values
    }
    const {data} = await axios.request(options)
    return data
})
export const userData = createAsyncThunk ('user/userData', async ()=>{
    const options ={
        url:`https://linked-posts.routemisr.com/users/profile-data`,
        method:"GET",
        headers:{
            token: localStorage.getItem("tokenSocialApp")
        }
    }
    const {data} = await axios.request(options)
    return data
})

const userLoginSlice= createSlice({
    name:"userLogin",
    initialState,
    reducers:{},
    extraReducers:function(builder){
        builder.addCase(Loginn.fulfilled,(state,action)=>{
            state.token= action.payload.token;
            localStorage.setItem("tokenSocialApp",action.payload.token);
            Swal.fire({
                title: "Welcome Back",
                icon: "success",
                draggable: true
            });
            
        })
        builder.addCase(Loginn.rejected,()=>{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Incorrect email or password!",
            });
        })
    }
});
const userSignUpSlice= createSlice({
    name:"userSignUp",
    initialState,
    reducers:{},
    extraReducers:function(builder){
        builder.addCase(SignUp.fulfilled,(action)=>{
            if (action.payload.message === "success") {
               Swal.fire({
                title: "Account created",
                icon: "success",
                draggable: true
            }); 
            }
        })
            
        builder.addCase(SignUp.rejected,()=>{
           Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            });

        })
    }
});
const userDataSlice= createSlice({
    name:"userData",
    initialState,
    reducers:{},
    extraReducers:function(builder){
        builder.addCase(userData.fulfilled,(state,action)=>{
            state.user = action.payload.user;  
        })
            
        builder.addCase(userData.rejected,()=>{
        })
    }
});

export const userSignUpReducer = userSignUpSlice.reducer;
export const userLoginReducer = userLoginSlice.reducer;
export const userDataReducer = userDataSlice.reducer;

