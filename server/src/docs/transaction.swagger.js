const transactionPaths = {
  "api/transaction/transfer": {
    post: {
      tags: ["Transactions"],
      summary: "Transfer money",

      description:
        "Send money to another user using their UPI ID.",

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
                "receiverUpiId",
                "amount",
                "pin"
              ],

              properties: {
                receiverUpiId: {
                  type: "string",
                  example: "9876543210@sbi"
                },

                amount: {
                  type: "number",
                  minimum: 1,
                  maximum: 100000,
                  example: 500
                },

                pin: {
                  type: "string",
                  example: "1234"
                }
              }
            }
          }
        }
      },

      responses: {
        200: {
          description: "Transaction successful"
        },

        400: {
          description:
            "Transaction failed (invalid PIN, insufficient balance, receiver not found, self transfer, server error)"
        },

        401: {
          description: "Unauthorized"
        },

        404: {
          description:
            "Sender account or receiver account not found"
        }
      }
    }
  }
};

export default transactionPaths;