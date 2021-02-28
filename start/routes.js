'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/user', 'UserController.store')

Route.post('/login', 'UserController.login')

Route.get('/user', 'UserController.index').middleware(['auth'])

Route.get('/user/:id', 'UserController.show').middleware(['auth'])

Route.delete('/user/me', 'UserController.destroy').middleware(['auth'])

Route.post('/post', 'PostController.store').middleware(['auth'])

Route.get('/post', 'PostController.index').middleware(['auth'])

Route.get('/post/search', 'PostController.search').middleware(['auth'])

Route.get('/post/:id', 'PostController.show').middleware(['auth'])

Route.put('/post/:id', 'PostController.edit').middleware(['auth'])

Route.delete('/post/:id', 'PostController.destroy').middleware(['auth'])

