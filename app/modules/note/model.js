const { Model } = require('app/modules/common')
const { Schema } = require('mongoose')

class NoteModel extends Model {
  schema() {
    return {
      title: {
        type: String,
        trim: true,
        required: true
      },
      message: {
        type: String,
        trim: true,
        required: true
      },
      owner: {
        // type: Schema.Types.ObjectId,
        type: String,
        ref: "User",
        required: true
      }
    }
  }
}

module.exports = NoteModel
