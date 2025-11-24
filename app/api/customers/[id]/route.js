
import { getClientToken } from "@/lib/auth";

export async function GET(request, { params }) {
  const token = getClientToken(request);

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { id } = await params;

  if (!id) {
    return new Response(JSON.stringify({ error: "Customer ID is required" }), {
      status: 400,
    });
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/customers/${id}`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch customer data" }),
        {
          status: res.status,
        }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
      {
        status: 500,
      }
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
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/customers/${id}`;

    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // ---- 🔥 ERROR HANDLING ----
    if (!res.ok) {
      const errorText = await res.text(); // may not be JSON
      let parsedError = {};

      try {
        parsedError = JSON.parse(errorText);
      } catch { }

      return new Response(
        JSON.stringify({
          error: "Failed to update customer",
          details: parsedError || errorText,
        }),
        { status: res.status }
      );
    }

    // ---- 🔥 SUCCESS HANDLING ----
    const successText = await res.text(); // may be empty
    let data = null;

    try {
      data = successText ? JSON.parse(successText) : null;
    } catch {
      data = successText; // if it's plain text
    }

    return new Response(
      JSON.stringify({
        message: "Customer updated successfully",
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
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/customers/${id}`;

    const res = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // ---- 🔥 ERROR HANDLING ----
    if (!res.ok) {
      const errorText = await res.text(); // could be HTML or empty
      let parsedError = {};

      try {
        parsedError = JSON.parse(errorText);
      } catch {
        parsedError = errorText; // if not JSON
      }

      return new Response(
        JSON.stringify({
          error: "Failed to delete customer",
          details: parsedError,
        }),
        { status: res.status }
      );
    }

    // ---- 🔥 SUCCESS ----
    // DELETE often returns empty body, so 204 is correct
    return new Response(
      JSON.stringify({
        message: "Customer deleted successfully",
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
