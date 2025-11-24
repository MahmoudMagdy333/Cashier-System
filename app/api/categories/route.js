import { getClientToken } from "@/lib/auth";

export async function GET(request) {
  const token = getClientToken(request);


  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  // Request categories from your external API
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch categories" }), {
      status: res.status,
    });
  }

  const data = await res.json();

  // Return only id and name for each category
  const categories = data.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  return Response.json(categories);
}

