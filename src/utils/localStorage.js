/**
 * Safely get an item from localStorage with error handling
 * @param {string} key - The key to retrieve
 * @param {any} defaultValue - Default value to return if retrieval fails
 * @returns {any} The stored value or defaultValue if retrieval fails
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? item : defaultValue;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Safely get and parse JSON from localStorage with error handling
 * @param {string} key - The key to retrieve
 * @param {any} defaultValue - Default value to return if retrieval or parsing fails
 * @returns {any} The parsed value or defaultValue if retrieval/parsing fails
 */
export const getJsonFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    
    try {
      return JSON.parse(item);
    } catch (parseError) {
      console.error(`Error parsing ${key} from localStorage:`, parseError);
      return defaultValue;
    }
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Safely set an item in localStorage with error handling
 * @param {string} key - The key to set
 * @param {any} value - The value to store
 * @returns {boolean} True if successful, false otherwise
 */
export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Error setting ${key} in localStorage:`, error);
    return false;
  }
};

/**
 * Safely set a JSON value in localStorage with error handling
 * @param {string} key - The key to set
 * @param {any} value - The value to stringify and store
 * @returns {boolean} True if successful, false otherwise
 */
export const setJsonToStorage = (key, value) => {
  try {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
    return true;
  } catch (error) {
    console.error(`Error setting ${key} in localStorage:`, error);
    return false;
  }
};

/**
 * Safely remove an item from localStorage with error handling
 * @param {string} key - The key to remove
 * @returns {boolean} True if successful, false otherwise
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};

/**
 * Safely clear all items from localStorage with error handling
 * @returns {boolean} True if successful, false otherwise
 */
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}; 