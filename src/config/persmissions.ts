export const ADMIN = 'superadmin';

export const permissions = {
    USERS: {
        LIST: 'usersList',
        SAVE: 'usersSave',
        UPDATE: 'usersUpdate',
        SHOW: 'usersShow',
        DELETE: 'usersDelete',
        CHANGE_MY_PASSWORD: 'usersChangeMyPassword',
        CHANGE_USER_PASSWORD: 'usersChangeUserPassword',
    },
    AUTH: {
        KEEP_ALIVE: 'authKeepAlive',
        SYNC_PERMISSIONS: 'authSyncPermissions',
    },
    ITEMS: {
        SAVE: 'itemsSave',
        UPDATE: 'itemsUpdate',
        SHOW: 'itemsShow',
        LIST: 'itemsList',
        DELETE: 'itemsDelete',
    },
    ROLES: {
        SAVE: 'rolesSave',
        UPDATE: 'rolesUpdate',
        SHOW: 'rolesShow',
        LIST: 'rolesList',
        DELETE: 'rolesDelete',
    },
    GET_PERMS: 'getPermissions',
    FILES_LIST: {
        UPLOAD: 'filesUpload',
        UPDATE: 'filesUpdate',
        DOWNLOAD: 'filesDownload',
    },
};
