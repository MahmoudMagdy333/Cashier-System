import { getClientToken } from "@/lib/auth";

export async function GET(request) {
  const token = getClientToken(request);

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/permissions`;

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch permissions" }), {
      status: res.status,
    });
  }

  const data = await res.json();
  return Response.json(data);
}
