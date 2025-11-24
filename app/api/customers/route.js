import { getClientToken } from "@/lib/auth";

export async function GET(request) {
    const token = getClientToken(request);

    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const { searchParams } = new URL(request.url);
    const pageNumber = searchParams.get("pageNumber");
    const pageSize = searchParams.get("pageSize");

    const queryParams = new URLSearchParams();
    if (pageNumber) queryParams.append("pageNumber", pageNumber);
    if (pageSize) queryParams.append("pageSize", pageSize);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/customers${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    try {
        const res = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return new Response(
                JSON.stringify({ error: "Failed to fetch customers", details: errorData }),
                {
                    status: res.status,
                }
            );
        }

        const data = await res.json();
        return Response.json(data);
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
}

export async function POST(request) {
    const token = getClientToken(request);

    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    try {
        const body = await request.json();
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/customers`;

        const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return new Response(
                JSON.stringify({ error: "Failed to create customer", details: errorData }),
                {
                    status: res.status,
                }
            );
        }

        const data = await res.json();
        return Response.json(data);
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
}
