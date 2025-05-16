export async function login(email: string, password: string, token?: string) {
  const response = await fetch('http://10.0.2.2:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, token }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur de connexion');
  }
  
  return response.json(); // { token: "JWT_TOKEN" }
}
