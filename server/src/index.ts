import { environment } from './environment';
import { authMiddleware } from './middleware/auth';
import { obfuscateResponseMiddleware } from './middleware/obfuscate';
import routes from './routers';
import usersRoute from './routers/user';
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// Fetch the user token
app.use(authMiddleware);
app.use(express.json());
const db: string = `${process.env.MONGO_URI}/${environment.mongoDbName}` || `${environment.mongoDbHost}:${environment.mongoDbPort}/${environment.mongoDbName}`;
// MongoDB connection
mongoose.connect(db);
routes.map((route) => {
  app.use(route.path, route.router());
});
app.use(obfuscateResponseMiddleware);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
