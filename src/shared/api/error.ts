export interface ApiError {
  response?: {
    data?: {
      error?: string;
      message?: string;
      code?: number;
    };
    status?: number;
    statusText?: string;
  };
  message?: string;
  code?: string;
  name?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiResponseError {
  errors?: ValidationError[];
  error?: string;
  message?: string;
}
