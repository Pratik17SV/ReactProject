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
    return {
      incomingReqs: res.data?.incomingRequests ?? [],
      acceptedReqs: res.data?.acceptedRequests ?? [],
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
    return res.data;
  } catch (error) {
    console.error("Error accepting friend request in api:", error);
    throw error;
  }
}

// Reject a friend request by its request id
export async function rejectFriendRequest(requestId) {
  try {
    const res = await axiosInstance.put(`/users/friend-request/${requestId}/reject`);
    return res.data;
  } catch (error) {
    console.error("Error rejecting friend request in api:", error);
    throw error;
  }
}


export async function getStreamToken() {
  const res = await axiosInstance.get("/chat/token");
  return res.data; 
}
  