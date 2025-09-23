const SESSION_KEY = 'rechargeSession';
const SESSION_DURATION = 55 * 60 * 1000; // 55 minutes in milliseconds

export function saveSession(session: any) {
  try {
    const sessionWithExpiration = {
      ...session,
      expiresAt: Date.now() + SESSION_DURATION,
      savedAt: Date.now()
    };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionWithExpiration));
    return sessionWithExpiration;
  } catch (error) {
    console.error('Failed to save session:', error);
    return null;
  }
}

export function loadSession() {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    
    const session = JSON.parse(stored);
    
    // Check if session is expired
    if (session.expiresAt && Date.now() > session.expiresAt) {
      clearSession();
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Failed to load session:', error);
    clearSession();
    return null;
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear session:', error);
  }
}

export function isSessionValid(session: any) {
  if (!session || !session.expiresAt) return false;
  return Date.now() < session.expiresAt;
}

export function getSessionTimeRemaining(session: any) {
  if (!session || !session.expiresAt) return 0;
  return Math.max(0, session.expiresAt - Date.now());
}

export function formatTimeRemaining(milliseconds: number) {
  const minutes = Math.floor(milliseconds / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}