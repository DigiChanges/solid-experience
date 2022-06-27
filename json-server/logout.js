/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require( 'fs' );

// eslint-disable-next-line no-undef
module.exports = ( req, res, next ) =>
{
    if ( req.url === '/logout' && req.method === 'POST' )
    {
        fs.readFile( './db.json', 'utf-8', ( err, jsonData ) =>
        {
            const data = JSON.parse( jsonData );

            delete data['refresh-token'];

            const dataWithoutRefreshToken = JSON.stringify( data, null, 2 );

            fs.writeFileSync( './db.json', dataWithoutRefreshToken );

            req.method = 'GET';
        } );
    }
    next();
};
