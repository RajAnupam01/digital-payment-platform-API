import express from "express";
import dns from "dns"
import cors from "cors"
import authRoutes from "./src/routes/auth.routes.js"
import userRoutes from "./src/routes/user.routes.js"
import kycRoutes from "./src/routes/kyc.routes.js"
import bankAccountRoutes from "./src/routes/bankAccount.routes.js"
import transactionRoutes from "./src/routes/transaction.routes.js"
import beneficairyRoutes from "./src/routes/beneficairy.routes.js"
import notificationRoutes from "./src/routes/notification.routes.js"
import accountLedgerRoutes from "./src/routes/accountLedger.routes.js"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/docs/swagger.js";
import errorMiddleware from "./src/middlewares/error.middleware.js"
import dotenv from "dotenv"
dotenv.config()

dns.setServers(["1.1.1.1", "0.0.0.0"])

const app = express();

app.get("/", (req, res) => {
  res.send({
    success: true,
    project: "Digital Payment Platform API",
    status: "Running",
    documentation: "/api-docs",
    message:
      "Append '/api-docs' to this URL to view and test the API documentation using Swagger UI."
  })
})
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/kyc", kycRoutes)
app.use("/api/bank", bankAccountRoutes)
app.use("/api/transaction", transactionRoutes)
app.use("/api/beneficairy", beneficairyRoutes)
app.use("/api/notification", notificationRoutes)
app.use("/api/accountLedger", accountLedgerRoutes)

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);


app.use(errorMiddleware);


export default app;