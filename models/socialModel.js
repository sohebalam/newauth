import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: false, // only required for facebook users
      index: {
        unique: true,
        partialFilterExpression: { email: { $type: "string" } },
      },
      default: null,
      lowercase: true,
    },
    update: {
      type: String,

      // select: false,
    },
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User
