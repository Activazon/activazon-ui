export const capitalizeWords = (string) => {
  // Split the string into an array of words
  const words = string.split(" ");

  // Capitalize the first character of each word and join the words back into a string
  return words.map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
};
