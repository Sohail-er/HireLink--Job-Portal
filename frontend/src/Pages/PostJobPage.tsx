import { Divider } from "@mantine/core";
import PostJob from "../Components/PostJob/PostJob";

const PostJobPage=()=>{
    return <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-['poppins']">
         <Divider size="xs" mx="md"/>
         <PostJob/>
    </div>
}
export default PostJobPage;