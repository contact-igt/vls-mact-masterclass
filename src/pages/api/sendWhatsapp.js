const requiredFields = ['phone', 'amount', 'programm_name', 'schedule', 'platform', 'link_date'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const missingField = requiredFields.find((field) => !body[field]);

  if (missingField) {
    return res.status(400).json({ error: `${missingField} is required` });
  }

  const apiKey = process.env.REACT_APP_ASKEVA_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'AskEva API key missing' });
  }

  const payload = {
    phone: body.phone,
    template_name: 'event_remainder',
    broadcast_name: 'event_remainder',
    parameters: [
      { name: 'name', value: body.name || 'Student' },
      { name: 'amount', value: String(body.amount) },
      { name: 'programm_name', value: body.programm_name },
      { name: 'schedule', value: body.schedule },
      { name: 'platform', value: body.platform },
      { name: 'link_date', value: body.link_date },
    ],
  };

  try {
    const response = await fetch('https://backend.askeva.io/v1/message/send-message', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let data = text;

    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to send WhatsApp message' });
  }
}