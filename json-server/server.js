/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require( 'path' );
const jsonServer = require( 'json-server' );
const login = require( './login' );
const logout = require( './logout' );
const server = jsonServer.create();
const router = jsonServer.router( path.resolve( __dirname, 'db.json' ) );
const middlewares = jsonServer.defaults();
server.use( middlewares );

server.use( jsonServer.rewriter( {
    '/api/*': '/$1',
    '/auth/login': '/super-admin-login',
    '/auth/account': '/users',
    '/auth/logout': '/logout',
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
server.use( logout );
server.use( router );

server.listen( 8089, () =>
{
    console.log( 'JSON Server is running on port 8089' );
} );
