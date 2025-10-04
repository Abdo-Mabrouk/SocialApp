
'use client'
import { Post } from "@/types/poste.typs"
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons"
import { faArrowUpFromBracket, faEllipsisVertical, faImage, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import CommentCard from "../CommentCard/CommentCard"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AppUseSelector } from "@/hooks/store.hook"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import Swal from "sweetalert2"
export default function PostCard({postInf,showAllComment=false}:{postInf:Post,showAllComment:boolean}) {
  const token = AppUseSelector((store)=>store.userLoginReducer.token);
  const postText = useRef<HTMLInputElement>(null)
  const postImg  = useRef<HTMLInputElement>(null)
  const [showModal, setShowModal] = useState(false);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [randomNumbersh, setRandomNumbersh] = useState<number | null>(null);
   const [increase, setIncrease] = useState<boolean>(true); 

  useEffect(()=>{
      const number = Math.floor(Math.random() * 200) + 1;
      const numbersh = Math.floor(Math.random() * 200) + 1;
      setRandomNumber(number);
      setRandomNumbersh(numbersh);
  },[])
    const handleClick = () => {
    if (increase) {
      setRandomNumber((prev) => prev + 1);
    } else {
      setRandomNumber((prev) => prev - 1);
    }
    setIncrease((prev) => !prev); // ← نبدّل بين الزيادة والنقصان
  };

  
  
  async function deletPost(id:string) {
    const options = {
          url: `https://linked-posts.routemisr.com/posts/${id}`,
          method: "DELETE",
          headers: { token }
        };
    let {data} = await axios.request(options)
    console.log(data);
    

  }
  async function updatePoste(id:string){
    const text = postText.current?.value || "";
    const img = postImg.current?.files?.[0]; 

    const myFormData = new FormData()
    myFormData.append("body",text)
    if (img) {
      myFormData.append("image",img)
    }

    const options ={
        url:`https://linked-posts.routemisr.com/posts/${id}`,
        method:"PUT",
        headers:{
            token
        },
        data:myFormData
    }
    let {data} = await axios.request(options)
    console.log(data);
    

    if (data.message === "success") {
      Swal.fire({
        title: "updated",
        icon: "success",
        draggable: true
      });      
    }
    }

  return (
    <>
      <div className=" container pt-15 space-y-5">
      <div className=" post p-4 border-2 border-gray-200 shadow-lg rounded-2xl w-full lg:w-[800px] mx-auto space-y-3">
        <div className="post-data-user flex items-center justify-between ">
          <div className="flex items-center gap-4">
            <Image src={postInf.user.photo} width={50} height={50} alt={`${postInf.user.name} profile photo`} className=" size-12 rounded-bl-lg rounded-tr-lg" />
            <div className="">
              <h2 className="name font-semibold">{postInf.user.name} </h2>
              <p className="text-gray-400">{new Date(postInf.createdAt).toLocaleString('en-US', {
  dateStyle: 'medium', 
  timeStyle: 'short'
})} </p>
            </div>
          </div>
          <div className="size-8 rounded-lg hover:bg-gray-200 *:cursor-pointer transition-colors duration-300 flex items-center justify-center relative">
            <DropdownMenu>
            <DropdownMenuTrigger><FontAwesomeIcon icon={faEllipsisVertical} /></DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-200 border-transparent absolute end-4 -top-13 *:hover:bg-white *:cursor-pointer">
              <DropdownMenuItem onClick={() => {deletPost(postInf._id);}}>delete post</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowModal(true)}>update post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
        <div className="post-contant space-y-5 ps-15">
          <p> {postInf.body} </p>
          {postInf.image && <Image src={postInf.image} width={100}  height={194} alt="post image" className=" w-full h-[300px] object-fill rounded-2xl"/>}
        </div>
        <div className="post-icon  flex items-center justify-around border-t-2 border-gray-200 pt-1 ">
          <Link href={`/post/${postInf.id}`}>
            <div className="icon-Comment flex items-center gap-3 cursor-pointer w-fit p-1.5 rounded-md text-gray-400 transition-colors duration-300 hover:bg-gray-200 hover:text-blue-700">
              <FontAwesomeIcon icon={faComment} className="size-3"/>
              <span className=" block"> {postInf.comments.length} </span>
            </div>
          </Link>
          <div onClick={handleClick} className="icon-Heart flex items-center gap-3 cursor-pointer w-fit p-1.5 rounded-md text-gray-400 transition-colors duration-300 hover:bg-gray-200 hover:text-red-600">
            <FontAwesomeIcon icon={faHeart} className="size-3"/>
            <span className=" block">{randomNumber}</span>
          </div>
          <div className="icon-Share flex items-center gap-3 cursor-pointer w-fit p-1.5 rounded-md text-gray-400 transition-colors duration-300 hover:bg-gray-200 hover:text-green-600">
            <FontAwesomeIcon icon={faArrowUpFromBracket} className="size-3"/>
            <span className=" block">{randomNumbersh}</span>
          </div>

        </div>
      </div>
      {postInf.comments.length > 1 && showAllComment && postInf.comments.map((comment)=> <CommentCard key={comment._id} commentInf ={comment} />)}
    </div>
        {showModal && (
                <div className="fixed top-0 start-0 z-[100] w-full h-screen bg-black/90 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-5 w-[80%] lg:w-1/2">
                    <div className="container pt-25">
                          <div className="p-4 border-2 border-gray-200 shadow-lg rounded-2xl w-full lg:w-[800px] mx-auto space-y-4">
                            <input
                              type="text"
                              name="AddPost"
                              id="AddPost"
                              placeholder="What is happening....?"
                              className="form-control py-7 "
                              ref={postText}
                            />
                    
                            <div className="relative flex items-center  justify-between">
                              <div className="flex items-center gap-3">
                              <input
                                type="file"
                                id="uploadImage"
                                accept="image/*"
                                className="hidden"
                                ref={postImg}
                              />
                              <label
                                htmlFor="uploadImage"
                                className="cursor-pointer flex items-center justify-center gap-3 "
                              >
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 shadow">
                                  <FontAwesomeIcon icon={faImage} className="text-blue-500 text-lg" />
                                </div>
                                <span className="text-sm text-gray-500">Upload image</span>
                    
                              </label>
                              </div>
                              <button  onClick={() => {updatePoste(postInf._id);}} className="btn">update post</button>
                            </div>
                          </div>
                        </div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="btn bg-gray-200 text-black absolute top-5 start-5"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                </div>
        )}
    </>
  )
}
