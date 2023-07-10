/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const jsonRepository = require('./jsonRepository');

// eslint-disable-next-line no-undef
module.exports = (req, res, next) =>
{
    if (req.url === '/logout' && req.method === 'POST')
    {
        req.method = 'GET';
        jsonRepository.removeRefreshToken(() =>
        {
            next();
        });
    }
    else
    {
        next();
    }
};
