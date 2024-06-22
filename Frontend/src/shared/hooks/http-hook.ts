import { useState, useCallback } from "react";
import axios from "axios";

interface HttpResponse<T> {
  data: T;
}

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(
    async <T>(
      url: string,
      method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
      body: any = null,
      headers: any = {}
    ): Promise<HttpResponse<T>> => {
      setIsLoading(true);
      try {
        const response = await axios({
          url,
          method,
          data: body,
          headers,
        });
        setIsLoading(false);
        return response;
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
