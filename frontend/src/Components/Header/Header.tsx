import { Burger, Button, Drawer } from "@mantine/core";
import { IconAnchor, IconX } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../Slices/UserSlice";
import { setupResponseInterceptor } from "../../Interceptor/AxiosInterceptor";
import { useDisclosure } from "@mantine/hooks";

const allLinks = [
    { name: "Find Jobs", url: "find-jobs", roles: ["APPLICANT"] },
    { name: "Find Talent", url: "find-talent", roles: ["EMPLOYER"] },
    { name: "Post Job", url: "post-job/0", roles: ["EMPLOYER"] },
    { name: "Posted Jobs", url: "posted-jobs/0", roles: ["EMPLOYER"] },
    { name: "Job History", url: "job-history", roles: ["APPLICANT"] },
    { name: "Admin Dashboard", url: "admin-dashboard", roles: ["ADMIN"] }
]

const Header = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const token = useSelector((state: any) => state.jwt);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        setupResponseInterceptor(navigate, dispatch);

    }, [navigate])
    const handleClick = (url: string) => {
        navigate(url)
        close();
    }

    // Filter links based on user's account type
    const getFilteredLinks = () => {
        if (!user?.accountType) return [];
        return allLinks.filter(link => link.roles.includes(user.accountType));
    }

    const filteredLinks = getFilteredLinks();
    useEffect(() => {
        if (token) {
            if (localStorage.getItem("token")) {
                const decoded = jwtDecode(localStorage.getItem("token") || "");
                dispatch(setUser({ ...decoded, email: decoded.sub }));
            }
        }
        if (user?.profileId) {
            // dispatch(showOverlay())
            getProfile(user?.profileId).then((res) => {
                dispatch(setProfile(res));
            }).catch((err) => console.log(err))
            // .finally(()=>dispatch(hideOverlay()));
        }
    }, [token, navigate]);
    return (location.pathname != "/signup" && location.pathname != "/login") ? <div data-aos="zoom-out" className="w-full bg-white/95 backdrop-blur-md border-b border-purple-200 shadow-lg px-6 text-gray-800 h-20 flex justify-between items-center font-['poppins']">
        <div onClick={() => navigate("/")} className="flex gap-1 cursor-pointer items-center text-purple-600 hover:text-purple-700 transition-colors duration-300">
            <IconAnchor className="h-8 w-8" stroke={2.5} />
            <div className=" xs-mx:hidden text-3xl font-semibold">HireLink</div>
        </div>
        <NavLinks />
        <div className="flex gap-3 items-center">

            {user ? <ProfileMenu /> : <Link to="/login" className="text-gray-600 hover:text-purple-600 "><Button className="!bg-gradient-to-r !from-purple-500 !to-pink-500 !text-white hover:!from-purple-600 hover:!to-pink-600" variant="filled">Login</Button></Link>}
            {/* <div className=" bg-mine-shaft-900 p-1.5 rounded-full">
                <IconSettings stroke={1.5} />
            </div> */}
            {user ? <NotiMenu /> : <></>}
            {

            }
            <Burger className="bs:hidden" opened={opened} onClick={open} aria-label="Toggle navigation" />
            <Drawer size="xs" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} position="right" opened={opened} onClose={close} closeButtonProps={{
                icon: <IconX size={30} />,
            }} >
                <div className="flex flex-col gap-6 items-center">

                    {
                        filteredLinks.map((link, index) => <div key={index} className=" h-full flex items-center">
                            <div className="hover:text-purple-600 text-xl cursor-pointer transition-colors duration-300" key={index} onClick={() => handleClick(link.url)} >{link.name}</div>
                        </div>)
                    }
                </div>
            </Drawer>
        </div>
    </div> : <></>
}
export default Header;