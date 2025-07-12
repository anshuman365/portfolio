const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

export const verifyAdmin = async (apiUrl, password) => {
  try {
    const response = await fetchWithTimeout(`${apiUrl}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Authentication failed`);
    }
    
    return await response.json();
  } catch (error) {
    return { 
      success: false, 
      message: error.name === 'AbortError' 
        ? 'Request timed out' 
        : error.message || 'Connection failed' 
    };
  }
};

export const fetchPortfolioData = async (apiUrl, token) => {
  try {
    const response = await fetchWithTimeout(`${apiUrl}/data`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to fetch data`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.name === 'AbortError' 
      ? 'Request timed out' 
      : error.message || 'Failed to fetch data');
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
      const errorData = await response.json();
      throw new Error(errorData.message || `Update failed`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.name === 'AbortError' 
      ? 'Request timed out' 
      : error.message || 'Update failed');
  }
};

export const uploadFile = async (apiUrl, token, file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetchWithTimeout(`${apiUrl}/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Upload failed`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.name === 'AbortError' 
      ? 'Upload timed out' 
      : error.message || 'Upload failed');
  }
};

export const submitContact = async (apiUrl, data) => {
  try {
    const response = await fetchWithTimeout(`${apiUrl}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Submission failed`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.name === 'AbortError' 
      ? 'Request timed out' 
      : error.message || 'Submission failed');
  }
};