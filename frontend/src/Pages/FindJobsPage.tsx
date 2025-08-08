import { Divider } from "@mantine/core";
import SearchBar from "../Components/FindJobs/SearchBar";
import Jobs from "../Components/FindJobs/Jobs";

const FindJobsPage = () => {
    return (
        <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-['poppins']">
            <Divider size="xs" mx="md"/>
            <SearchBar/>
            <Divider size="xs" mx="md"/>
            <Jobs/>
        </div>
    )
}
export default FindJobsPage;