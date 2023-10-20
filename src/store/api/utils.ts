export const prepareHeaders = (headers: Headers) => {
  /**
   * set the CSRF token in the header
   */
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];

  if (csrfToken) {
    headers.set("X-CSRFToken", csrfToken);
  }

  return headers;
};
