function isValidUrl(value) {
  try {
    new URL(value);
    return true; // If the URL constructor succeeds, return true
  } catch (error) {
    return false; // If the URL constructor throws an error, return false
  }
}

export default isValidUrl;
