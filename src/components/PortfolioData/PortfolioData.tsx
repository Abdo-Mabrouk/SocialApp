'use client'
import Image from "next/image";
import { AppUseDispatch, AppUseSelector } from "@/hooks/store.hook";
import { useEffect, useRef, useState } from "react";
import { userData } from "@/store/Slice/user.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCamera } from "@fortawesome/free-regular-svg-icons";
import { faCakeCandles, faImage, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PortfolioDataSkeleton from "../skeleton/PortfolioDataSkeleton";
import Swal from "sweetalert2";

export default function PortfolioData() {
  const [showModal, setShowModal] = useState(false);
  const token = AppUseSelector((store) => store.userLoginReducer.token);
  const dispach = AppUseDispatch();
  const profileData = AppUseSelector((store) => store.userDataReducer.user);
  const postImg = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispach(userData());
  }, []);

  async function addPoste() {
    const imgProfile = postImg.current?.files?.[0];
    const myFormData = new FormData();

    if (imgProfile) {
      myFormData.append("photo", imgProfile);
    }

    const options = {
      url: `https://linked-posts.routemisr.com/users/upload-photo`,
      method: "PUT",
      headers: { token },
      data: myFormData,
    };
    let data = await axios.request(options);
    console.log(data);
    if (data.data.message=== "success") {
      Swal.fire({
        title: "Image has been changed",
        icon: "success",
      });
    }
  }

  if (!profileData) {
    return <PortfolioDataSkeleton />;
  }

  return (
    <>
      <div className="container p-4 border-2 border-gray-200 shadow-lg rounded-2xl w-full space-y-4">
        <div className="imagg relative">
          <div className="bg-gray-200 h-50"></div>
          <div className="">
            <div className=" size-40  w-fit rounded-bl-4xl shadow-2xl rounded-tr-4xl outline-3 outline-black absolute top-30 start-4 overflow-hidden">
              <Image
                src={profileData?.photo}
                width={150}
                height={100}
                alt={profileData?.name}
                className="  object-contain "
              />
            </div>
            <div
              className="absolute top-45 start-38 "
              onClick={() => setShowModal(true)}
            >
              <div className="size-8 cursor-pointer text-white bg-black hover:text-black hover:bg-gray-200 transition-colors duration-300 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faCamera} className="" />
              </div>
            </div>
          </div>

          <h2 className="ps-45 mt-5 mb-5 text-2xl text-black font-medium">
            {profileData?.name}
          </h2>
          <p className="text-gray-400 pt-5 flex items-center gap-3 ">
            <span className="">
              <FontAwesomeIcon icon={faEnvelope} className="" />
            </span>
            {profileData?.email}
          </p>
          <p className="text-gray-400 pt-1 flex items-center gap-3 ">
            <span className="">
              <FontAwesomeIcon icon={faCakeCandles} className="" />
            </span>
            {profileData?.dateOfBirth}
          </p>
        </div>
      </div>

      {showModal && (
        <div className="fixed top-0 start-0 z-[100] w-full h-screen bg-black/80 flex items-center justify-center">
          <div className="flex flex-col items-center gap-5 w-[80%] lg:w-1/2">
            <div className="flex items-center justify-between gap-3  w-full">
              <input
                type="file"
                id="uploadImage"
                accept="image/*"
                className="hidden"
                ref={postImg}
              />
              <label
                htmlFor="uploadImage"
                className="cursor-pointer flex items-center justify-center gap-3"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 shadow">
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-blue-500 text-lg"
                  />
                </div>
                <span className="text-sm text-white">Upload image</span>
              </label>
              <button onClick={addPoste} className="btn">
                Update
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="btn absolute top-5 start-5"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
