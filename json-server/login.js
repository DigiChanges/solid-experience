// eslint-disable-next-line no-undef
module.exports = ( req, res, next ) =>
{
    if ( req.url === '/super-admin-login' && req.method === 'POST' )
    {
        req.method = 'GET';
    }
    next();
};
