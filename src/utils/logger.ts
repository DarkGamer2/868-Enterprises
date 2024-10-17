

export const logError = (message:string, error:Error) => {
    // You can customize this function to log to an external service
    // For example, integrate with Sentry or your own logging server
    console.error(message, error); // Placeholder for development
    // Implement actual logging logic here
  };