import { useState, useCallback } from "react";

const usePost = (token) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (req) => {
    setIsLoading(true);
    setError(null);

    //console.log(req);
    try {
      const response = await fetch(req.url, {
        method: "POST",
        headers: {
          Accept: "application/json ,text/plain,*/*",
          "Content-type": "application/json",
          Authentication: token ? "Bearer " + token : null,
        },
      }).then((res) => res.json());

      if (!response.ok) {
        setError("Post call failed");
      }

      req.do(response);
    } catch (err) {
      //console.log(err);
      setError("Something went wrong!");
    }
    setIsLoading(false);
  }, [token]);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default usePost;
