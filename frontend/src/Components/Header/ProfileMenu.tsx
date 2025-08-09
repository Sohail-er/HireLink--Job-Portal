import { Menu, rem, Avatar } from '@mantine/core';
import {
    IconMessageCircle,
    IconLogout2,
    IconUserCircle,
    IconFileText,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../../Slices/UserSlice';
import { removeJwt } from '../../Slices/JwtSlice';

const ProfileMenu = () => {
    const user=useSelector((state:any)=>state.user);
    const profile=useSelector((state:any)=>state.profile);
    const [opened, setOpened] = useState(false);
    const dispatch = useDispatch();
    const handleLogout=()=>{
        
        dispatch(removeUser());
        dispatch(removeJwt());
    }
    return (
        <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
            <Menu.Target><div className="flex items-center gap-2 cursor-pointer">
                <div className='xs-mx:hidden'>{user.name}</div>
                <Avatar src={profile.picture?`data:image/jpeg;base64,${profile.picture}`:'/avatar.png'} alt="it's me" />
            </div>
            </Menu.Target>

            <Menu.Dropdown onChange={()=>setOpened(true)}>
                {user.accountType !== 'ADMIN' && (
                    <Link to="/profile">
                    <Menu.Item  leftSection={<IconUserCircle style={{ width: rem(14), height: rem(14) }} />}>
                        Profile
                    </Menu.Item>
                    </Link>
                )}
                {user.accountType !== 'ADMIN' && (
                    <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
                        Messages
                    </Menu.Item>
                )}
                {user.accountType !== 'ADMIN' && (
                    <Menu.Item leftSection={<IconFileText style={{ width: rem(14), height: rem(14) }} />}>
                        Resume
                    </Menu.Item>
                )}

                <Menu.Divider />

                <Menu.Item onClick={handleLogout}
                    color="red"
                    leftSection={<IconLogout2 style={{ width: rem(14), height: rem(14) }} />}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
export default ProfileMenu;