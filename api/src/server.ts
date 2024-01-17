import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import cors from 'cors';
import { ErrorRequestHandler } from 'express';
import routes from './router'

const app = express();
const defaultPort = 8080;
const defaultAllowOrigin = 'http://localhost:3000';

const PORT = process.env.PORT || defaultPort;
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || defaultAllowOrigin;

// CORS middleware
app.use(cors({
  origin: ALLOW_ORIGIN,
  methods: 'GET,PUT,POST,DELETE',
}));
console.log(`Server is allowing origin: ${ALLOW_ORIGIN}`);

// JSON parser middleware
app.use(express.json());

// OpenAPI validator middleware
app.use(
	OpenApiValidator.middleware({
    apiSpec: './openapi.yaml',
    validateRequests: true,
    validateResponses: true
	}),
);

app.use(routes)

// Error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
};
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
