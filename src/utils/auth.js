export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

export const getUserRole = () => {
  return localStorage.getItem('userRole') || 'normal'
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userRole')
}

export const hasPermission = (requiredRole) => {
  const userRole = getUserRole()
  const roleHierarchy = { normal: 0, privileged: 1, super: 2 }
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}
