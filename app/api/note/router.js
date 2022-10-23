const controller = require('./controller')

module.exports = (router) => {
    router.get('/note/:id', async (req, res) => {
        await controller.read(req, res)
    })

    router.post('/note', async (req, res) => {
        await controller.create(req, res)
    })
}