const beneficairyPaths = {
  "/api/beneficairy/add": {
    post: {
      tags: ["Beneficairy"],
      summary: "Add beneficiary",
      description: "Add a user as beneficiary for future transfers.",

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
              required: ["beneficairyId"],
              properties: {
                beneficairyId: {
                  type: "string",
                  example: "6854f8d8b5e9a123456789ab"
                }
              }
            }
          }
        }
      },

      responses: {
        201: {
          description: "Beneficiary added successfully"
        },

        400: {
          description: "Beneficiary already exists"
        },

        401: {
          description: "Unauthorized"
        }
      }
    }
  },

  "/api/beneficairy/fetch": {
    get: {
      tags: ["Beneficairy"],
      summary: "Get all beneficiaries",

      security: [
        {
          bearerAuth: []
        }
      ],

      responses: {
        200: {
          description: "Beneficiaries fetched successfully"
        },

        401: {
          description: "Unauthorized"
        }
      }
    }
  },

  "/api/beneficairy/remove/{id}": {
    delete: {
      tags: ["Beneficairy"],
      summary: "Remove beneficiary",

      security: [
        {
          bearerAuth: []
        }
      ],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string"
          },
          description: "Beneficairy user id"
        }
      ],

      responses: {
        200: {
          description: "Beneficairy removed successfully"
        },

        404: {
          description: "Beneficairy not found"
        },

        401: {
          description: "Unauthorized"
        }
      }
    }
  }
};

export default beneficairyPaths;