const authPaths = {
  "/api/auth/register": {
    post: {
      tags: ["Authentication"],
      summary: "Register a new user",
      description:
        "Creates a user account and sends an OTP for verification.",

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "phone", "password"],
              properties: {
                name: {
                  type: "string",
                  minLength: 2,
                  maxLength: 20,
                  example: "Anu"
                },
                phone: {
                  type: "string",
                  example: "9876543210"
                },
                password: {
                  type: "string",
                  minLength: 6,
                  maxLength: 12,
                  example: "secret123"
                }
              }
            }
          }
        }
      },

      responses: {
        201: {
          description: "OTP sent successfully"
        },
        409: {
          description: "User already exists"
        },
        400: {
          description: "Validation error"
        }
      }
    }
  },

  "/api/auth/register-otp": {
    post: {
      tags: ["Authentication"],
      summary: "Verify registration OTP",

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["phone", "code"],
              properties: {
                phone: {
                  type: "string",
                  example: "9876543210"
                },
                code: {
                  type: "string",
                  example: "123456"
                }
              }
            }
          }
        }
      },

      responses: {
        200: {
          description:
            "User verified and tokens generated"
        },
        400: {
          description:
            "Invalid or expired OTP"
        }
      }
    }
  },

  "/api/auth/login": {
    post: {
      tags: ["Authentication"],
      summary: "Login user",

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["phone", "password"],
              properties: {
                phone: {
                  type: "string",
                  example: "9876543210"
                },
                password: {
                  type: "string",
                  example: "secret123"
                }
              }
            }
          }
        }
      },

      responses: {
        200: {
          description:
            "Login successful"
        },
        401: {
          description:
            "Invalid credentials"
        },
        403: {
          description:
            "Account blocked or suspended"
        }
      }
    }
  },

  "/api/auth/logout": {
    post: {
      tags: ["Authentication"],
      summary: "Logout user",

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["refreshToken"],
              properties: {
                refreshToken: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIs..."
                }
              }
            }
          }
        }
      },

      responses: {
        200: {
          description:
            "Logged out successfully"
        },
        404: {
          description:
            "Invalid refresh token"
        }
      }
    }
  },

  "/api/auth/rotate-token": {
    post: {
      tags: ["Authentication"],
      summary: "Rotate refresh token",

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["refreshToken"],
              properties: {
                refreshToken: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIs..."
                }
              }
            }
          }
        }
      },

      responses: {
        200: {
          description:
            "Token refreshed successfully"
        },
        401: {
          description:
            "Refresh token invalid or expired"
        }
      }
    }
  }
};

export default authPaths;