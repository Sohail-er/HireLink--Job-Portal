import { IconAnchor, IconBrandFacebook, IconBrandInstagram, IconBrandTelegram, IconBrandX, IconBrandYoutube } from "@tabler/icons-react";
import { footerLinks } from "../../Data/Data";
import { useLocation, Link } from "react-router-dom";
import { Divider } from "@mantine/core";

const Footer = () => {
    const location=useLocation();
    
    const getPageLink = (linkText: string) => {
        switch(linkText) {
            case "About Us":
                return "/about-us";
            case "Find Job":
                return "/find-jobs";
            case "Find Company":
                return "#";
            case "Find Employee":
                return "/find-talent";
            case "Contact Us":
                return "#";
            case "Privacy Policy":
                return "#";
            case "Terms & Conditions":
                return "#";
            case "Help & Support":
                return "#";
            case "Feedback":
                return "#";
            case "FAQs":
                return "#";
            default:
                return "#";
        }
    };
    
    return location.pathname!='/signup' && location.pathname!='/login'?<div className="flex flex-col gap-0"><div className="pt-16 pb-8 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 p-8 flex gap-8 justify-around flex-wrap">
        <div data-aos="fade-up"  data-aos-offset="0"  className="w-1/4 sm-mx:w-1/3   xs-mx:w-1/2 xsm-mx:w-full flex flex-col gap-4">
            <div className="flex gap-2 items-center text-slate-100">
                <IconAnchor className="h-7 w-7" stroke={2} />
                <div className="text-2xl font-bold">HireLink</div>
            </div>
            <div className="text-sm text-slate-300 leading-relaxed">Job portal with user profiles, skill updates, certifications, work experience and admin job postings.</div>
            <div className="flex gap-3 text-slate-300 [&>a]:bg-slate-600/40 [&>a]:backdrop-blur-sm [&>a]:p-2.5 [&>a]:rounded-full [&>a]:cursor-pointer hover:[&>a]:bg-slate-500 hover:[&>a]:text-white hover:[&>a]:scale-110 [&>a]:transition-all [&>a]:duration-300">
                <a href=""><IconBrandInstagram /></a>
                <a href=""><IconBrandTelegram /></a>
                <a href=""><IconBrandYoutube /></a>
            </div>
        </div>
        {
            footerLinks.map((item, index) => <div  data-aos-offset="0"  data-aos="fade-up" key={index}>
                <div className="text-lg font-semibold mb-4 text-slate-100">{item.title}</div>
                {
                    item.links.map((link, linkIndex) => 
                        getPageLink(link) !== "#" ? 
                        <Link key={linkIndex} to={getPageLink(link)} className="block text-slate-300 text-sm hover:text-slate-100 cursor-pointer mb-2 hover:translate-x-1 transition duration-300 ease-in-out">{link}</Link>
                        :
                        <div key={linkIndex} className="text-slate-300 text-sm hover:text-slate-100 cursor-pointer mb-2 hover:translate-x-1 transition duration-300 ease-in-out">{link}</div>
                    )
                }
            </div>)
        }
    </div>
    <Divider className="border-slate-600"/>
    <div data-aos="flip-left"  data-aos-offset="0" className="font-medium text-center p-4 bg-slate-900 text-slate-300">
        Designed & Developed By <a className="text-slate-200 hover:text-slate-100 hover:underline font-semibold transition-colors duration-300" href="https://github.com/Sohail-er/HireLink--Job-Portal">Team 5-CDAC Mumbai</a>
    </div>
    </div>:<></>
}
export default Footer;