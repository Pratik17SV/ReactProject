import { axiosInstance } from "./axios";


export const getAuthUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
        return res.data;
    } catch (error) {
      console.error("Error fetching getauthuser in api:", error);
      return null;
    }
};

export const completeOnboarding = async (formData) => {
  const response = await axiosInstance.post("/auth/onboarding", formData);
  return response.data;
};
export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  // Clear any client-side per-user caches
  try { localStorage.removeItem('rejectedRequestIds'); } catch {}
  return res.data;
};

export async function getUserFriends() {
    try {
      const res = await axiosInstance.get("/users/friends");
        // Return the friends array directly
      return res.data?.friends ?? [];
    } catch (error) {
      console.error("Error fetching user friends in api:", error);
      return null;
    }
}

export async function getRecommendedUsers() {
  const res = await axiosInstance.get("/users");
  // Return the users array directly
  return res.data?.users ?? [];
}

export async function getOutgoingFriendReqs() {
  const res = await axiosInstance.get("/users/outgoing-friend-requests");
  // Return the outgoingRequests array directly
  return res.data?.outgoingRequests ?? [];
}

export async function sendFriendRequest(userId) {
  const res = await axiosInstance.post(`/users/friend-request/${userId}`);
  return res.data;
}

// Fetch incoming and accepted friend requests for the authenticated user
export async function getFriendRequests() {
  try {
    const res = await axiosInstance.get(`/users/friendrequests`);
    // Backend returns { incomingRequests, acceptedRequests }
    const incoming = res.data?.incomingRequests ?? [];
    const accepted = res.data?.acceptedRequests ?? [];

    // Persistently hide requests the user has rejected locally until backend supports it
    const rejectedIds = JSON.parse(localStorage.getItem('rejectedRequestIds') || '[]');
    const filteredIncoming = Array.isArray(rejectedIds) && rejectedIds.length
      ? incoming.filter((r) => !rejectedIds.includes(r._id))
      : incoming;

    return {
      incomingReqs: filteredIncoming,
      acceptedReqs: accepted,
    };
  } catch (error) {
    console.error("Error fetching friend requests in api:", error);
    return { incomingReqs: [], acceptedReqs: [] };
  }
}

// Accept a friend request by its request id
export async function acceptFriendRequest(requestId) {
  try {
    const res = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
    // Ensure this id is not kept in the local rejected list
    const key = 'rejectedRequestIds';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    const next = Array.isArray(existing) ? existing.filter((id) => id !== requestId) : [];
    localStorage.setItem(key, JSON.stringify(next));
    return res.data;
  } catch (error) {
    console.error("Error accepting friend request in api:", error);
    throw error;
  }
}

// Reject a friend request by its request id
export async function rejectFriendRequest(requestId) {
  try {
    // Backend handler is incomplete; perform a best-effort call but don't block UI
    // Fire-and-forget: attempt the call, but resolve immediately for optimistic UI
    axiosInstance.put(`/users/friend-request/${requestId}/reject`).catch(() => {/* ignore */});
    // Persist the rejected id locally so it stays hidden on refresh
    const key = 'rejectedRequestIds';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    if (!existing.includes(requestId)) {
      existing.push(requestId);
      localStorage.setItem(key, JSON.stringify(existing));
    }
    return { ok: true };
  } catch (error) {
    // Still resolve so UI can proceed optimistically
    console.error("Error rejecting friend request in api:", error);
    return { ok: false };
  }
}


export async function getStreamToken() {
  const res = await axiosInstance.get("/chat/token");
  return res.data; 
}
  