import { AppUseSelector } from "@/hooks/store.hook";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRef } from "react";
import Swal from "sweetalert2";

export default function AddPost() {

  const token = AppUseSelector((store)=>store.userLoginReducer.token);
  const postText = useRef<HTMLInputElement>(null)
  const postImg  = useRef<HTMLInputElement>(null)

  async function addPoste(){
    const text = postText.current?.value || "";
    const img = postImg.current?.files?.[0]; 

    const myFormData = new FormData()
    myFormData.append("body",text)
    if (img) {
      myFormData.append("image",img)
    }

    const options ={
        url:`https://linked-posts.routemisr.com/posts`,
        method:"POST",
        headers:{
            token
        },
        data:myFormData
    }
    const {data} = await axios.request(options)

    if (data.message === "success") {
      Swal.fire({
        title: "Created",
        icon: "success",
        draggable: true
      });      
    }
    }
  
  return (
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
          <button onClick={addPoste} className="btn">post</button>
        </div>
      </div>
    </div>
  );
}
