const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 50
  },
  date: {
    type: Date,
    default: Date.now
  },
  user:  { type : Schema.Types.ObjectId, ref: 'user' }
})

/* To hide private keys */
TodoSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = Todo = mongoose.model('todo', TodoSchema)