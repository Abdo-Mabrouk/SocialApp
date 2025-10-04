'use client'
import AddPost from "@/components/AddPost/AddPost";
import Navbar from "@/components/Navbar/Navbar";
import PostCard from "@/components/PostCard/PostCard";
import SaidBar2 from "@/components/SaidBar2/SaidBar2";
import SaidBar from "@/components/SideBar/SaidBar";
import PostCardSkeleton from "@/components/skeleton/PostCardSkeleton";
import { AppUseDispatch, AppUseSelector } from "@/hooks/store.hook";
import { getAllPost } from "@/store/Slice/Poste.slice";
import { useEffect } from "react";

export default function Home() {

  const dispach = AppUseDispatch()
  const postes = AppUseSelector((store)=> store.PostsReducer.Posts)

  useEffect(()=>{
    dispach (getAllPost())
  })
  

  return (
    <>
      <Navbar/>
      <SaidBar/>
      <SaidBar2/>
      <AddPost/>
      {postes? postes.map((post)=><PostCard showAllComment={false} key={post._id} postInf={post} />):<PostCardSkeleton/>}
    </>
  );
}
