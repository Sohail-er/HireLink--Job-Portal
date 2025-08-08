import { Avatar } from "@mantine/core";
import { work } from "../../Data/Data";

const Working = () => {
    return <div className="mt-20 pb-5 overflow-hidden">
        <div data-aos="zoom-out" className="text-4xl  md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl text-center font-semibold mb-3 text-gray-800">How it <span className="text-purple-600">Works</span></div>
        <div data-aos="zoom-out" className="text-lg mb-10 sm-mx:text-base xs-mx:text-sm mx-auto text-gray-600 text-center w-1/2 sm-mx:w-11/12">Effortlessly navigate through the process and land your dream job.</div>
        <div className="flex px-16 bs-mx:px-10 gap-2 md-mx:flex-col md-mx:px-5 justify-between items-center ">
            <div data-aos="fade-right" className="relative">
                <img className="w-[30rem]" src="/Working/Girl.png" alt="girl" />
                <div className="w-36 xs-mx:w-28 flex top-[15%] right-0 absolute flex-col items-center gap-1 border border-purple-400 bg-white/90 rounded-xl py-3 px-1 backdrop-blur-md shadow-lg">
                    <Avatar className="!h-16 !w-16 xs-mx:!h-12 xs-mx:!w-12" src="avatar1.png" alt="it's me" />
                    <div className="text-sm sm-mx:text-xs font-semibold text-gray-800 text-center">Complete your profile</div>
                    <div className="text-xs  text-gray-600">70% Completed</div>

                </div>
            </div>
            <div data-aos="fade-left" className="flex flex-col gap-10">
                {
                    work.map((item, index) => <div key={index} className="flex items-center gap-4">
                        <div className="p-2.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg">
                            <img className="h-12 w-12 md-mx:w-9 md-mx:h-9 sm-mx:w-7 sm-mx:h-7" src={`/Working/${item.name}.png`} alt={item.name} />
                        </div>
                        <div>
                            <div className="text-gray-800 text-xl md-mx:text-lg sm-mx:text-base font-semibold">{item.name}</div>
                            <div className="text-gray-600 md-mx:text-sm sm-mx:text-xs">{item.desc}</div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    </div>
}
export default Working;