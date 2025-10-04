'use client';
import { faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { AppUseDispatch, AppUseSelector } from "@/hooks/store.hook";
import { userData } from "@/store/Slice/user.slice";
import Link from "next/link";
import { useEffect } from "react";
import { faHouse, faUser } from "@fortawesome/free-regular-svg-icons";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = AppUseDispatch();
  const profileData = AppUseSelector((store) => store.userDataReducer.user);

  useEffect(() => {
    dispatch(userData());
  }, [dispatch]); // ✅ أضفنا dispatch لتبعية useEffect

  function deleteToken() {
    localStorage.removeItem("tokenSocialApp");
  }

  return (
    <div className="fixed top-0 w-full z-[100] bg-white/90">
      <div className="container py-3 flex flex-col lg:flex-row items-center justify-between">
        {/* Logo and mobile profile */}
        <div className="flex items-center w-full lg:w-fit justify-between">
          <h1 className="text-3xl mb-5 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SocialApp
          </h1>
          <Link href="/portfolio" className="lg:hidden">
            <div className="overflow-hidden flex items-center gap-2.5">
              <Image
                alt={profileData?.name || "User photo"} // ✅ أضفنا alt بشكل صحيح
                src={profileData?.photo || "/default-avatar.png"}
                width={50}
                height={50}
                className="size-12 rounded-full"
              />
            </div>
          </Link>
        </div>

        {/* Navigation Icons */}
        <div className="icons flex items-center gap-10">
          <div className="flex items-center gap-5">
            <Link href="/home">
              <div
                className={
                  pathname === "/"
                    ? "relative size-9 bg-gray-300 transition-colors duration-300 cursor-pointer flex items-center justify-center rounded-md group"
                    : "relative size-9 hover:bg-gray-300 transition-colors duration-300 cursor-pointer flex items-center justify-center rounded-md group"
                }
              >
                <FontAwesomeIcon
                  icon={faHouse}
                  className="size-5 text-gray-600 group-hover:text-black transition-colors duration-300"
                />
              </div>
            </Link>

            <Link href="/portfolio">
              <div
                className={
                  pathname === "/portfolio"
                    ? "relative size-9 bg-gray-300 transition-colors duration-300 cursor-pointer flex items-center justify-center rounded-md group"
                    : "relative size-9 hover:bg-gray-300 transition-colors duration-300 cursor-pointer flex items-center justify-center rounded-md group"
                }
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="size-5 text-gray-600 group-hover:text-black transition-colors duration-300"
                />
              </div>
            </Link>

            <Link href="/Settings">
              <div
                className={
                  pathname === "/Settings"
                    ? "relative size-9 bg-gray-300 transition-colors duration-300 cursor-pointer flex items-center justify-center rounded-md group"
                    : "relative size-9 hover:bg-gray-300 transition-colors duration-300 cursor-pointer flex items-center justify-center rounded-md group"
                }
              >
                <FontAwesomeIcon
                  icon={faGear}
                  className="size-5 text-gray-600 group-hover:text-black transition-colors duration-300"
                />
              </div>
            </Link>

            <Link href="/" onClick={deleteToken}>
              <div className="size-9 hover:bg-gray-300 transition-colors duration-300 cursor-pointer flex items-center justify-center rounded-md group">
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="size-5 text-gray-600 group-hover:text-black transition-colors duration-300"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Desktop Profile */}
        <Link href="/portfolio" className="hidden lg:block">
          <div className="overflow-hidden flex items-center gap-2.5">
            <Image
              alt={profileData?.name || "User photo"} // ✅ alt مضاف هنا أيضًا
              src={profileData?.photo || "/default-avatar.png"}
              width={50}
              height={50}
              className="size-12 rounded-full"
            />
            <div>
              <h2 className="name font-semibold">{profileData?.name}</h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
