'use client'
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { AppUseDispatch } from "@/hooks/store.hook";
import { SignUp } from "@/store/Slice/user.slice";
import { useRouter } from "next/navigation";




export default function SinUpForm( ) {
    const dispatch = AppUseDispatch()
    const navget = useRouter()
    

    const passwordRegex =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    const nameRegex = /^[A-ZÀ-ÖØ-Ýa-zà-öø-ÿ\u0621-\u064A]+(?:[ '\-][A-ZÀ-ÖØ-Ýa-zà-öø-ÿ\u0621-\u064A]+)*$/;
    const dateOfBirthRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})*$/;

    const schema = Yup.object({
    name: Yup.string()
        .required("Name is riquired")
        .matches(nameRegex,"Invalid name: Use only Arabic or English letters, spaces, hyphens (-), or apostrophes (')."),
    email: Yup.string()
        .required("email is riquired")
        .email("eneten a valid email"),
    password: Yup.string()
        .required("password is riquired")
        .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
    ),
    rePassword: Yup.string()
        .required("confirm Password is riquired")
        .oneOf([Yup.ref("password")], "rePassword must be the same as password"),

    dateOfBirth: Yup.string()
    .required("date Of Birth is riquired")
    .matches(
        dateOfBirthRegex,
        "Matches a date in the format dd/mm/yyyy , dd-mm-yyyy or dd.mm.yyyy"
    ),
    gender: Yup.string()
    .required("gender is riquired"),

});

function handelSignUp(value) {
    dispatch(SignUp(value)) .then((res)=>{
            if (res.payload.message === "success") {
                setTimeout(()=>{
                    navget.push("/login")
                },2000)
            }
        })
}
let formik = useFormik({
    initialValues: {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        dateOfBirth:"",
        gender:"",
    },
    validationSchema: schema,
    onSubmit: handelSignUp,
});

return (
    <div div className=" bg-white dark:bg-gray-800 w-full lg:w-[600px] my-5 rounded-2xl ">
        <div className="  space-y-5  p-7 ">
            <div className="text-center">
                <h1 className="text-3xl mb-5 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> SocialApp</h1>
                <p>Create your account</p>
                <p className="text-gray-400">Join thousands of users sharing their thoughts</p>
            </div>
            <form action="" className="w-full space-y-3" onSubmit={formik.handleSubmit}>
                <div className="name">
                    <label htmlFor="name" className="label">Full Name</label>
                    <input
                        type="text"
                        className="form-control dark:placeholder:text-gray-400"
                        placeholder="your name"
                        name="name"
                        id="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <p className="errr text-red-800  font-medium">
                        * {formik.errors.name}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="email">
                    <label htmlFor="email" className="label">email </label>
                    <input
                        type="email"
                        className="form-control dark:placeholder:text-gray-400"
                        placeholder="your email"
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <p className="errr text-red-800  font-medium">
                        * {formik.errors.email}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="password">
                    <label htmlFor="password" className="label">password</label>
                    <input
                        type="password"
                        className="form-control dark:placeholder:text-gray-400"
                        placeholder="your password"
                        name="password"
                        id="password"
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
                <div className="rePassword">
                    <label htmlFor="rePassword" className="label">confirm password </label>
                    <input
                        type="password"
                        className="form-control dark:placeholder:text-gray-400"
                        placeholder="your rePassword"
                        name="rePassword"
                        id="rePassword"
                        value={formik.values.rePassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.rePassword && formik.touched.rePassword ? (
                        <p className="errr text-red-800  font-medium">
                        * {formik.errors.rePassword}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="dateOfBirth">
                    <label htmlFor="dateOfBirth" className="label">date Of Birth </label>
                    <input
                        type="text"
                        className="form-control dark:placeholder:text-gray-400"
                        placeholder="your dateOfBirth"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formik.values.dateOfBirth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? (
                        <p className="errr text-red-800  font-medium">
                        * {formik.errors.dateOfBirth}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="gender">
                    <label htmlFor="gender" className="label">gender </label>
                    <div className="flex items-center gap-6">
                        <label className="label flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            className="accent-blue-500"
                            id="gender"
                            checked={formik.values.gender === "male"} // ✅ تحقق من القيمة المختارة
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        Male
                        </label>
                        <label className="label flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            className="accent-pink-500"
                            id="gender"
                            checked={formik.values.gender === "female"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        Female
                        </label>
                    </div>
                    {formik.errors.gender && formik.touched.gender ? (
                        <p className="errr text-red-800  font-medium">
                        * {formik.errors.gender}
                        </p>
                    ) : (
                        ""
                    )}
                </div>

                <button type="Submit"className="btn w-full bg-black border-black">create account</button>
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
                    <Link className="ms-3" href="/login">
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    </div>
);
}
