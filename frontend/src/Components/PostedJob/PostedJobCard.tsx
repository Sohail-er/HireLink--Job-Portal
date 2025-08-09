import { Link, useParams } from "react-router-dom";
import { timeAgo } from "../../Services/Utilities";

const PostedJobCard=(props:any)=>{
    const {id}=useParams();
    return <Link data-aos="fade-up" to={`/posted-jobs/${props.id}`} className={` rounded-xl p-4 w-64 lg-mx:w-56 bs-mx:w-52 border border-purple-200 hover:shadow-lg transition-all duration-300 cursor-pointer ${props.id==id?"bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg":"bg-white/90 backdrop-blur-sm text-gray-800 hover:border-purple-300"}`}>
        <div className={`text-sm  font-semibold`}>{props.jobTitle}</div>
        <div className="text-xs  font-medium">{props.location}</div>
        <div className="text-xs">{props.jobStatus=="DRAFT"?"Drafted":props.jobStatus=="CLOSED"?"Closed":"Posted"} {timeAgo(props.postTime)}</div>
    </Link>
}
export default PostedJobCard;