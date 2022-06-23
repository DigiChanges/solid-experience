/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require( 'path' );
const jsonServer = require( 'json-server' );
const login = require( './login' );
const refreshToken = require( './refreshToken' );
const logout = require( './logout' );
const forgotPassword = require( './forgot-password' );
const server = jsonServer.create();
const router = jsonServer.router( path.resolve( __dirname, 'db.json' ) );
const middlewares = jsonServer.defaults();
server.use( middlewares );

server.use( jsonServer.rewriter( {
    '/api/*': '/$1',
    '/auth/login': '/super-admin-login',
    '/auth/refresh-token': '/refresh-token',
    '/auth/account': '/users',
    '/auth/logout': '/logout',
    '/auth/forgot-password': '/forgot-password',
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
server.use( refreshToken );
server.use( logout );
server.use( forgotPassword );
server.use( router );

server.listen( 8090, () =>
{
    console.log( 'JSON Server is running on port 8090' );
} );
