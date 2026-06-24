const notificationPaths = {
"/notification": {
get: {
tags: ["Notifications"],
summary: "Get all notifications",
description:"Fetch all notifications for the authenticated user.",

  security: [
    {
      bearerAuth: []
    }
  ],

  responses: {
    200: {
      description: "Notifications fetched successfully",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ApiResponse"
          }
        }
      }
    },

    401: {
      description: "Unauthorized",
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

"/notification/{id}/read": {
patch: {
tags: ["Notifications"],
summary: "Mark notification as read",

  security: [
    {
      bearerAuth: []
    }
  ],

  parameters: [
    {
      in: "path",
      name: "id",
      required: true,
      schema: {
        type: "string"
      },
      example: "6856d8e4c1f1a234567890ab"
    }
  ],

  responses: {
    200: {
      description: "Notification marked as read",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ApiResponse"
          }
        }
      }
    },

    404: {
      description: "Notification not found",
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

"/notification/clear": {
delete: {
tags: ["Notifications"],
summary: "Delete all notifications",

  description:
    "Delete all notifications belonging to the authenticated user.",

  security: [
    {
      bearerAuth: []
    }
  ],

  responses: {
    200: {
      description: "All notifications cleared",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ApiResponse"
          }
        }
      }
    },

    401: {
      description: "Unauthorized",
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

export default notificationPaths;
