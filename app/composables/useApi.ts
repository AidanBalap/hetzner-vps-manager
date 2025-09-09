/**
 * API utility composable for making typed HTTP requests
 * Provides consistent error handling and toast notifications
 */
export const useApi = () => {
  const { $toast } = useNuxtApp();

  /**
   * Generic API request function with proper error handling
   */
  const apiRequest = async <T>(
    url: string,
    options: { method: 'GET' | 'POST' | 'DELETE', body?: unknown } = { method: 'GET' },
    errorMessage = 'Error en la petición',
  ): Promise<T | null> => {
    try {
      const response = await fetch(url, {
        method: options.method,
        body: options.body ? JSON.stringify(options.body) : undefined,
        headers: options.body ? { 'Content-Type': 'application/json' } : undefined,
      });

      if (!response.ok) {
        throw new Error(response.statusText || 'Request failed');
      }

      return await response.json() as T;
    }
    catch (error) {
      console.error('API Request Error:', error);
      $toast.error(errorMessage);
      return null;
    }
  };

  /**
   * GET request helper
   */
  const get = <T>(url: string, errorMessage?: string) => {
    return apiRequest<T>(url, { method: 'GET' }, errorMessage);
  };

  /**
   * POST request helper
   */
  const post = <T>(url: string, body?: unknown, errorMessage?: string) => {
    return apiRequest<T>(url, { method: 'POST', body }, errorMessage);
  };

  /**
   * DELETE request helper
   */
  const del = <T>(url: string, errorMessage?: string) => {
    return apiRequest<T>(url, { method: 'DELETE' }, errorMessage);
  };

  return {
    get,
    post,
    del,
  };
};
