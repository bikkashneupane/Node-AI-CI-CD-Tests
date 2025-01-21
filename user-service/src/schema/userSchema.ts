import mongoose, { Document, Schema, Model } from "mongoose"
import bcrypt from "bcrypt"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

export interface IUser {
  name: string
  email: string
  password: string
  refreshJWT?: string
}

export interface IUserDocs extends IUser, Document {}

const userSchema: Schema<IUserDocs> = new mongoose.Schema<IUserDocs>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    refreshJWT: { type: String, default: null },
  },
  {
    timestamps: true,
  }
)

// hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// method to check if entered password matches in db
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

userSchema.plugin(mongooseAggregatePaginate)

export const UserModel: Model<IUserDocs> = mongoose.model<IUserDocs>(
  "User",
  userSchema
)
