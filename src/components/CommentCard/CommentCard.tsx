import Image from "next/image";
import { Comment } from "@/types/poste.typs"
import avatar from "@/img/avatar.png";


export default function CommentCard({commentInf}:{commentInf:Comment}) {
  function handelPath(path:string) {
    if (path.includes("undefined")) return avatar
    else return path
  }
  return (
  <div className=" space-y-5 ">
        <div className=" Comment rounded-2xl border-2 border-gray-200 shadow-lg   space-y-2 w-full lg:w-[800px] mx-auto p-4">
          <div className="Comment-data-user flex items-center justify-between ">
            <div className="flex items-center gap-4">
              <Image src={handelPath(commentInf.commentCreator.photo)} width={50} height={50} alt={`${commentInf.commentCreator.name} profile photo`} className=" size-12 rounded-bl-lg rounded-tr-lg" />
              <div className="flex items-center gap-2">
                <h2 className="name font-semibold ">{commentInf.commentCreator.name} </h2>
                <p className="text-gray-400 text-sm">{new Date(commentInf.createdAt).toLocaleString('en-US', { day: 'numeric' }) } day </p>
              </div>
            </div>
          </div>
          <div className="Comment-contant space-y-5 ps-15">
            <p> {commentInf.content} </p>
          </div>
        </div>
  </div>
  )
}
