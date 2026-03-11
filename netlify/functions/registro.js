exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ status: 'error', message: 'Método no permitido' }),
    };
  }

  try {
    const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

    if (!APPS_SCRIPT_URL) {
      throw new Error('Variable de entorno APPS_SCRIPT_URL no configurada');
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: event.body,
    });

    // Leer y reenviar la respuesta de Apps Script al formulario
    const result = await response.text();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: result, // puede ser: { status: 'ok' | 'duplicate' | 'error' }
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: err.message }),
    };
  }
};
