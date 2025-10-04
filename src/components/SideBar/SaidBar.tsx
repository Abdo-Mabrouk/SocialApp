"use client"
import { faHouse,faUser } from "@fortawesome/free-regular-svg-icons"
import {  faPlus, faRightFromBracket, faSliders, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useState } from "react"
import AddPost from "../AddPost/AddPost"

export default function SaidBar() {
    const pathname = usePathname();
    const [showModal, setShowModal] = useState(false);
    
  return (
    <>
    <div className="fixed start-5 w-60 p-5 h-screen hidden lg:flex flex-col justify-center">
        <div className="  ">
            <ul className=" space-y-4">
                <Link href={`/home`} className="block" ><li className={ pathname === "/" ? "flex items-center gap-3 text-md font-semibold p-3 rounded-2xl bg-gray-200 transition-colors duration-300" :"flex items-center gap-3 text-md font-semibold p-2 rounded-2xl hover:bg-gray-300 transition-colors duration-300"}><FontAwesomeIcon icon={faHouse} className="size-3" /><p>home</p></li></Link>
                <Link href={`/portfolio`} className="block"><li className={ pathname === "/portfolio" ? "flex items-center gap-3 text-md font-semibold p-3 rounded-2xl bg-gray-200 transition-colors duration-300" :"flex items-center gap-3 text-md font-semibold p-2 rounded-2xl hover:bg-gray-300 transition-colors duration-300"}><FontAwesomeIcon className="size-3" icon={faUser} /> <p>Profile</p></li></Link>
                <Link href={`/Settings`} className="block"><li className={ pathname === "/Settings" ? "flex items-center gap-3 text-md font-semibold p-3 rounded-2xl bg-gray-200 transition-colors duration-300" :"flex items-center gap-3 text-md font-semibold p-2 rounded-2xl hover:bg-gray-300 transition-colors duration-300"}><FontAwesomeIcon className="size-3" icon={faSliders} /> <p>Settings</p></li></Link>
                <Link href={`/`} className="block"><li className={ pathname === "/login" ? "flex items-center gap-3 text-md font-semibold p-3 rounded-2xl bg-gray-200 transition-colors duration-300" :"flex items-center gap-3 text-md font-semibold p-2 rounded-2xl hover:bg-gray-300 transition-colors duration-300"}><FontAwesomeIcon className="size-3" icon={faRightFromBracket} /> <p>log out</p></li></Link>
            </ul>
            <button onClick={() => setShowModal(true)} className="btn flex items-center justify-center gap-3 w-full mt-10"><FontAwesomeIcon icon={faPlus} className="size-3"/> New Post</button>
        </div>
    </div>

    {showModal && (
            <div className="fixed top-0 start-0 z-[100] w-full h-screen bg-black/90 flex items-center justify-center">
              <div className="flex flex-col items-center gap-5 w-[80%] lg:w-1/2">
                <AddPost/>
    
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
