const { useState, useEffect } = require("react");

export const useApi = (apiPromiseFunc, defaultValue = null, deps = []) => {
  const [data, setData] = useState(defaultValue);
  const [ready, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const func = apiPromiseFunc.then ? apiPromiseFunc : apiPromiseFunc();

    func
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
  }, deps);

  return { ready, error, data };
};
