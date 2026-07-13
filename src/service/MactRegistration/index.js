const registerEndpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/api/v1/vls-mact-master-class/register`;
const clientKey = process.env.NEXT_PUBLIC_VLS_CLIENT_KEY || 'vls_law';

export async function submitMactRegistration(payload) {
  const response = await fetch(registerEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Client-Key': clientKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = 'Unable to submit registration';

    try {
      const data = await response.json();
      errorMessage = data?.message || data?.error || errorMessage;
    } catch {
      // Keep the fallback message when the response body is not JSON.
    }

    throw new Error(errorMessage);
  }

  return response.json();
}
