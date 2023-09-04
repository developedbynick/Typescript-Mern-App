import capitalize from "capitalize";

class ApiError extends Error {
  status: "error" | "fail";
  isOperational = true;
  constructor(public statusCode: number, public message: string) {
    // Calling the parent class and passing required arguments to it
    super(capitalize(message));
    // Determining the status from the status code
    this.status = capitalize(
      this.statusCode.toString().startsWith("5") ? "fail" : "error"
    ) as ApiError["status"];
    // This removes this class from the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
export default ApiError;
