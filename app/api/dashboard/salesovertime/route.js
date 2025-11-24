import { getClientToken } from "@/lib/auth";

export async function GET(request) {
    const token = getClientToken(request);

    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period");

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/salesovertime${period ? `?period=${period}` : ""
        }`;

    const res = await fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch sales over time" }), {
            status: res.status,
        });
    }

    const data = await res.json();
    return Response.json(data);
}
