import { getClientToken } from "@/lib/auth";

export async function POST(request) {
    const token = getClientToken(request);

    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const formData = await request.formData();
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/images/upload`;

    const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!res.ok) {
        return new Response(JSON.stringify({ error: "Failed to upload image" }), {
            status: res.status,
        });
    }

    const data = await res.json();
    return Response.json(data);
}
