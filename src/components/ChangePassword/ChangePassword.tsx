'use client';

import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AppUseSelector } from "@/hooks/store.hook";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface ChangePasswordValues {
  password: string;
  newPassword: string;
}

export default function ChangePassword() {
  const token = AppUseSelector((store) => store.userLoginReducer.token);
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const router = useRouter();

  const schema = Yup.object({
    password: Yup.string().required("Password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
  });

  async function handleChangePassword(
    values: ChangePasswordValues,
    { resetForm }: FormikHelpers<ChangePasswordValues>
  ) {
    const options = {
      url: "https://linked-posts.routemisr.com/users/change-password",
      method: "PATCH",
      headers: { token },
      data: {
        password: values.password,
        newPassword: values.newPassword,
      },
    };

    try {
      const { data } = await axios.request(options);

      if (data.message === "success") {
        localStorage.removeItem("tokenSocialApp");
        Swal.fire({
          title: "The password has been changed",
          icon: "success",
        });
        resetForm();
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Incorrect password",
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data?.error || "Server error",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Unexpected error",
          text: "Something went wrong",
        });
      }
    }
  }

  const formik = useFormik<ChangePasswordValues>({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema: schema,
    onSubmit: handleChangePassword,
  });

  return (
    <div className="w-full lg:w-[800px] mx-auto space-y-5">
      <div className="flex justify-center items-center w-[80%] h-screen mx-auto">
        <fieldset className="w-full border-2 border-gray-200 p-5 rounded-lg shadow-2xl">
          <legend className="bg-gray-200 py-1.5 px-3 rounded-md">
            Change Password
          </legend>
          <form className="space-y-10" onSubmit={formik.handleSubmit}>
            <div className="password">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="errr text-red-800 font-medium">
                  * {formik.errors.password}
                </p>
              )}
            </div>

            <div className="newPassword">
              <label htmlFor="newPassword" className="label">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className="form-control"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <p className="errr text-red-800 font-medium">
                  * {formik.errors.newPassword}
                </p>
              )}
            </div>

            <button type="submit" className="btn mx-auto block">
              Update Password
            </button>
          </form>
        </fieldset>
      </div>
    </div>
  );
}
