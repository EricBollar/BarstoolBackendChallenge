const { Model } = require('app/modules/common')

class UserModel extends Model {
  schema() {
    return {
      firstName: {
        type: String,
        trim: true,
        required: true
      },
      lastName: {
        type: String,
        trim: true,
        required: true
      },
      email: {
        type: String,
        trim: true,
        required: true,
        index: {
          unique: true
        }
      },
      notes: [{
        // type: Schema.Types.ObjectId,
        type: String,
        ref: "Note",
        required: false
      }]
    }
  }
}

module.exports = UserModel
