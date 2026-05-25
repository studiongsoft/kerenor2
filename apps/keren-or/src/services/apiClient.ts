import axios from 'axios';

const API_TIMEOUT_MS = 30_000;

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'שגיאה בתקשורת עם השרת';
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  },
);

export function getMockDelay(): number {
  const raw = import.meta.env.VITE_MOCK_API_DELAY;
  const parsed = raw ? Number.parseInt(raw, 10) : 300;
  return Number.isFinite(parsed) ? parsed : 0;
}

export function shouldSimulateMockError(): boolean {
  return import.meta.env.VITE_MOCK_API_ERROR === 'true';
}

export async function withMockDelay<T>(value: T): Promise<T> {
  const delay = getMockDelay();
  if (delay > 0) {
    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
  if (shouldSimulateMockError()) {
    throw new Error('שגיאה מדומה — בדיקת מצב Error');
  }
  return value;
}
