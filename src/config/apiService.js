// Helper function to handle API requests
const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  const response = await fetch(url, {
    ...options,
    signal: controller.signal
  });
  
  clearTimeout(id);
  return response;
};

export const verifyAdmin = async (apiUrl, password) => {
  try {
    const response = await fetchWithTimeout(`${apiUrl}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      return { success: false, message: 'Request timed out' };
    }
    return { success: false, message: error.message || 'Connection failed' };
  }
};

export const fetchPortfolioData = async (apiUrl, token) => {
  try {
    const response = await fetchWithTimeout(`${apiUrl}/data`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      return { error: 'Request timed out' };
    }
    return { error: error.message || 'Failed to fetch data' };
  }
};

export const updatePortfolioData = async (apiUrl, token, data) => {
  try {
    const response = await fetchWithTimeout(`${apiUrl}/update`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      return { success: false, message: 'Request timed out' };
    }
    return { success: false, message: error.message || 'Update failed' };
  }
};