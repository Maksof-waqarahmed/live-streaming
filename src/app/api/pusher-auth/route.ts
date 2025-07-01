import Pusher from "pusher";
import { NextRequest } from "next/server";

const pusher = new Pusher({
    appId: "2015996",
    key: "89b3bb8cda6c1d5914c5",
    secret: "c3d101e2a7198422261d",
    cluster: "ap2",
    useTLS: true,
});

export async function POST(req: NextRequest) {
    let rawBody;
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow all origins for testing
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
    };

    try {
        // Log headers for debugging
        console.log("[Pusher Auth] Request headers:", Object.fromEntries(req.headers));

        // Get raw body as text
        rawBody = await req.text();
        console.log("[Pusher Auth] Raw request body:", rawBody);

        // Determine Content-Type
        const contentType = req.headers.get("content-type")?.toLowerCase() || "";
        console.log("[Pusher Auth] Content-Type:", contentType);

        let body;
        if (contentType.includes("application/json")) {
            try {
                // Try parsing as JSON
                body = rawBody ? JSON.parse(rawBody) : {};
                console.log("[Pusher Auth] Parsed JSON body:", body);
            } catch (jsonError) {
                console.error("[Pusher Auth] Failed to parse JSON:", jsonError, "Raw body:", rawBody);

                // Attempt to fix malformed JSON
                let fixedBody;
                try {
                    fixedBody = rawBody
                        .replace(/'/g, '"') // Replace single quotes with double quotes
                        .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3') // Quote property names
                        .replace(/:(\s*)([\w-]+)([,}])/g, ':$1"$2"$3'); // Quote string values (including hyphens)
                    console.log("[Pusher Auth] Fixed body attempt:", fixedBody);
                    body = JSON.parse(fixedBody);
                    console.log("[Pusher Auth] Fixed JSON body:", body);
                } catch (fixError) {
                    console.error("[Pusher Auth] Failed to fix JSON:", fixError, "Fixed body:", fixedBody);
                    return new Response(
                        JSON.stringify({ error: "Invalid JSON in request body", rawBody, fixedBody }),
                        { status: 400, headers }
                    );
                }
            }
        } else if (contentType.includes("application/x-www-form-urlencoded")) {
            // Parse form data
            const params = new URLSearchParams(rawBody);
            const socket_id = params.get("socket_id")?.toString();
            const channel_name = params.get("channel_name")?.toString();
            console.log("[Pusher Auth] Form data:", { socket_id, channel_name });

            if (!socket_id || !channel_name) {
                return new Response(
                    JSON.stringify({ error: "Missing socket_id or channel_name in form data", rawBody }),
                    { status: 400, headers }
                );
            }
            body = { socket_id, channel_name };
        } else {
            return new Response(
                JSON.stringify({ error: "Unsupported Content-Type", contentType, rawBody }),
                { status: 400, headers }
            );
        }

        const { socket_id, channel_name } = body;

        if (!socket_id || !channel_name) {
            console.error("[Pusher Auth] Missing socket_id or channel_name:", { socket_id, channel_name });
            return new Response(
                JSON.stringify({ error: "Missing socket_id or channel_name", rawBody }),
                { status: 400, headers }
            );
        }

        const authResponse = pusher.authenticate(socket_id, channel_name);
        console.log("[Pusher Auth] Successful authentication for socket_id:", socket_id);

        return new Response(JSON.stringify(authResponse), {
            status: 200,
            headers,
        });
    } catch (err: any) {
        console.error("[Pusher Auth] Internal Server Error:", err, "Raw body:", rawBody);
        return new Response(
            JSON.stringify({ error: "Internal Server Error", details: err.message, rawBody }),
            { status: 500, headers }
        );
    }
}

// Handle CORS preflight requests
export async function OPTIONS(req: NextRequest) {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}