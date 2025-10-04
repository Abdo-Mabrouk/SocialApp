'use client'
import { AppUseSelector } from "@/hooks/store.hook"
import { useEffect, useState } from "react"
import PostCard from "../PostCard/PostCard"
import PostCardSkeleton from "../skeleton/PostCardSkeleton"
import axios from "axios"
import Image from "next/image"
import Img from "@/img/noPost.png"

export default function UserPosts() {
  const userId = AppUseSelector((store)=> store.userDataReducer.user?._id)
  const token = AppUseSelector((store)=> store.userLoginReducer.token)
  interface Post {
  _id: string;
  content: string;
  image?: string;
  createdAt?: string;
  user?: {
    name: string;
    photo: string;
  };
}
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true) // يبدأ بـ true عشان يظهر Skeleton في الأول

  useEffect(() => {
    async function getUserPosts() {
      if (!userId || !token) return; // لو لسه مش متوفرين استنى
      setLoading(true) // أول ما يبدأ الطلب اعرض Skeleton
      try {
        const options = {
          url: `https://linked-posts.routemisr.com/users/${userId}/posts`,
          method: "GET",
          headers: { token }
        };
        const { data } = await axios.request(options);
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false)
      }
    }

    getUserPosts()
  }, [userId, token])

  return (
    <>
      {loading 
        ? <PostCardSkeleton/> 
        : posts.length > 0
          ? posts.map((post) => (
              <PostCard showAllComment={false} key={post._id} postInf={post} />
            ))
          : <div className="text-gray-400 text-center mt-10">
            <p className="text-black text-2xl font-bold text-center">No posts found</p>
            <Image alt="icon for No posts found" src={Img} width={300} height={300} className=" mx-auto"/>
          </div>
      }
    </>
  )
}
