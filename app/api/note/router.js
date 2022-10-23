const controller = require('./controller')

module.exports = (router) => {
    router.get('/note/:id', async (req, res) => {
        await controller.read(req, res)
    })
}