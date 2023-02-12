const { useState, useEffect } = require("react");

export const useApi = (apiPromiseFunc, defaultValue = null) => {
  const [data, setData] = useState(defaultValue);
  const [ready, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    apiPromiseFunc()
      .then((resp) => {
        if (resp.error) {
          throw resp.error;
        }

        setData(resp);
        setIsReady(true);
      })
      .catch((err) => {
        setError(err);
        setIsReady(true);
      });
  }, [apiPromiseFunc]);

  return { ready, error, data };
};
