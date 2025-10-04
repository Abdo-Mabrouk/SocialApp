import Image from "next/image";
import Img from "@/img/notfound_6wni.png";

export default function notFound() {
  return (
    <>
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="">
      <Image alt="photo" src={Img} width={500} height={500}/>
      <p className="text-center text-3xl mt-10">Page not found</p>
      </div>
    </div>
    </>
  )
}
