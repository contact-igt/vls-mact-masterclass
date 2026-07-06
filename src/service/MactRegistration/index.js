export async function submitMactRegistration(payload) {
  const response = await fetch('/api/mact-registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Unable to submit registration');
  }

  return response.json();
}