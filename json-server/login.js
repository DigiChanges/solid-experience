/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const jsonRepository = require( './jsonRepository' );

module.exports = ( req, res, next ) =>
{
    if ( req.url === '/super-admin-login' && req.method === 'POST' )
    {
        const refreshToken = {
            user: {
                id: '922465bc-db4e-4794-b25c-9311ce124e00',
                firstName: 'Super',
                lastName: 'Admin',
                email: 'superadmin@node.com',
                enable: true,
                permissions: [],
                roles: [],
                isSumerAdmin: true,
                createdAt: 1651255968,
                updatedAt: 1651255968,
            },
            expires: 1689176366,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6IjIxNDJiMjMzLTEwZDUtNDIyZS04OTRmLTc3MzUwMzA2ZWI5NSIsImlzcyI6InNtYXJ0bmV0IiwiYXVkIjoic21hcnRuZXQuY29tIiwic3ViIjoic3VwZXJhZG1pbkBub2RlLmNvbSIsImlhdCI6MTY4OTE3NjM2NiwiZXhwIjoxNjg5MTc2MzY2LCJ1c2VySWQiOiI5MjI0NjViYy1kYjRlLTQ3OTQtYjI1Yy05MzExY2UxMjRlMDAiLCJlbWFpbCI6InN1cGVyYWRtaW5Abm9kZS5jb20iLCJ0ZW5hbnQiOiJwdWJsaWMifQ.TpYXC1KqDO8XjbAqlP1joX0ye1Drsh2NMnOCS4Cn8bC3mQ_iRVl6tpTtK1WU_WcQB4c0vrRiULbDz6CHyDdAIQ',
        };

        jsonRepository.saveRefreshToken( refreshToken );

        req.method = 'GET';
    }
    next();
};
