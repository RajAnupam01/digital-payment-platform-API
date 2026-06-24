const accountLedgerPaths = {
  "api/accountLedger/{accountId}": {
    get: {
      tags: ["Account Ledger"],
      summary: "Get account ledger entries",
      description: "Fetch all ledger entries for a bank account.",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          in: "path",
          name: "accountId",
          required: true,
          schema: {
            type: "string"
          },
          example: "6856d8e4c1f1a234567890ab"
        }
      ],

      responses: {
        200: {
          description: "Ledger entries fetched successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse"
              }
            }
          }
        },

        404: {
          description: "No ledger entries found for this account",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiError"
              }
            }
          }
        }
      }
    }
  },

  "api/accountLedger/entry/{ledgerId}": {
    get: {
      tags: ["Account Ledger"],
      summary: "Get single ledger entry",
      description: "Fetch a specific ledger entry by its ID.",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          in: "path",
          name: "ledgerId",
          required: true,
          schema: {
            type: "string"
          },
          example: "6856d8e4c1f1a234567890ab"
        }
      ],

      responses: {
        200: {
          description: "Ledger entry fetched successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse"
              }
            }
          }
        },

        404: {
          description: "Ledger entry not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiError"
              }
            }
          }
        }
      }
    }
  }
};

export default accountLedgerPaths;
