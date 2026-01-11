export function getUserFriendlyError(status: number, technicalMessage?: string): string {
  const errorMap: Record<number, string> = {
    400: "Invalid request. Please check your input and try again.",
    401: "Access denied. Please log in to continue.",
    403: "You don't have permission to perform this action.",
    404: "The requested resource was not found.",
    409: "This action conflicts with existing data.",
    422: "The provided data is invalid.",
    429: "Too many requests. Please try again later.",
    500: "An unexpected error occurred. Please try again later.",
    502: "Service temporarily unavailable. Please try again later.",
    503: "Service temporarily unavailable. Please try again later.",
    504: "Request timeout. Please try again.",
  };

  const friendlyMessage = errorMap[status] || "An unexpected error occurred. Please try again.";

  if (technicalMessage) {
    console.error(`[HTTP ${status}] Technical details:`, technicalMessage);
  }

  return friendlyMessage;
}

export default getUserFriendlyError;
