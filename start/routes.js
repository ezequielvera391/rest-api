'use strict'

const UserController = require('../app/Controllers/Http/UserController')

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

Route.group(()=> {
  Route.post('users/register', 'UserController.store');
  Route.post('users/login', 'UserController.login');

  Route.get('project', 'ProjectController.index').middleware('auth');
  Route.post('project', 'ProjectController.create').middleware('auth');
  Route.patch('project/:project_id', 'ProjectController.update').middleware('auth');
  Route.delete('project/:project_id', 'ProjectController.destroy').middleware('auth');

  Route.get('project/:project_id/tasks', 'TaskController.index').middleware('auth');
  Route.post('project/:project_id/tasks', 'TaskController.create').middleware('auth');
}).prefix('api/v1/')

// adonis usa el modelo vista controlador 
// debemos crear un controlador que maneje todos los metodos que utilicemos para -en este caso- los usuarios
// las rutas deben estar lo más limpias posibles y no contener logica