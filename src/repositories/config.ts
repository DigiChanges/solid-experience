const API_PROTOCOL  = import.meta.env.VITE_API_PROTOCOL as string || 'http';
const API_HOSTNAME = import.meta.env.VITE_API_HOSTNAME as string || 'localhost';
const API_PORT = import.meta.env.VITE_API_PORT as string || 8089;

const BACKEND_BASE_PATH = 'api';

export const config = {
    apiGateway: {
        server: {
            protocol: API_PROTOCOL,
            hostname: API_HOSTNAME,
            port: API_PORT
        },
        routes: {
            auth: {
                login: `${BACKEND_BASE_PATH}/auth/login`,
                permissionsGetAll: `${BACKEND_BASE_PATH}/auth/permissions`,
                keepAlive: `${BACKEND_BASE_PATH}/auth/keep-alive`,
                forgotPassword: `${BACKEND_BASE_PATH}/auth/forgot-password`,
                changeForgotPassword: `${BACKEND_BASE_PATH}/auth/change-forgot-password`
            },
            users: {
                getAll: `${BACKEND_BASE_PATH}/users`,
                getOne: `${BACKEND_BASE_PATH}/users`,
                create: `${BACKEND_BASE_PATH}/users`,
                update: `${BACKEND_BASE_PATH}/users`,
                remove: `${BACKEND_BASE_PATH}/users`,
                editPassword: `${BACKEND_BASE_PATH}/users/change-user-password/:id`,
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
