import { getClientToken } from "@/lib/auth";

export async function GET(request, { params }) {
    const token = getClientToken(request);

    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const { id } = await params;

    try {
        console.log(id);
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`;

        const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            return new Response(JSON.stringify({ error: "Failed to fetch user" }), {
                status: res.status,
            });
        }

        const data = await res.json();
        return Response.json(data);
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Internal Server Error",
                details: error.message,
            }),
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    const token = getClientToken(request);

    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const { id } = await params;

    try {
        const body = await request.json();
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`;

        const res = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        // ---- ERROR RESPONSE ----
        if (!res.ok) {
            const errorText = await res.text();
            let parsed = {};

            try {
                parsed = JSON.parse(errorText);
            } catch {
                parsed = errorText;
            }

            return new Response(
                JSON.stringify({
                    error: "Failed to update user",
                    details: parsed,
                }),
                { status: res.status }
            );
        }

        // ---- SUCCESS RESPONSE ----
        const successText = await res.text();
        let data = null;

        try {
            data = successText ? JSON.parse(successText) : null;
        } catch {
            data = successText;
        }

        return new Response(
            JSON.stringify({
                message: "User updated successfully",
                data,
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Internal Server Error",
                details: error.message,
            }),
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    const token = getClientToken(request);

    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const { id } = await params;

    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`;

        const res = await fetch(apiUrl, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // ---- ERROR RESPONSE ----
        if (!res.ok) {
            const errorText = await res.text();
            let parsed = {};

            try {
                parsed = JSON.parse(errorText);
            } catch {
                parsed = errorText;
            }

            return new Response(
                JSON.stringify({
                    error: "Failed to delete user",
                    details: parsed,
                }),
                { status: res.status }
            );
        }

        // ---- SUCCESS RESPONSE ----
        return new Response(
            JSON.stringify({
                message: "User deleted successfully",
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Internal Server Error",
                details: error.message,
            }),
            { status: 500 }
        );
    }
}
