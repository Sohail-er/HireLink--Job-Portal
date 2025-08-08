import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Job from "../Components/JobDesc/Job";
import RecommendedJob from "../Components/JobDesc/RecommendedJob";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";
import { useDispatch } from "react-redux";
import { hideOverlay, showOverlay } from "../Slices/OverlaySlice";

const JobPage = () => {
    const {id}=useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [job, setJob] = useState<any>(null);
    useEffect(()=>{
        window.scrollTo(0,0);
        dispatch(showOverlay());
        getJob(id).then((res)=>{
            setJob(res);
            if(res.jobStatus=="CLOSED")navigate(-1);
        }).catch((err)=>console.log(err))
        .finally(()=>dispatch(hideOverlay()));
    },[id])
    return <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-['poppins'] p-4">
        <Divider size="xs" />
        <Link className="my-5 inline-block" to="/find-jobs">
            <Button className="!bg-purple-100 !text-purple-600 hover:!bg-purple-200" leftSection={<IconArrowLeft size={20} />} variant="light">Back</Button>
        </Link>
        <div className="flex gap-5 justify-around bs-mx:flex-wrap">
            <Job {...job} />
            <RecommendedJob />
        </div>
    </div>
}
export default JobPage;