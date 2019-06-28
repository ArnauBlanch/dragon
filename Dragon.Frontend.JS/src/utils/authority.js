// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  const authorityString = localStorage.getItem('dragon-authority');
  return JSON.parse(authorityString);
}

export function setAuthority(authority) {
  return localStorage.setItem('dragon-authority', JSON.stringify(authority));
}

export function clearAuthority() {
  return localStorage.removeItem('dragon-authority');
}
