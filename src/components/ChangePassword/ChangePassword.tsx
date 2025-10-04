'use client'
import { useFormik } from "formik";
import * as Yup from "yup";
import {  AppUseSelector } from "@/hooks/store.hook";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
    const token = AppUseSelector((store) => store.userLoginReducer.token);
    const passwordRegex =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    const router = useRouter()
    

    const schema = Yup.object({
    password: Yup.string()
        .required("password is riquired"),
    newPassword: Yup.string()
        .required("new Password is riquired")
        .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
    ),
    });

    async function handleChangePassword(
  value: { newPassword: string; password: string },
  { resetForm }: any
) {
  const options = {
    url: "https://linked-posts.routemisr.com/users/change-password",
    method: "PATCH",
    headers: { token },
    data: {
      password: value.password,
      newPassword: value.newPassword,
    },
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);

    if (data.message === "success") {
      localStorage.removeItem("tokenSocialApp")
      Swal.fire({
        title: "The password has been changed",
        icon: "success",
      });
      resetForm();
      setTimeout(()=>{
                    router.push("/login")
                },2000)
      
    } else {
      Swal.fire({
        icon: "error",
        title: "Opps......",
        text: "incorrect password" ,
      });
    }
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response?.data?.error || "Server error",
    });
  }
}

    let formik = useFormik({
        initialValues: {
            password: "",
            newPassword: "",
        },
        validationSchema: schema,
        onSubmit: handleChangePassword,
    });

  return (
    <>
    <div className="w-full lg:w-[800px] mx-auto space-y-5  ">
        <div className="flex justify-center items-center w-[80%] h-screen  mx-auto ">
            <fieldset className=" w-full border-2 border-gray-200 p-5 rounded-lg shadow-2xl">
                <legend className="bg-gray-200 py-1.5 px-3 rounded-md">Change Password</legend>
                <form action="" className="space-y-10" onSubmit={formik.handleSubmit}>
                <div className="password">
                    <label htmlFor="password" className="label">password</label>
                    <input
                        type="text" 
                        name="password" 
                        id="password" 
                        className="form-control"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.password && formik.touched.password ? (
                        <p className="errr text-red-800  font-medium">
                        * {formik.errors.password}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="newPassword">
                    <label htmlFor="newPassword" className="label">newPassword</label>
                    <input
                        type="text" 
                        name="newPassword" 
                        id="newPassword" 
                        className="form-control"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.newPassword && formik.touched.newPassword ? (
                        <p className="errr text-red-800  font-medium">
                        * {formik.errors.newPassword}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <button type="submit" className="btn mx-auto block">uodate password</button>
            </form>
            </fieldset>
            
        </div>

    </div>
    </>
  )
}
