import { useState, useEffect } from 'react';
import { Card, Text, Group, Badge, Switch, Button, Tabs, LoadingOverlay } from '@mantine/core';
import { IconUsers, IconBuilding, IconUserCheck, IconUserX } from '@tabler/icons-react';
import { errorNotification, successNotification } from '../../Services/NotificationService';
import { activateUser, deactivateUser, getAllEmployers, getAllApplicants, getDashboardStats } from '../../Services/AdminService';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
    const user = useSelector((state: any) => state.user);
    const [activeTab, setActiveTab] = useState<string | null>('employers');
    const [employers, setEmployers] = useState<any[]>([]);
    const [applicants, setApplicants] = useState<any[]>([]);
    const [stats, setStats] = useState<{
        totalUsers?: number;
        totalEmployers?: number;
        totalApplicants?: number;
        activeUsers?: number;
    }>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            errorNotification('Error', 'Please login first');
            return;
        }
        
        if (user?.accountType === 'ADMIN') {
            loadDashboardData();
        } else {
            errorNotification('Error', 'Access denied. Admin privileges required.');
        }
    }, [user]);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            const [employersData, applicantsData, statsResponse] = await Promise.all([
                getAllEmployers(),
                getAllApplicants(),
                getDashboardStats()
            ]);
            setEmployers(employersData);
            setApplicants(applicantsData);
            setStats(statsResponse.data || {});
        } catch (error: any) {
            console.error('Dashboard load error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to load dashboard data';
            errorNotification('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleUser = async (userId: number, isActive: boolean) => {
        try {
            if (isActive) {
                await activateUser(userId);
                successNotification('Success', 'User activated successfully');
            } else {
                await deactivateUser(userId);
                successNotification('Success', 'User deactivated successfully');
            }
            loadDashboardData(); // Reload data
        } catch (error) {
            errorNotification('Error', 'Failed to update user status');
        }
    };

    const renderUserCard = (user: any) => (
        <Card key={user.id} shadow="sm" padding="lg" radius="md" withBorder className="mb-4">
            <Group justify="space-between" mb="xs">
                <Text fw={500} size="lg">{user.name}</Text>
                <Badge color={user.accountType === 'EMPLOYER' ? 'blue' : 'green'}>
                    {user.accountType}
                </Badge>
            </Group>
            <Text size="sm" c="dimmed" mb="md">{user.email}</Text>
            <Group justify="space-between">
                <Badge color={user.active ? 'green' : 'red'}>
                    {user.active ? 'Active' : 'Inactive'}
                </Badge>
                <Switch
                    checked={user.active}
                    onChange={(event) => handleToggleUser(user.id, event.currentTarget.checked)}
                    color="teal"
                    size="md"
                    onLabel={<IconUserCheck size={16} stroke={2.5} />}
                    offLabel={<IconUserX size={16} stroke={2.5} />}
                />
            </Group>
        </Card>
    );

    return (
        <div className="p-6">
            <LoadingOverlay visible={loading} />
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Group>
                        <IconUsers size={30} color="blue" />
                        <div>
                            <Text size="xs" c="dimmed">Total Users</Text>
                            <Text fw={700} size="xl">{stats.totalUsers || 0}</Text>
                        </div>
                    </Group>
                </Card>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Group>
                        <IconBuilding size={30} color="green" />
                        <div>
                            <Text size="xs" c="dimmed">Employers</Text>
                            <Text fw={700} size="xl">{stats.totalEmployers || 0}</Text>
                        </div>
                    </Group>
                </Card>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Group>
                        <IconUserCheck size={30} color="orange" />
                        <div>
                            <Text size="xs" c="dimmed">Job Seekers</Text>
                            <Text fw={700} size="xl">{stats.totalApplicants || 0}</Text>
                        </div>
                    </Group>
                </Card>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Group>
                        <IconUserCheck size={30} color="teal" />
                        <div>
                            <Text size="xs" c="dimmed">Active Users</Text>
                            <Text fw={700} size="xl">{stats.activeUsers || 0}</Text>
                        </div>
                    </Group>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                    <Tabs.Tab value="employers" leftSection={<IconBuilding size={16} />}>
                        Employers ({employers.length})
                    </Tabs.Tab>
                    <Tabs.Tab value="applicants" leftSection={<IconUsers size={16} />}>
                        Job Seekers ({applicants.length})
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="employers" pt="xs">
                    <div className="mt-4">
                        {employers.length === 0 ? (
                            <Text c="dimmed" ta="center" py="xl">No employers found</Text>
                        ) : (
                            employers.map(renderUserCard)
                        )}
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="applicants" pt="xs">
                    <div className="mt-4">
                        {applicants.length === 0 ? (
                            <Text c="dimmed" ta="center" py="xl">No job seekers found</Text>
                        ) : (
                            applicants.map(renderUserCard)
                        )}
                    </div>
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};

export default AdminDashboard;
