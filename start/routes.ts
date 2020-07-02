/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/sessions/create', 'SessionsController.create')

Route.post('/users/create', 'UsersController.create')

Route.get('/products', 'ProductsController.index').middleware('Auth')
Route.post('/products', 'ProductsController.create').middleware('Auth')
Route.put('/products/:product_id', 'ProductsController.update').middleware('Auth')
Route.delete('/products/:product_id', 'ProductsController.delete').middleware('Auth')
