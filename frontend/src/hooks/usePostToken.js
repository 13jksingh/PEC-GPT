import { useState, useCallback } from "react";

const usePost = () => {
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
          Authorization: "Bearer " + req.token,
        },
        body: JSON.stringify(req.data),
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
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default usePost;