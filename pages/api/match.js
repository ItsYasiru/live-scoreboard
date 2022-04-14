import connectToDatabase from '../../lib/database';


async function getScores() {
    let { db } = await connectToDatabase();
    return await db.collection('matches').findOne({ live: true });
};

async function createMatch(data) {
    let { db } = await connectToDatabase();

    await db.collection('matches').insertOne(data);
};

function internalServerError(response) {
    response.status(500);
    return response.end();
};

function unauthorized(response) {
    response.status(401);
    return response.end();
};

async function handler(request, response) {
    switch (request.method) {
        case "GET": {
            try {
                const json = {
                    data: await getScores(),
                    success: true
                };

                response.json(json);
                return response.status(200);
            }
            catch (error) {
                console.log(error.message);
                return internalServerError(response);
            };
        };
        case "PUT": {
            try {
                const body = request.body;

                if (!body.token == process.env.API_TOKEN) {
                    return unauthorized(response);
                };

                const json = {
                    data: await createMatch(body.data),
                    success: true
                };

                response.json(json);
                return response.status(200);
            }
            catch (error) {
                console.log(error.message);
                return internalServerError(response);
            };
        };
    };
};

export default handler;
