import { Anchor, Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "../../Services/ProfileService";
import { formatInterviewTime, openPDF } from "../../Services/Utilities";
import { changeAppStatus } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";

const TalentCard = (props: any) => {
    const {id}=useParams();
    const ref = useRef<HTMLInputElement>(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [app, {open:openApp, close:closeApp}]=useDisclosure(false);
    const [date, setDate] = useState<Date|null>(null);
    const [time, setTime] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const handleOffer = (status:string) => {
        let interview:any={id, applicantId:profile?.id, applicationStatus:status};
        if(status=="INTERVIEWING"){
            const [hours, minutes] = time.split(':').map(Number);
            date?.setHours(hours);
            date?.setMinutes(minutes);
            interview={...interview, interviewTime:date}
        }
        changeAppStatus(interview).then((res) => {
            if(status=="INTERVIEWING")successNotification('Interview Scheduled',  'Interview has been scheduled successfully');
            else if(status=="OFFERED")successNotification('Offered',  'Offer has been sent successfully');
            else successNotification('Rejected',  'Offer has been rejected');
            window.location.reload();
        }).catch((err) => {
            console.log(err)
            errorNotification('Error', err.response.data.errorMessage);
        });
    
    }
    useEffect(()=>{
        if(props.applicantId)getProfile(props.applicantId).then((res)=>{
            setProfile(res);
        }).catch((err)=>console.log(err))
        else setProfile(props);
    }, [props])
    return <div data-aos="fade-up" className="p-4 rounded-xl bg-black border border-purple-500 hover:shadow-lg hover:shadow-purple-400 hover:border-purple-400 transition duration-300 ease-in-out w-96 bs-mx:w-[48%] md-mx:w-full flex flex-col gap-3">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                    <Avatar className="rounded-full" size="lg" src={profile?.picture?`data:image/jpeg;base64,${profile?.picture}`:'/Avatar.png'} />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-semibold text-lg text-white">{props?.name}</div>
                    <div className="text-sm text-gray-300">{profile?.jobTitle} &bull; {profile?.company}</div>

                </div>
            </div>
            <IconHeart className="cursor-pointer text-gray-400 hover:text-purple-400 transition-colors duration-300" stroke={1.5} />
        </div>
        <div className="flex gap-2 flex-wrap ">
            {
                profile?.skills?.map((skill: any, index: any) => index<4 && <div key={index} className="p-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs font-medium">{skill}</div>)
            }
        </div>
        <div>
            <Text className="!text-xs text-justify !text-gray-300" lineClamp={3}>{profile?.about}
            </Text>
        </div>
        <Divider color="gray.6" size="xs" />
        {
            props.invited ? <div className="flex gap-1 text-purple-400 text-sm items-center">
                <IconCalendarMonth stroke={1.5} /> Interview: {formatInterviewTime(props.interviewTime)}
            </div> : <div className="flex justify-between">
                <div className="font-medium text-purple-400">Exp: {profile?.totalExp?profile?.totalExp:1} Years</div>
                <div className="text-xs flex gap-1 items-center text-gray-400">
                    <IconMapPin className="h-5 w-5" /> {profile?.location}
                </div>
            </div>
        }
        <Divider color="gray.6" size="xs" />
        <div className="flex [&>*]:w-1/2 [&>*]:p-1">
            {
                !props.invited && <>
                    <Link to={`/talent-profile/${profile?.id}`}>
                        <Button className="!border-purple-400 !text-purple-400 hover:!bg-purple-900/30" variant="outline" fullWidth>Profile</Button>
                    </Link>

                    <div>
                        {props.posted ? <Button className="!bg-purple-900/30 !text-purple-400 hover:!bg-purple-800/40" variant="light" onClick={open} rightSection={<IconCalendarMonth className="w-5 h-5" />} fullWidth>Schedule</Button> : <Button className="!bg-purple-900/30 !text-purple-400 hover:!bg-purple-800/40" variant="light" fullWidth>Message</Button>}
                    </div>
                </>
            }{

                props.invited && <>
                    <div>

                        <Button onClick={()=>handleOffer("OFFERED")} className="!border-green-400 !text-green-400 hover:!bg-green-900/30" variant="outline" fullWidth>Accept</Button>
                    </div>
                    <div>

                        <Button onClick={()=>handleOffer("REJECTED")} className="!bg-red-900/30 !text-red-400 hover:!bg-red-800/40" variant="light" fullWidth>Reject</Button>
                    </div>
                </>
            }
        </div>
            {(props.invited || props.posted) && <Button className="!bg-gradient-to-r !from-purple-500 !to-pink-500 !text-white hover:!from-purple-600 hover:!to-pink-600 !border-0" variant="filled" onClick={openApp} fullWidth>View Application</Button>}
        <Modal opened={opened} onClose={close} radius="lg" title="Schedule Interview" centered>
            <div className="flex flex-col gap-4">
                <DateInput value={date} onChange={setDate} minDate={new Date()} label="Date" placeholder="Enter Date" />
                <TimeInput label="Time" ref={ref} value={time}
      onChange={(event) => setTime(event.currentTarget.value)}  minTime="" onClick={() => ref.current?.showPicker()} />
                <Button onClick={()=>handleOffer("INTERVIEWING")} className="!bg-gradient-to-r !from-purple-500 !to-pink-500 !text-white hover:!from-purple-600 hover:!to-pink-600 !border-0" variant="filled" fullWidth>Schedule</Button>
            </div>
        </Modal>
        <Modal opened={app} onClose={closeApp} radius="lg" title="Application" centered>
            <div className="flex flex-col gap-4">
                <div >
                    Email: &emsp;<a className="text-purple-600 hover:underline cursor-pointer " href={`mailto:${props?.email}`}>{props?.email}</a>
                </div>
                <div >
                    Website: &emsp;<a className="text-purple-600 hover:underline cursor-pointer " target="_blank" href={props.website}>{props.website}</a>
                </div>
                <div >
                    Resume: &emsp;<span className="text-purple-600 hover:underline cursor-pointer" onClick={()=>openPDF(props.resume)}>{props.name}</span>
                    
                </div>
                <div  >
                    Cover Letter: &emsp;
                    <div className="text-wrap text-gray-700">{props.coverLetter} </div>
                </div>
            </div>
        </Modal>
    </div>
}
export default TalentCard;