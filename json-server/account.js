// eslint-disable-next-line no-undef
module.exports = ( req, res, next ) =>
{
    if ( req.url === '/users' && req.method === 'POST' )
    {
        req.method = 'GET';
    }
    next();
};
