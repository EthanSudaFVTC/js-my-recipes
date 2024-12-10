
const router = require('express').Router()
const recipes = require('../../../data/recipes.json')


// GET /api/v1 - return id, title, image, prepTime and diffuculty for all recipes in database

router.get('/', (request, response) => {
    const result = recipes.map(({ id, title, image, prepTime, difficulty }) => ({
        id, title, image, prepTime, difficulty
    }))
    response.json(result)
})


// POST /api/v1/recipe/add - This route should add a new recipe to the array of recipes. The request body should contain the recipe object to add. The route should return the added recipe.

router.post('/recipe/add', (request, response) => {
    const { id, title, image, prepTime, difficulty } = request.body
    const result = { id: recipes.length + 1,
        title, image, prepTime, difficulty };
    recipes.push(result) // !!!
    response.json(result)
})


// GET /api/v1/recipe/:id - This route should return the full recipe object for the recipe with the specified id.

router.get('/recipe/:id', (request, response) => {
    const { id } = request.params
    const found = recipes.find(r => r.id.toString() === id.toString())
    if (found) response.json(found)
    else response.send({ error : { message: `Could not find recipe with id: ${id}` }})
})


module.exports = router