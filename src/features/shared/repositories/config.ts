const API_PROTOCOL = import.meta.env.VITE_API_PROTOCOL as string || 'http';
const API_HOSTNAME = import.meta.env.VITE_API_HOSTNAME as string || 'localhost';
const API_PORT = import.meta.env.VITE_API_PORT as string || 8089;
const VITE_API_WITH_CREDENTIALS = import.meta.env.VITE_API_WITH_CREDENTIALS  as string ?? 'include';

const BACKEND_BASE_PATH = import.meta.env.VITE_API_BASE as string || 'api';

export const config = {
    apiGateway: {
        server: {
            protocol: API_PROTOCOL,
            hostname: API_HOSTNAME,
            port: API_PORT,
            baseUrl: `${API_PROTOCOL}://${API_HOSTNAME}:${API_PORT}`,
            credentials: VITE_API_WITH_CREDENTIALS
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
                base: `${BACKEND_BASE_PATH}/users`,
                editPassword: `${BACKEND_BASE_PATH}/users/change-user-password`,
                assignRole: `${BACKEND_BASE_PATH}/users/assign-role`
            },
            roles: {
                base: `${BACKEND_BASE_PATH}/roles`
            },
            items: {
                base: `${BACKEND_BASE_PATH}/items`
            }
        }
    }
};
