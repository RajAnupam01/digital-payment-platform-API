const userPaths = {
  "api/users/me": {
    get: {
      tags: ["Users"],
      summary: "Get current user profile",
      security: [{ bearerAuth: [] }],

      responses: {
        200: {
          description: "User profile fetched successfully"
        },
        401: {
          description: "Unauthorized"
        },
        404: {
          description: "User not found"
        }
      }
    }
  },

  "api/users/{id}": {
    put: {
      tags: ["Users"],
      summary: "Update user profile",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string"
          }
        }
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: {
                  type: "string",
                  minLength: 2,
                  maxLength: 20,
                  example: "Anurag Kumar"
                }
              }
            }
          }
        }
      },

      responses: {
        200: {
          description: "Profile updated successfully"
        },
        404: {
          description: "User not found"
        }
      }
    },

    delete: {
      tags: ["Users"],
      summary: "Delete user account",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string"
          }
        }
      ],

      responses: {
        200: {
          description: "Account deleted successfully"
        },
        404: {
          description: "User not found"
        }
      }
    }
  },

  "api/users/{id}/password": {
    put: {
      tags: ["Users"],
      summary: "Update password",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string"
          }
        }
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["newPassword"],
              properties: {
                newPassword: {
                  type: "string",
                  minLength: 6,
                  maxLength: 12,
                  example: "newpass123"
                }
              }
            }
          }
        }
      },

      responses: {
        200: {
          description: "Password updated successfully"
        },
        404: {
          description: "User not found"
        }
      }
    }
  },

  "api/users/reset-pin/request": {
    post: {
      tags: ["Users"],
      summary: "Request PIN reset OTP",
      security: [{ bearerAuth: [] }],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["phone"],
              properties: {
                phone: {
                  type: "string",
                  example: "9876543210"
                }
              }
            }
          }
        }
      },

      responses: {
        200: {
          description: "OTP sent for PIN reset"
        }
      }
    }
  },

  "api/users/reset-pin/verify": {
    post: {
      tags: ["Users"],
      summary: "Verify PIN reset OTP",
      security: [{ bearerAuth: [] }],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "phone",
                "code",
                "newPin"
              ],
              properties: {
                phone: {
                  type: "string",
                  example: "9876543210"
                },
                code: {
                  type: "string",
                  example: "123456"
                },
                newPin: {
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
          description: "PIN reset successful"
        },
        400: {
          description: "Invalid or expired OTP"
        }
      }
    }
  },

  "api/users/forgot-password/request": {
    post: {
      tags: ["Users"],
      summary: "Request password reset OTP",
      security: [{ bearerAuth: [] }],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["phone"],
              properties: {
                phone: {
                  type: "string",
                  example: "9876543210"
                }
              }
            }
          }
        }
      },

      responses: {
        200: {
          description: "OTP sent for password reset"
        }
      }
    }
  },

  "api/users/forgot-password/verify": {
    post: {
      tags: ["Users"],
      summary: "Verify password reset OTP",
      security: [{ bearerAuth: [] }],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "phone",
                "code",
                "newPassword"
              ],
              properties: {
                phone: {
                  type: "string",
                  example: "9876543210"
                },
                code: {
                  type: "string",
                  example: "123456"
                },
                newPassword: {
                  type: "string",
                  minLength: 6,
                  maxLength: 12,
                  example: "newpass123"
                }
              }
            }
          }
        }
      },

      responses: {
        200: {
          description: "Password reset successful"
        },
        400: {
          description: "Invalid or expired OTP"
        }
      }
    }
  }
};

export default userPaths;