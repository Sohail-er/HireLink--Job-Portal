import { Button, Divider, Text } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled, IconClockHour3 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";

const JobCard = (props: any) => {
    const dispatch=useDispatch();
    const profile=useSelector((state:any)=>state.profile);
    const handleSaveJob = () => {
        let savedJobs:any=profile.savedJobs?[...profile.savedJobs]:[];
        if(savedJobs.includes(props.id)){
            savedJobs=savedJobs.filter((job:any)=>job!=props.id);
        }else{ 
            savedJobs.push(props.id);
        }
        let updatedProfile={...profile,savedJobs:savedJobs};
        dispatch(changeProfile(updatedProfile));
    }
    
    return <div data-aos="fade-up"  className="p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-purple-200 hover:shadow-lg hover:shadow-purple-200 hover:border-purple-300 transition duration-300 ease-in-out w-72 sm-mx:w-full flex flex-col gap-3">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-md">
                    <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-semibold text-gray-800">{props.jobTitle}</div>
                    <div className="text-xs text-gray-600"><Link className="hover:text-purple-600 transition-colors duration-300" to="/company">{props.company}</Link> &bull; {props.applicants?props.applicants.length:0} Applicants</div>
                </div>
            </div>
            {profile.savedJobs?.includes(props.id) ?<IconBookmarkFilled onClick={handleSaveJob} className="cursor-pointer text-purple-600 " stroke={1.5} />:<IconBookmark onClick={handleSaveJob} className="cursor-pointer hover:text-purple-600 text-gray-400 transition-colors duration-300" stroke={1.5} />
            }
        </div>
        <div className="flex gap-2 flex-wrap">
            <div className="p-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs font-medium">{props.experience}</div>
            <div className="p-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-xs font-medium">{props.jobType}</div>
            <div className="p-2 py-1 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg text-xs font-medium">{props.location}</div>
        </div>
        <div>
            <Text className="!text-xs text-justify !text-gray-600" lineClamp={3}>{props.about}
            </Text>
        </div>
        <Divider color="gray.3" size="xs" />
        <div className="flex justify-between">
            <div className="font-semibold text-purple-600">&#8377;{props.packageOffered} LPA</div>
            <div className="text-xs flex gap-1 items-center text-gray-500">
                <IconClockHour3 className="h-5 w-5" stroke={1.5} />Posted {timeAgo(props.postTime)}
            </div>
        </div>
        <Link to={`/jobs/${props.id}`}>
            <Button fullWidth className="!bg-gradient-to-r !from-purple-500 !to-pink-500 !text-white hover:!from-purple-600 hover:!to-pink-600 !border-0" variant="filled">View Job</Button>
        </Link>
    </div>
}
export default JobCard;