"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  try {
    // Check environment variables
    const envVars = {
      DATABASE_URL: process.env.DATABASE_URL ? "Set" : "Missing",
      DIRECT_URL: process.env.DIRECT_URL ? "Set" : "Missing",
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? "Set" : "Missing",
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? "Set" : "Missing",
      GEMINI_API_KEY: process.env.GEMINI_API_KEY ? "Set" : "Missing",
      RESEND_API_KEY: process.env.RESEND_API_KEY ? "Set" : "Missing",
      ARCJET_KEY: process.env.ARCJET_KEY ? "Set" : "Missing",
      INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY ? "Set" : "Missing",
      INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY ? "Set" : "Missing",
    };

    // Test database connection
    let dbStatus = "Not tested";
    try {
      const prisma = new PrismaClient();
      await prisma.$connect();
      dbStatus = "Connected successfully";
      await prisma.$disconnect();
    } catch (dbError) {
      dbStatus = `Error: ${dbError.message}`;
    }

    return NextResponse.json({
      status: "Debug information",
      environment: process.env.NODE_ENV,
      environmentVariables: envVars,
      databaseConnection: dbStatus,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Error",
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : "Hidden in production",
    }, { status: 500 });
  }
}
