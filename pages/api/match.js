import connectToDatabase from "../../lib/database";

async function getScores() {
    let { db } = await connectToDatabase();
    return await db.collection("matches").findOne({ live: true });
}

async function createMatch(data) {
    let { db } = await connectToDatabase();

    await db.collection("matches").insertOne(data);
}

async function updateMatch(data) {
    let { db } = await connectToDatabase();

    await db
        .collection("matches")
        .findOneAndUpdate({ live: true }, { $set: data });
}

async function internalServerError(response) {
    response.status(500);
    return response.end();
}

async function unauthorized(response) {
    console.log("Unauthorized!");
    response.status(401);
    return response.end();
}

async function handler(request, response) {
    try {
        console.log(`Recieving request method : ${request.method}`);
        switch (request.method) {
            case "GET": {
                response.json({
                    data: await getScores(),
                    success: true,
                });
                return response.status(200);
            }
            case "PUT": {
                const body = request.body;
                console.log(body.token);
                console.log(process.env.API_TOKEN);
                if (body.token != process.env.API_TOKEN) {
                    return unauthorized(response);
                }

                response.json({
                    data: await createMatch(body.data),
                    success: true,
                });
                return response.status(200);
            }
            case "PATCH": {
                const body = request.body;
                if (body.token != process.env.API_TOKEN) {
                    return unauthorized(response);
                }

                response.json({
                    data: await updateMatch(body.data),
                    success: true,
                });
                return response.status(200);
            }
        }
    } catch (error) {
        console.log(error.message);
        return await internalServerError(response);
    }
}

export default handler;
