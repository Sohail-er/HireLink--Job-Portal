import { Button, Divider, Text } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled, IconCalendarMonth, IconClockHour3 } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { timeAgo } from "../../Services/Utilities";
import { useState } from "react";
import { changeProfile } from "../../Slices/ProfileSlice";
import { changeAppStatus } from "../../Services/JobService";
import { successNotification, errorNotification } from "../../Services/NotificationService";

const Card = (props: any) => {
    const dispatch=useDispatch();
    const profile=useSelector((state:any)=>state.profile);
    const user=useSelector((state:any)=>state.user);
    const [isProcessing, setIsProcessing] = useState(false);
    
    const handleSaveJob = () => {
        let savedJobs:any=[...profile.savedJobs];
        if(savedJobs.includes(props.id)){
            savedJobs=savedJobs.filter((job:any)=>job!=props.id);
        }else{ 
            savedJobs.push(props.id);
        }
        let updatedProfile={...profile,savedJobs:savedJobs};
        dispatch(changeProfile(updatedProfile));
    }

    const handleOfferResponse = async (status: string) => {
        if (isProcessing) return;
        
        if (!profile?.id) {
            errorNotification('Error', 'Profile information not available. Please refresh the page and try again.');
            return;
        }
        
        setIsProcessing(true);
        try {
            const interview = {
                id: props.id,
                applicantId: profile.id,
                applicationStatus: status
            };
            
            console.log('User:', user);
            console.log('Profile:', profile);
            console.log('Sending payload:', interview);
            await changeAppStatus(interview);
            
            if (status === 'ACCEPTED') {
                successNotification('Offer Accepted', 'You have successfully accepted the job offer!');
            } else {
                successNotification('Offer Rejected', 'You have rejected the job offer.');
            }
            
            // Refresh the page to show updated status
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            
        } catch (error: any) {
            console.error('Error updating application status:', error);
            const errorMessage = error?.response?.data?.errorMessage || 'Failed to update application status. Please try again.';
            errorNotification('Error', errorMessage);
        } finally {
            setIsProcessing(false);
        }
    }
    return <div data-aos="zoom-out" className="p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-purple-200 hover:shadow-lg hover:shadow-purple-200 hover:border-purple-300 transition duration-300 ease-in-out w-72 flex flex-col gap-3">
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
            {profile.savedJobs?.includes(props.id) ? <IconBookmarkFilled onClick={handleSaveJob} className="cursor-pointer text-purple-600 " stroke={1.5} /> : <IconBookmark onClick={handleSaveJob} className="cursor-pointer hover:text-purple-600 text-gray-400 transition-colors duration-300" stroke={1.5} />}
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
                <IconClockHour3 className="h-5 w-5" stroke={1.5} /> {props.applied || props.interviewing? "Applied" : props.offered ? "Interviewed" : "Posted"} {timeAgo(props.postTime)}
            </div>
        </div>
        {(props.offered || props.interviewing) && <Divider color="gray.3" size="xs" />}
        {props.offered &&
        <div className="flex gap-2">
            <Button 
                className="!bg-gradient-to-r !from-green-500 !to-emerald-500 !text-white hover:!from-green-600 hover:!to-emerald-600 !border-0"
                variant="filled" 
                fullWidth 
                loading={isProcessing}
                onClick={() => handleOfferResponse('ACCEPTED')}
            >
                Accept
            </Button>
            <Button 
                className="!bg-gradient-to-r !from-red-500 !to-pink-500 !text-white hover:!from-red-600 hover:!to-pink-600 !border-0"
                variant="filled" 
                fullWidth 
                loading={isProcessing}
                onClick={() => handleOfferResponse('REJECTED')}
            >
                Reject
            </Button>
        </div>
        }
        {props.interviewing &&<div className="flex gap-1 text-sm text-purple-600">
        <IconCalendarMonth className="w-5 h-5" stroke={1.5} /> Sun, 25 August &bull; <span className="text-gray-500">10 AM - 11 AM</span>
        </div>}
        <Link  to={`/jobs/${props.id}`}>
        <Button fullWidth className="!bg-gradient-to-r !from-purple-500 !to-pink-500 !text-white hover:!from-purple-600 hover:!to-pink-600 !border-0" variant="filled">View Job</Button>
        </Link>
    </div>
}
export default Card;