'use client'
import Link from "next/link"
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
    import {
    faEye,
    faEyeSlash,
    } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Loginn } from "@/store/Slice/user.slice";
import { AppUseDispatch } from "@/hooks/store.hook";
import { useRouter } from "next/navigation";


export function LoginForm() {
    const dispatch = AppUseDispatch()
    const navget = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const passwordRegex =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  
    const schema = Yup.object({
        email: Yup.string()
        .required("email is riquired")
        .email("eneten a valid email"),
        password: Yup.string()
        .required("password is riquired")
        .matches(
            passwordRegex,
            "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
        ),
    });
    function handelLogen(values) {
        dispatch(Loginn(values)).then((res)=>{
            if (res.payload.message === "success") {
                setTimeout(()=>{
                    navget.push("/")
                },2000)
            }
        })
    }
    let formik = useFormik({
        initialValues: {
        email: "",
        password: "",
        },
        validationSchema: schema,
        onSubmit: handelLogen,
    });
    return (
<>
    <div className="space-y-5 bg-white p-7 w-full lg:w-[600px] rounded-2xl">
    <div className="text-center">
        <h1 className="text-3xl mb-5 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> SocialApp</h1>
        <p>Welcome Back!</p>
        <p className="text-gray-400">Sign in to your account to continue</p>
    </div>
    <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <div className="email">
            <label htmlFor="email" className="label">Email Address*</label>
            <input
            className="form-control"
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
            <p className="errr bg-red-200 text-red-800 p-2 rounded-md mt-5 font-medium">
                * {formik.errors.email}
            </p>
            ) : (
            ""
            )}
        </div>
        <div className="password">
            <div className=" relative">
            <div className="flex justify-between items-center">
                <label htmlFor="password" className="label">Password*</label>
                <label htmlFor="ForgotPassword" className="label">
                <Link
                    className="text-green-600 ms-2"
                    href="#"
                >
                    Forgot Password?
                </Link>
                </label>
            </div>
            <div className="relative">
                <input
                className="form-control pr-10"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-3  cursor-pointer text-gray-500"
                >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
            </div>
            </div>
            {formik.errors.password && formik.touched.password ? (
            <p className="errr bg-red-200 text-red-800 p-2 rounded-md mt-5 font-medium">
                * {formik.errors.password}
            </p>
            ) : null}
        </div>
        <div className="rememberMe">
            <input
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
            className="mx-2"
            value={formik.values.rememberMe}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            <label htmlFor="rememberMe">Keep me signed in</label>
        </div>
        <button type="submit" className="btn w-full">Sign In </button>
        <div className="or relative w-full h-0.5 bg-gray-300/30 my-5">
                            <span className="absolute start-1/2 top-1/2 -translate-1/2 bg-white px-3 p-2 rounded-full">
                                or continue with
                            </span>
                        </div>
                        <div className="button flex gap-5 *:cursor-pointer *:hover:bg-gray-200 *:flex *:justify-center *:items-center *:w-full *:gap-2">
                                    <button className="btn space-x-2 bg-white border-2 border-gray-200 ">
                                        <FontAwesomeIcon icon={faGoogle} className="text-red-600" />
                                        <span className="text-black text-lg">Google</span>
                                    </button>
                                    <button className="btn space-x-2 bg-white border-2 border-gray-200">
                                        <FontAwesomeIcon icon={faFacebook} className="text-blue-600" />
                                        <span className="text-black text-lg">Facebook</span>
                                    </button>
                        </div>
                        <p className="text-center font-semibold">
                            Already have an account?
                            <Link className="ms-3" href="/sinUp">
                                Sign up
                            </Link>
                        </p>
    </form>
    </div>
</>
    )
}
