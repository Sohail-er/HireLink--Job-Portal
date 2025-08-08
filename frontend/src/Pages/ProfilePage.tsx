import { Divider } from "@mantine/core";
import Profile from "../Components/Profile/Profile";

const ProfilePage = () => {
    return <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-['poppins'] ">
        <Divider mx="md" mb="xl" />
        
            <Profile />
    </div>
}
export default ProfilePage;