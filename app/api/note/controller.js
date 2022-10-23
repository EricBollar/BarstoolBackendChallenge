const noteService = require('app/modules/note');
const userService = require('app/modules/user');

/**
 * @method read
 */
exports.read = async (req, res) => {
    // returns the note given the note's id
    const note = await noteService.findById(req.params.id);
    if (note) {
        res.status(200).send(note)
    } else {
        res.status(404).send()
    }
}

/**
 * @method create
 */
 exports.create = async (req, res) => {
    const user = await noteService.create(req.body).then(dbNote => {
        // returns user with updated notes
        return userService.findByIdAndUpdate(
            req.body.owner,
            { $push: { notes: dbNote.id } },
            { new: true, useFindAndModify: false }
        )
    })
    if (user) {
        res.status(200).send({id: user.notes[user.notes.length-1]})
    } else {
        res.status(404).send()
    }
}