import { useState, useCallback } from "react";
import { useAuthContext } from "../auth/authContext";

const useGet = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authObject = useAuthContext();
  const authToken = authObject.authState.token;

  const sendRequest = useCallback(
    async (handleData) => {
      setIsLoading(true);
      setError(null);

      const response = await fetch(url, {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
        .then((response) => response.json())
        .then((res) => handleData(res))
        .then(() => setIsLoading(false))
        .catch(() => {
          setError("error");
          setIsLoading(false);
        });

    },
    [authToken, url]
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useGet;