import { useAuth } from '@/app/contexts/auth';

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export function useAuthenticatedFetch() {
  const { getValidToken } = useAuth();

  async function authFetch(url: string, options: FetchOptions = {}) {
    const { requireAuth = true, ...fetchOptions } = options;

    try {
      if (requireAuth) {
        const token = await getValidToken();
        if (!token) {
          throw new Error('Authentication required');
        }

        // Add authorization header with token
        fetchOptions.headers = {
          ...fetchOptions.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  return { authFetch };
} 