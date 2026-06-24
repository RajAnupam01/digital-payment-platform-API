const bankAccountPaths = {
  "api/bank/balance": {
    get: {
      tags: ["Bank Account"],
      summary: "Get current account balance",

      security: [
        {
          bearerAuth: []
        }
      ],

      responses: {
        200: {
          description: "Balance fetched successfully"
        },

        401: {
          description: "Unauthorized"
        },

        404: {
          description: "Bank account not found"
        }
      }
    }
  },

  "api/bank/account-detail": {
    get: {
      tags: ["Bank Account"],
      summary: "Get bank account details",

      security: [
        {
          bearerAuth: []
        }
      ],

      responses: {
        200: {
          description: "Account details fetched successfully"
        },

        401: {
          description: "Unauthorized"
        },

        404: {
          description: "Bank account not found"
        }
      }
    }
  },

  "api/bank/freeze": {
    patch: {
      tags: ["Bank Account"],
      summary: "Freeze bank account",

      security: [
        {
          bearerAuth: []
        }
      ],

      responses: {
        200: {
          description: "Account frozen successfully"
        },

        401: {
          description: "Unauthorized"
        },

        404: {
          description: "Bank account not found"
        }
      }
    }
  },

  "api/bank/unfreeze": {
    patch: {
      tags: ["Bank Account"],
      summary: "Unfreeze bank account",

      security: [
        {
          bearerAuth: []
        }
      ],

      responses: {
        200: {
          description: "Account unfrozen successfully"
        },

        401: {
          description: "Unauthorized"
        },

        404: {
          description: "Bank account not found"
        }
      }
    }
  }
};

export default bankAccountPaths;