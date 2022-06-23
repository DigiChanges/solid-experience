// eslint-disable-next-line no-undef
module.exports = ( req, res, next ) =>
{
    if ( req.url === '/refresh-token' && req.method === 'POST' )
    {
        req.method = 'GET';
    }
    next();
};
