import fetch from "node-fetch";

export const postVerifyPin = async (pin) => {
  const resp = await fetch("/api/verify-pin", {
    method: "POST",
    body: JSON.stringify({ pin }),
    headers: { "Content-Type": "application/json" },
  });

  return resp.json();
};
