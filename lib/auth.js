import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  user: {
    modelName: "users",
    additionalFields: {
      role: { type: "string", defaultValue: "customer", input: true },
      businessName: { type: "string", required: false, input: true },
      isBlocked: { type: "boolean", defaultValue: false, input: false },
      subscriptionPlan: { type: "string", defaultValue: "free", input: false },
      subscriptionExpiresAt: { type: "date", required: false, input: false },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const allowedRoles = ["vendor", "customer"];
          const role = allowedRoles.includes(user.role) ? user.role : "customer";
          return { data: { ...user, role } };
        },
      },
    },
  },
});