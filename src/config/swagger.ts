import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";
dotenv.config({
  path: `${process.env.NODE_ENV ? ".env." + process.env.NODE_ENV : ".env"}`,
});

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Ecommerce Tasks.",
    description: "Ecommerce Tasks API",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  servers: [
    {
      url: `${process.env.SWAGGER_API_URL}/api/v1`,
    },
    {
      url: `http://localhost:{port}/api/v1/`,
      variables: {
        port: {
          default: "3001",
        },
      },
    },
  ],
};

// options for the swagger docs
const options = {
  failOnErrors: true,
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ["./src/docs/*.yaml"],
};

// initialize swagger-jsdoc
export default swaggerJSDoc(options);
