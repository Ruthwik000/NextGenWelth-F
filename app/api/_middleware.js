import { NextResponse } from 'next/server';

export async function middleware(request) {
  try {
    // Continue to the API route
    return NextResponse.next();
  } catch (error) {
    console.error('API Middleware Error:', error);
    
    // Return a more helpful error message
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'An error occurred while processing your request',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Server error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export const config = {
  matcher: '/api/:path*',
};
