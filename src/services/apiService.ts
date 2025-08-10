const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiService = {
  getUserDetails: async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/details`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    if (!response.ok) throw new Error('Failed to get user details');
    const data = await response.json();
    return data.user; // Return the user object directly
  },

  // Upload poster image
  uploadPoster: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/api/drive/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to upload poster');
    return response.json();
  },

  // Create/update event
  submitEvent: async (eventData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/events/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) throw new Error('Failed to submit event');
    return response.json();
  },
};