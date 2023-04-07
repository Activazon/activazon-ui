const { useState, useEffect } = require("react");

export const useApi = (apiPromiseFunc, defaultValue = null, deps = []) => {
  const [data, setData] = useState(defaultValue);
  const [ready, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    apiPromiseFunc()
      .then((resp) => {
        if (resp.error) {
          throw resp.error;
        }
        setData(resp);
        setIsReady(true);
        setSuccess(true);
      })
      .catch((err) => {
        setError(err);
        setIsReady(true);
        setSuccess(false);
      });
  }, deps);

  return { ready, error, data, success };
};
