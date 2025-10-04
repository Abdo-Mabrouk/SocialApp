
export default function SaidBar2() {
  return (
    <>
    <div className="fixed end-0 w-85 p-5 h-screen hidden lg:block  pt-25 overflow-y-auto">
        <div className=" space-y-5 ">
            <div className=" p-3 rounded-lg bg-gray-200 space-y-5">
                <p className="font-semibold"> Suggested Connections </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="size-12  bg-gradient-to-r from-blue-600 to-purple-600 block rounded-full"></span>
                        <div className="">
                            <p className="font-medium text-sm">Dev Community</p>
                            <p className="text-gray-400 text-[10px]">@devcommunity</p>
                        </div>
                    </div>
                    <a href="#" className="text-blue-500">Follow</a>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="size-12  bg-gradient-to-r from-blue-600 to-purple-600 block rounded-full"></span>
                        <div className="">
                            <p className="font-medium text-sm">Dev Community</p>
                            <p className="text-gray-400 text-[10px]">@devcommunity</p>
                        </div>
                    </div>
                    <a href="#" className="text-blue-500">Follow</a>
                </div>
            </div>
            <div className=" p-3 rounded-lg bg-gray-200 space-y-5">
                <p className="font-semibold"> What's Happening  </p>
                <div className="">
                        <p className="font-semibold text-sm">React 19 Beta Released </p>
                        <p className="text-gray-400 text-[12px]">Technology 2 hours ago</p>
                </div>
                <div className="">
                        <p className="font-semibold text-sm">JavaScript Conference 2024 </p>
                        <p className="text-gray-400 text-[12px]">Events 4 hours ago</p>
                </div>
                <div className="">
                        <p className="font-semibold text-sm">Open Source Friday </p>
                        <p className="text-gray-400 text-[12px]">Community 1 day ago</p>
                </div>

            </div>
            <div className=" p-3 rounded-lg bg-gray-200 space-y-3">
                <p className="font-semibold"> Trending  </p>
                <div className="">
                        <p className="font-semibold text-sm">#ReactJS </p>
                        <p className="text-gray-400 text-[12px]">125k posts</p>
                </div>
                <div className="">
                        <p className="font-semibold text-sm">#WebDev</p>
                        <p className="text-gray-400 text-[12px]">89k posts</p>
                </div>
                <div className="">
                        <p className="font-semibold text-sm">#OpenAI</p>
                        <p className="text-gray-400 text-[12px]">67k posts</p>
                </div>

            </div>
        </div>
    </div>
    </>
  )
}
