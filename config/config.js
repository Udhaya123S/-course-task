const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "demo", "test")
      .required(),
    PORT: Joi.number().default(6060),
    DEV_CLIENT_URL: Joi.string()
      .allow("")
      .description("front end development url"),
    DEV_API_URL: Joi.string().allow("").description("development api url"),
    LIVE_CLIENT_URL: Joi.string().allow("").description("front end live url"),
    LIVE_API_URL: Joi.string().allow("").description("live api url"),
    LOCAL_CLIENT_URL: Joi.string().allow("").description("front end local url"),
    LOCAL_API_URL: Joi.string().allow("").default("localhost:7070"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
    SMTP_HOST: Joi.string().description("server that will send the emails"),
    SMTP_PORT: Joi.number().description("port to connect to the email server"),
    SMTP_USERNAME: Joi.string().description("username for email server"),
    SMTP_PASSWORD: Joi.string().description("password for email server"),
    EMAIL_FROM: Joi.string().description(
      "the from field in the emails sent by the app"
    ),
    DEV_DB_HOST: Joi.string()
      .required()
      .description("Postgre DataBase Hostname"),
    DEV_DB_USER: Joi.string()
      .required()
      .description("Postgre Database Username"),
    DEV_DB_PASSWORD: Joi.string()
      .required()
      .description("Postgre Database Password"),
    DEV_DB_NAME: Joi.string().required().description("Postgre Database Name"),
    DEV_DB_DIALECT: Joi.string()
      .required()
      .description("Postgre Database Dialect"),
    DEV_DB_MAX: Joi.number().required().description("Postgre Database Max"),
    DEV_DB_MIN: Joi.number().required().description("Postgre Database Min"),
    DEV_DB_ACQUIRE: Joi.number()
      .required()
      .description("Postgre Database Acquire"),
    DEV_DB_IDLE: Joi.number().required().description("Postgre Database IDLE"),
    DEV_DB_URL: Joi.string().required().description("Postgre DataBase Url"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  //corsOrigin: envVars.NODE_ENV === 'production' ? envVars.LIVE_CLIENT_URL : '*',
  corsOrigin:
    envVars.NODE_ENV === "production"
      ? [
          envVars.LIVE_CLIENT_URL,
          "http://localhost:3001",
          "http://localhost:3000",
        ]
      : envVars.NODE_ENV === "development"
      ? [
          envVars.DEV_CLIENT_URL,
          "http://localhost:3001",
          "http://localhost:3000",
        ]
      : ["http://localhost:3001", "http://localhost:3000"],

  clientURL:
    envVars.NODE_ENV === "production"
      ? envVars.LIVE_CLIENT_URL
      : envVars.NODE_ENV === "development"
      ? envVars.DEV_CLIENT_URL
      : "http://localhost:3005",

  appURL:
    envVars.NODE_ENV === "production"
      ? envVars.LIVE_API_URL
      : envVars.NODE_ENV === "development"
      ? envVars.DEV_API_URL
      : envVars.LOCAL_API_URL,

  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
    emailVerificationExpirationDays: 15,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  database: {
    host:
      envVars.NODE_ENV === "production"
        ? envVars.LIVE_DB_HOST
        : envVars.DEV_DB_HOST,
    user:
      envVars.NODE_ENV === "production"
        ? envVars.LIVE_DB_USER
        : envVars.DEV_DB_USER,
    password:
      envVars.NODE_ENV === "production"
        ? envVars.LIVE_DB_PASSWORD
        : envVars.DEV_DB_PASSWORD,
    name:
      envVars.NODE_ENV === "production"
        ? envVars.LIVE_DB_NAME
        : envVars.DEV_DB_NAME,
    dialect:
      envVars.NODE_ENV === "production"
        ? envVars.LIVE_DB_DIALECT
        : envVars.DEV_DB_DIALECT,
    max:
      envVars.NODE_ENV === "production"
        ? envVars.LIVE_DB_MAX
        : envVars.DEV_DB_MAX,
    min:
      envVars.NODE_ENV === "production"
        ? envVars.LIVE_DB_MIN
        : envVars.DEV_DB_MIN,
    acquire:
      envVars.NODE_ENV === "production"
        ? envVars.LIVE_DB_ACQUIRE
        : envVars.DEV_DB_ACQUIRE,
    idle:
      envVars.NODE_ENV === "production"
        ? envVars.LIVE_DB_IDLE
        : envVars.DEV_DB_IDLE,
  },
  s3: {
    secret: envVars.AWS_SECRET_ACCESS_KEY,
    access: envVars.AWS_ACCESS_KEY,
    region: envVars.AWS_REGION,
    bucket: envVars.AWS_BUCKET,
  },
  twillio: {
    accountSid: envVars.TWILIO_ACCOUNT_SID,
    authToken: envVars.TWILIO_AUTH_TOKEN,
    serviceSid: envVars.TWILIO_SERVICE_SID,
    from: envVars.TWILIO_PHONE_NUMBER,
  },
  stripe: {
    secret:
      envVars.NODE_ENV === "production"
        ? envVars.STRIPE_SECRET
        : envVars.STRIPE_SECRET_TEST,
  },
  image: {
    url:
      envVars.NODE_ENV === "production"
        ? envVars.LIVE_IMAGE_URL
        : envVars.DEV_IMAGE_URL,
  },
  freshdesk: {
    apiKey:
      envVars.NODE_ENV === "production"
        ? envVars.LIVE_FRESHDESK_APIKEY
        : envVars.DEV_FRESHDESK_APIKEY,
    url:
      envVars.NODE_ENV === "production"
        ? envVars.LIVE_FRESHDESK_URL
        : envVars.DEV_FRESHDESK_URL,
  },
};
