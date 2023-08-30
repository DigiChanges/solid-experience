/* eslint-disable no-undef */
const jsonRepository = require('./jsonRepository');

module.exports = (req, res, next) =>
{
    if (req.url === '/permissions' && req.method === 'POST')
    {
        const permissions = {
            data: [
                {
                    group: 'AUTH',
                    permissions: [
                        'authSyncPermissions',
                        'getPermissions'
                    ]
                },
                {
                    group: 'USERS',
                    permissions: [
                        'usersSave',
                        'usersUpdate',
                        'usersShow',
                        'usersList',
                        'usersDelete',
                        'usersAssignRole',
                        'usersChangeMyPassword',
                        'usersChangeUserPassword'
                    ]
                },
                {
                    group: 'ROLES',
                    permissions: [
                        'rolesSave',
                        'rolesUpdate',
                        'rolesShow',
                        'rolesList',
                        'rolesDelete'
                    ]
                },
                {
                    group: 'OTHERS',
                    permissions: [
                        'all'
                    ]
                }
            ]
        };

        req.method = 'GET';

        return permissions;
    }

    next();
};
