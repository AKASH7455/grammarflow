export const readStorage = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (error) {
    console.warn(`Unable to read localStorage key "${key}".`, error);
    return fallback;
  }
};

export const writeStorage = (key, value) => {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Unable to write localStorage key "${key}".`, error);
    return false;
  }
};

export const removeStorage = (key) => {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Unable to remove localStorage key "${key}".`, error);
    return false;
  }
};

