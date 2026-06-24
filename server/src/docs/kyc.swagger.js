const kycPaths = {
  "api/kyc/verify": {
    post: {
      tags: ["KYC"],
      summary: "Complete KYC verification",
      description:
        "Completes user KYC, generates UPI ID, creates bank account and assigns an initial balance.",

      security: [
        {
          bearerAuth: []
        }
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "pin",
                "phone",
                "accountNumber",
                "bankName"
              ],

              properties: {
                pin: {
                  type: "string",
                  pattern: "^[0-9]{4}$",
                  example: "1234"
                },

                phone: {
                  type: "string",
                  pattern: "^[0-9]{10}$",
                  example: "9876543210"
                },

                accountNumber: {
                  type: "string",
                  pattern: "^[0-9]{12}$",
                  example: "123456789012"
                },

                bankName: {
                  type: "string",
                  enum: [
                    "sbi",
                    "hdfc",
                    "icici",
                    "axis",
                    "yes",
                    "pnb"
                  ],
                  example: "sbi"
                }
              }
            }
          }
        }
      },

      responses: {
        200: {
          description: "KYC completed successfully"
        },

        400: {
          description: "KYC already completed"
        },

        401: {
          description: "Unauthorized"
        },

        404: {
          description: "User not found"
        }
      }
    }
  }
};

export default kycPaths;