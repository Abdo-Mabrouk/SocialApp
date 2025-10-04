'use client'

import AddComment from "@/components/AddComment/AddComment";
import Navbar from "@/components/Navbar/Navbar";
import PostCard from "@/components/PostCard/PostCard";
import SaidBar2 from "@/components/SaidBar2/SaidBar2";
import SaidBar from "@/components/SideBar/SaidBar";
import PostCardSkeleton from "@/components/skeleton/PostCardSkeleton";
import { AppUseDispatch, AppUseSelector } from "@/hooks/store.hook";
import { getSinglePost } from "@/store/Slice/Poste.slice";
import { use, useEffect } from "react"


export default function Page({params}:{params:Promise<{postId:string}>}) {
    const {postId}= use(params);
    const disptch = AppUseDispatch()
    const post = AppUseSelector((store)=> store.PostsReducer.singlePosts)
    
    useEffect(()=>{
        disptch (getSinglePost(postId))
      })
  return (
    <>
        <Navbar/>
        <SaidBar/>
        <SaidBar2/>
        <AddComment id={postId} />
        { post ? <PostCard postInf={post} showAllComment={true} />:<PostCardSkeleton/>}
    </>
  )
}
