
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavLinks=()=>{
    
    const allLinks=[
        {name:"Find Jobs",url:"find-jobs", roles: ["APPLICANT", "ADMIN"]},
        {name:"Find Talent",url:"find-talent", roles: ["EMPLOYER", "ADMIN"]},
        {name:"Post Job",url:"post-job/0", roles: ["EMPLOYER", "ADMIN"]},
        {name:"Posted Jobs",url:"posted-jobs/0", roles: ["EMPLOYER", "ADMIN"]},
        {name:"Job History", url:"job-history", roles: ["APPLICANT", "ADMIN"]}
    ]
    const location =useLocation();
    const user = useSelector((state: any) => state.user);

    // Filter links based on user's account type
    const getFilteredLinks = () => {
        if (!user?.accountType) return [];
        return allLinks.filter(link => link.roles.includes(user.accountType));
    }

    const links = getFilteredLinks();
    return <div className="flex bs-mx:!hidden gap-5 text-gray-600 h-full items-center">
        {   
        links.map((link, index)=><div key={index} className={`${location.pathname=="/"+link.url?"border-purple-500 text-purple-600":"border-transparent"} border-t-[3px] h-full flex items-center`}>
                <Link className="hover:text-purple-600 transition-colors duration-300 font-medium" key={index} to={link.url} >{link.name}</Link>
            </div>)
            
        }
</div>
}
export default NavLinks;