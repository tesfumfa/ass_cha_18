// const { Schema, model } = require("mongoose");
const Thought = require("./Thought");

// const UserSchema = new Schema(
//   {
//     username: {
//       type: String,
//       unique: true,
//       required: "You need to provide a username!",
//       trim: true,
//     },
//     email: {
//       type: String,
//       unique: true,
//       required: "You need to provide an email!",
//       trim: true,
//       match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
//     },
//     // array of _id values ref Thought model
//     thoughts: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Thought",
//       },
//     ],
//     // array of _id values ref User model (self ref)
//     friends: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//   },
//   {
//     toJSON: {
//       virtuals: true,
//     },
//     id: false,
//   }
// );

// UserSchema.virtual("friendCount").get(function () {
//   return this.friends.length;
// });

// const User = model("User", UserSchema);

// module.exports = User;

const { Schema, model } = require('mongoose');
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// BONUS
userSchema.pre("findOneAndDelete", { document: false, query: true }, async function() {
    console.log("User pre-delete");
    const doc = await this.model.findOne(this.getFilter());
    console.log(doc.username);
    await Thought.deleteMany({ username: doc.username });
});

const User = model('User', userSchema);
module.exports = User;