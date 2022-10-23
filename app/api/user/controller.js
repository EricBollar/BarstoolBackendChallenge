const userService = require('app/modules/user')

/**
 * @method read
 */
exports.read = async (req, res) => {
  const user = await userService.findById(req.params.id)
  res.status(200).send(user)
}

/**
 * @method update
 */
exports.update = async (req, res) => {

  // there is no function readAndUpdate in app/modules...
  // const user = await userService.readAndUpdate(req.params.id, req.body)

  const user = await userService.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send(user)
}

/**
 * @method readNotes
 */
 exports.readNotes = async (req, res) => {
  const user = await userService.findById(req.params.id)
  res.status(200).send(user.notes)
}
