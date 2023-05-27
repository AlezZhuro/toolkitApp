import { useState } from "react";

type UseReuestReturnStateType = {
  response: undefined | any;
  isLoading: boolean;
  error: undefined | any;
};

interface UseRequestInterface {
  makeRequest: (query: string) => void;
  data: UseReuestReturnStateType;
}

const baseUrl = "https://api.github.com/graphql";

export function useQueryRequest(): UseRequestInterface {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const makeRequest = async (query: string) => {
    try {
      setIsLoading(true);

      const request = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const result = await request.json();
      
      setResponse(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { makeRequest, data: { response, isLoading, error } };
}
