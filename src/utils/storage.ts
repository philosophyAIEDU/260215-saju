const API_KEY_STORAGE = 'saju_gemini_api_key';

export function saveApiKey(key: string): void {
  localStorage.setItem(API_KEY_STORAGE, key);
}

export function loadApiKey(): string {
  return localStorage.getItem(API_KEY_STORAGE) ?? '';
}

export function clearApiKey(): void {
  localStorage.removeItem(API_KEY_STORAGE);
}
