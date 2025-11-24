import { getClientToken } from "@/lib/auth";

export async function GET(request) {
  const token = getClientToken(request);

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  // Get query parameters from request
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");
  const search = searchParams.get("search");
  const pageNumber = searchParams.get("pageNumber") || "1";
  const pageSize = searchParams.get("pageSize") || "10";

  // Build query string for external API
  const queryParams = new URLSearchParams();
  if (categoryId) {
    queryParams.append("categoryId", categoryId);
  }
  if (search) {
    queryParams.append("search", search);
  }
  queryParams.append("pageNumber", pageNumber);
  queryParams.append("pageSize", pageSize);

  const queryString = queryParams.toString();
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/products${queryString ? `?${queryString}` : ""}`;

  // Request products from your external API
  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // If your API needs other headers, add them here
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
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

  const body = await request.json();
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/products`;

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Failed to create product" }), {
      status: res.status,
    });
  }

  const data = await res.json();
  return Response.json(data);
}
