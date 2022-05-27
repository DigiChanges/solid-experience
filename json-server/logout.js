// eslint-disable-next-line no-undef
module.exports = ( req, res, next ) =>
{
    if ( req.url === '/logout' && req.method === 'POST' )
    {
        req.method = 'GET';
    }
    next();
};
