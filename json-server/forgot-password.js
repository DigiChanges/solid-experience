// eslint-disable-next-line no-undef
module.exports = (req, res, next) =>
{
    if (req.url === '/forgot-password' && req.method === 'POST')
    {
        req.method = 'GET';
    }
    next();
};
