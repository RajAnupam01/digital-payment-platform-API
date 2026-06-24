import authPaths from "./auth.swagger.js";
import userPaths from "./user.swagger.js";
import kycPaths from "./kyc.swagger.js";
import bankAccountPaths from "./bankAccount.swagger.js";
import beneficairyPaths from "./beneficairy.swagger.js";
import transactionPaths from "./transaction.swagger.js";
import notificationPaths from "./notification.swagger.js";
import accountLedgerPaths from "./accountLedger.swagger.js"

const swaggerSpec = {
  openapi: "3.0.3",

  info: {
    title: "Digital Wallet API",
    version: "1.0.0",
    description:
      "A secure digital wallet API with authentication, KYC, bank accounts, beneficiaries, transactions, notifications and ledger management."
  },

  servers: [
    {
      url: "https://digital-payment-platform-api.onrender.com/",
      description: "Development Server"
    }
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },

   
  },

  paths: {
    ...authPaths,
    ...userPaths,
    ...kycPaths,
    ...bankAccountPaths,
    ...beneficairyPaths,
    ...transactionPaths,
    ...notificationPaths,
    ...accountLedgerPaths
  }
};

export default swaggerSpec;