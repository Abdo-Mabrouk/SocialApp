import { AppUseSelector } from "@/hooks/store.hook";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default function AddComment({id}:{id:string}) {
    const token = AppUseSelector((store)=>store.userLoginReducer.token);

  const schema = Yup.object({
          content: Yup.string()
          .required("Need to write a comment")
  });
  async function handelLogen(values:{content:string}) {

    const options ={
        url:`https://linked-posts.routemisr.com/comments`,
        method:"POST",
        headers:{
            token
        },
        data:{
            content: values.content,
            post:id
        }
    }
    const {data} = await axios.request(options)
    if (data.message ==='success') {
      Swal.fire({
      title: "Done",
      icon: "success",
      draggable: true
    });
    
    }
    
  }
  const formik = useFormik({
      initialValues: {
      content: "",
      },
      validationSchema: schema,
      onSubmit: handelLogen,
  });
  return (
    <div className="container pt-25">
      <div className="">
        <form onSubmit={formik.handleSubmit} className="p-4 border-2 border-gray-200 shadow-lg rounded-2xl w-full lg:w-[800px] mx-auto  flex items-center gap-5">
                <input
                  type="text"
                  name="content"
                  id="AddPost"
                  placeholder="Add Comment...."
                  className="form-control "
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                
                <button type="submit"  className="size-10.5 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-300 flex items-center justify-center">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
        </form>
        {formik.errors.content && formik.touched.content ? (
                    <p className="errr text-red-500 text-center font-medium">
                        * {formik.errors.content} *
                    </p>
                    ) : ""}
      </div>
          
    </div>
  )
}
