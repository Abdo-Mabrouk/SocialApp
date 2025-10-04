import ChangePassword from "@/components/ChangePassword/ChangePassword";
import Navbar from "@/components/Navbar/Navbar";
import SaidBar2 from "@/components/SaidBar2/SaidBar2";
import SaidBar from "@/components/SideBar/SaidBar";

export default function page() {
  return (
    <>
        <Navbar/>
        <SaidBar/>
        <SaidBar2/>
        <ChangePassword/>
    </>
  )
}
