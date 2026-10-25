import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ADMIN_SESSION_KEY = 'diaspora_admin_session';
const ADMIN_CREDS_KEY = 'diaspora_admin_creds';

export interface AdminCredentials {
  username: string;
  passwordHash: string; // Stored password or hash
  lastLogin?: string;
}

// Default initial admin credentials
export const DEFAULT_ADMIN_USERNAME = 'Rahulraj2mar@gmail.com';
export const DEFAULT_ADMIN_PASSWORD = 'diaspora2026!';
export const DEFAULT_ADMIN_ALIAS = 'admin';

export const adminAuthService = {
  // Check if currently authenticated in this browser session
  isAuthenticated(): boolean {
    try {
      const session = localStorage.getItem(ADMIN_SESSION_KEY);
      if (!session) return false;
      const parsed = JSON.parse(session);
      return parsed && parsed.authenticated === true;
    } catch {
      return false;
    }
  },

  getCurrentAdminUser(): string | null {
    try {
      const session = localStorage.getItem(ADMIN_SESSION_KEY);
      if (!session) return null;
      return JSON.parse(session).username || DEFAULT_ADMIN_USERNAME;
    } catch {
      return null;
    }
  },

  // Authenticate with username and password
  async login(usernameInput: string, passwordInput: string): Promise<{ success: boolean; error?: string }> {
    const cleanUser = usernameInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    // Check remote credentials in Firestore if exists, or fallback to default
    let validUsername = DEFAULT_ADMIN_USERNAME.toLowerCase();
    let validAlias = DEFAULT_ADMIN_ALIAS.toLowerCase();
    let validPassword = DEFAULT_ADMIN_PASSWORD;

    try {
      const credDoc = await getDoc(doc(db, 'admins', 'portal_credentials'));
      if (credDoc.exists()) {
        const data = credDoc.data();
        if (data.username) validUsername = data.username.toLowerCase();
        if (data.password) validPassword = data.password;
      }
    } catch (e) {
      console.warn('Could not read remote admin credentials, checking local credentials:', e);
    }

    // Check local custom credentials override
    try {
      const localCreds = localStorage.getItem(ADMIN_CREDS_KEY);
      if (localCreds) {
        const parsed = JSON.parse(localCreds);
        if (parsed.password) validPassword = parsed.password;
        if (parsed.username) validUsername = parsed.username.toLowerCase();
      }
    } catch (e) {
      console.warn('Local creds read error', e);
    }

    const matchesUser = cleanUser === validUsername || cleanUser === validAlias;
    const matchesPass = cleanPass === validPassword;

    if (matchesUser && matchesPass) {
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({
        authenticated: true,
        username: usernameInput,
        loginTime: new Date().toISOString()
      }));
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid username or password. Please check your credentials.'
    };
  },

  logout(): void {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  },

  async updatePassword(newPassword: string, newUsername?: string): Promise<boolean> {
    const updated = {
      username: newUsername || DEFAULT_ADMIN_USERNAME,
      password: newPassword,
      updatedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify(updated));
      await setDoc(doc(db, 'admins', 'portal_credentials'), updated, { merge: true });
      return true;
    } catch (e) {
      console.error('Failed to update credentials in Firestore, saved locally:', e);
      return true;
    }
  }
};
