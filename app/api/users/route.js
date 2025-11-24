import { getClientToken } from "@/lib/auth";

export async function GET(request) {
  const token = getClientToken(request);

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const pageNumber = searchParams.get("pageNumber");
  const pageSize = searchParams.get("pageSize");

  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (pageNumber) queryParams.append("pageNumber", pageNumber);
  if (pageSize) queryParams.append("pageSize", pageSize);

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/users${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: res.status,
    });
  }

  const data = await res.json();
  return Response.json(data);
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
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/users`;

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // ---- ERROR RESPONSE SAFE HANDLING ----
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
          error: "Failed to create user",
          details: parsed,
        }),
        { status: res.status }
      );
    }

    // ---- SUCCESS RESPONSE SAFE HANDLING ----
    const successText = await res.text();
    let data = null;

    try {
      data = successText ? JSON.parse(successText) : null;
    } catch {
      data = successText; // if backend returns plain text
    }

    return new Response(
      JSON.stringify({
        message: "User created successfully",
        data,
      }),
      { status: 201 }
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
