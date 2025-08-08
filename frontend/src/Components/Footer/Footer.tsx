import { IconAnchor, IconBrandFacebook, IconBrandInstagram, IconBrandTelegram, IconBrandX, IconBrandYoutube } from "@tabler/icons-react";
import { footerLinks } from "../../Data/Data";
import { useLocation } from "react-router-dom";
import { Divider } from "@mantine/core";

const Footer = () => {
    const location=useLocation();
    return location.pathname!='/signup' && location.pathname!='/login'?<div className="flex flex-col gap-2"><div className="pt-20 pb-5 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-4  flex gap-8 justify-around flex-wrap">
        <div data-aos="fade-up"  data-aos-offset="0"  className="w-1/4 sm-mx:w-1/3   xs-mx:w-1/2 xsm-mx:w-full flex flex-col gap-4">
            <div className="flex gap-1 items-center text-blue-400">
                <IconAnchor className="h-6 w-6" stroke={2.5} />
                <div className="text-xl font-semibold">HireLink</div>
            </div>
            <div className="text-sm text-white/90">Job portal with user profiles, skill updates, certifications, work experience and admin job postings.</div>
            <div className="flex gap-3 text-blue-400 [&>a]:bg-white/20 [&>a]:backdrop-blur-sm [&>a]:p-2 [&>a]:rounded-full [&>a]:cursor-pointer hover:[&>a]:bg-blue-500 hover:[&>a]:text-white [&>a]:transition-all [&>a]:duration-300">
                <a href="https://www.instagram.com/code.marshal_/"><IconBrandInstagram /></a>
                <a href="https://t.me/code_Marshal"><IconBrandTelegram /></a>
                <a href="https://www.youtube.com/@Code.Marshal"><IconBrandYoutube /></a>
            </div>
        </div>
        {
            footerLinks.map((item, index) => <div  data-aos-offset="0"  data-aos="fade-up" key={index}>
                <div className="text-lg font-semibold mb-4 text-blue-300">{item.title}</div>
                {
                    item.links.map((link, index) => <div key={index} className="text-white/80 text-sm hover:text-blue-300 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out">{link}</div>)
                }
            </div>)
        }
    </div>
    <Divider/>
    <div data-aos="flip-left"  data-aos-offset="0" className="font-medium text-center p-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        Designed & Developed By <a className="text-blue-300 hover:text-blue-100 hover:underline font-semibold transition-colors duration-300" href="https://github.com/Sohail-er/HireLink--Job-Portal">Team 5-CDAC Mumbai</a>
    </div>
    </div>:<></>
}
export default Footer;