export const getAuthToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
};

export const setAuthData = (data: {
    token: string;
    fullName: string;
    role: string;
}) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("fullName", data.fullName);
        localStorage.setItem("role", data.role);
    }
};

export const clearAuthData = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("fullName");
        localStorage.removeItem("role");
    }
};

export const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
    };
};

export function getClientToken(req: Request) {
    const authHeader = req.headers.get("authorization");
    return authHeader?.replace("Bearer ", "");
}
