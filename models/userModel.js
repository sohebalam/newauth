import mongoose from "mongoose"

const nuserSchema = mongoose.Schema(
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
    password: {
      type: String,

      // select: false,
    },
    update: {
      type: String,

      // select: false,
    },
    

  },
  { timestamps: true }
)

const NUser = mongoose.models.NUser || mongoose.model("NUser", nuserSchema)

export default NUser
