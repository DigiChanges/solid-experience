/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require( 'path' );
const jsonServer = require( 'json-server' );
const login = require( './login' );
const server = jsonServer.create();
const router = jsonServer.router( path.resolve( __dirname, 'db.json' ) );
const middlewares = jsonServer.defaults();
server.use( middlewares );

server.use( jsonServer.rewriter( {
    '/api/*': '/$1',
    '/auth/login': '/super-admin-login',
    '/auth/login?provider=local': '/super-admin-login',
    '/auth/permissions': '/permissions',
} ) );

router.render = ( req, res ) =>
{
    res.jsonp( {
        data: res.locals.data,
    } );
};
server.use( login );

server.use( router );

server.listen( 8089, () =>
{
    console.log( 'JSON Server is running on port 8089' );
} );
