export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem("auth"));
  } catch {
    return null;
  }
}

export function getToken() {
  return getAuth()?.token || null;
}

export function getUser() {
  return getAuth()?.user || null;
}

export function setAuth(auth) {
  localStorage.setItem("auth", JSON.stringify(auth));
}

export function updateUser(updates) {
  const auth = getAuth();
  if (!auth) return null;
  const updated = { ...auth, user: { ...auth.user, ...updates } };
  setAuth(updated);
  return updated.user;
}

export function clearAuth() {
  localStorage.removeItem("auth");
}

export function hasRole(...roles) {
  const user = getUser();
  return Boolean(user && roles.includes(user.role));
}
