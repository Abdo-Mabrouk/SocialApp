import AddPost from "@/components/AddPost/AddPost";
import Navbar from "@/components/Navbar/Navbar";
import PortfolioData from "@/components/PortfolioData/PortfolioData";
import SaidBar2 from "@/components/SaidBar2/SaidBar2";
import SaidBar from "@/components/SideBar/SaidBar";
import UserPosts from "@/components/UserPosts/UserPosts";

export default function page() {
  return (
    <>
      <Navbar/>
      <SaidBar/>
      <SaidBar2/>
      <div className=" pt-25">
        <div className=" w-full lg:w-[800px] mx-auto space-y-5">
          <PortfolioData/>
        </div>
      </div>
      <UserPosts/>

    </>
  )
}



