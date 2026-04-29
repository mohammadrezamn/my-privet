exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { pageURL } = JSON.parse(event.body);

        if (!pageURL) {
            return { statusCode: 400, body: 'Missing "pageURL" in request body' };
        }

        const response = await fetch(pageURL, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        const data = await response.text();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': response.headers.get('content-type') || 'text/plain',
                'Access-Control-Allow-Origin': '*'
            },
            body: data
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch', details: error.message })
        };
    }
};
