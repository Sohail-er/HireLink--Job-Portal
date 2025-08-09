import AdminDashboard from '../Components/Admin/AdminDashboard';

const AdminDashboardPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white shadow-sm border-b">
                    <div className="px-6 py-4">
                        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-600">Manage employers and job seekers</p>
                    </div>
                </div>
                <AdminDashboard />
            </div>
        </div>
    );
};

export default AdminDashboardPage;
