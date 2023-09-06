const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const Joi = require("joi");

const userScheme = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    token: {
      type: String,
      default: null,
    },

    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userScheme.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string()
    .required()
    .messages({ "any.required": "missing required password field" }),

  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),

  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string()
    .required()
    .messages({ "any.required": "missing required password field" }),

  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),

  subscription: Joi.string(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userScheme);

module.exports = {
  User,
  schemas,
};
