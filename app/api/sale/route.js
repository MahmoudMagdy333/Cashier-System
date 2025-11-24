import { getClientToken } from "@/lib/auth";

export async function POST(request) {
    const token = getClientToken(request);
    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const body = await request.json();
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/sales`;

    const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        return new Response(JSON.stringify({ error: "Failed to process sale" }), {
            status: res.status,
        });
    }

    const data = await res.json();
    return Response.json(data);
}
