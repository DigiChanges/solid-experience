const API_PROTOCOL = import.meta.env.VITE_API_PROTOCOL as string || 'http';
const API_HOSTNAME = import.meta.env.VITE_API_HOSTNAME as string || 'localhost';
const API_PORT = import.meta.env.VITE_API_PORT as string || 8089;
const VITE_API_WITH_CREDENTIALS = import.meta.env.VITE_API_WITH_CREDENTIALS === 'true' ?? false;

const BACKEND_BASE_PATH = import.meta.env.VITE_API_BASE as string || 'api';

export const config = {
    apiGateway: {
        server: {
            protocol: API_PROTOCOL,
            hostname: API_HOSTNAME,
            port: API_PORT,
            baseUrl: `${API_PROTOCOL}://${API_HOSTNAME}:${API_PORT}`,
            withCredentials: VITE_API_WITH_CREDENTIALS
        },
        routes: {
            auth: {
                login: `${BACKEND_BASE_PATH}/auth/login`,
                getMe: `${BACKEND_BASE_PATH}/auth/me`,
                refreshToken: `${BACKEND_BASE_PATH}/auth/refresh-token`,
                logout: `${BACKEND_BASE_PATH}/auth/logout`,
                permissionsGetAll: `${BACKEND_BASE_PATH}/auth/permissions`,
                keepAlive: `${BACKEND_BASE_PATH}/auth/keep-alive`,
                forgotPassword: `${BACKEND_BASE_PATH}/auth/forgot-password`,
                changeForgotPassword: `${BACKEND_BASE_PATH}/auth/change-forgot-password`,
                register: `${BACKEND_BASE_PATH}/auth/signup`,
                verifyYourAccount: `${BACKEND_BASE_PATH}/auth/verify-your-account`
            },
            users: {
                getAll: `${BACKEND_BASE_PATH}/users`,
                getOne: `${BACKEND_BASE_PATH}/users`,
                create: `${BACKEND_BASE_PATH}/users`,
                update: `${BACKEND_BASE_PATH}/users`,
                remove: `${BACKEND_BASE_PATH}/users`,
                editPassword: `${BACKEND_BASE_PATH}/users/change-user-password`,
                assignRole: `${BACKEND_BASE_PATH}/users/assign-role`
            },
            roles: {
                getAll: `${BACKEND_BASE_PATH}/roles`,
                getOne: `${BACKEND_BASE_PATH}/roles`,
                create: `${BACKEND_BASE_PATH}/roles`,
                update: `${BACKEND_BASE_PATH}/roles`,
                remove: `${BACKEND_BASE_PATH}/roles`
            }
        }
    }
};
