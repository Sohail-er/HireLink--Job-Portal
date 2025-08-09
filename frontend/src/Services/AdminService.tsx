import axiosInstance from '../Interceptor/AxiosInterceptor';

// Get all employers
export const getAllEmployers = async () => {
    return axiosInstance.get('/admin/users/employers')
        .then((result: any) => result.data)
        .catch((error: any) => { throw error; });
};

// Get all applicants
export const getAllApplicants = async () => {
    return axiosInstance.get('/admin/users/applicants')
        .then((result: any) => result.data)
        .catch((error: any) => { throw error; });
};

// Get all users
export const getAllUsers = async () => {
    return axiosInstance.get('/admin/users')
        .then((result: any) => result.data)
        .catch((error: any) => { throw error; });
};

// Activate user
export const activateUser = async (userId: number) => {
    return axiosInstance.put(`/admin/users/${userId}/activate`)
        .then((result: any) => result.data)
        .catch((error: any) => { throw error; });
};

// Deactivate user
export const deactivateUser = async (userId: number) => {
    return axiosInstance.put(`/admin/users/${userId}/deactivate`)
        .then((result: any) => result.data)
        .catch((error: any) => { throw error; });
};

// Get dashboard stats
export const getDashboardStats = async () => {
    return axiosInstance.get('/admin/dashboard/stats')
        .then((result: any) => result.data)
        .catch((error: any) => { throw error; });
};
