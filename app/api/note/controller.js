const noteService = require('app/modules/note');

/**
 * @method update
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