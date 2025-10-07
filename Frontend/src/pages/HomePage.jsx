import React, { useState, useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import {
  getUserFriends,
  getRecommendedUsers,
  getOutgoingFriendReqs,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router-dom";
import { UsersIcon } from "lucide-react";
import FriendCard from "../components/FriendCard.jsx";
import NoFriends from "../components/NoFriends.jsx";

  const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const [userSearch, setUserSearch] = useState("");

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
    },
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      // Track recipient user IDs for pending outgoing requests
      outgoingFriendReqs.forEach((req) => {
        const recipientId = req?.recipient?._id || req?.recipient?.id;
        if (recipientId) outgoingIds.add(recipientId);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center item-start gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Your Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {/* FRIENDS LIST */}
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (() => {
            const safeFriends = Array.isArray(friends) ? friends : [];
            if (safeFriends.length === 0) return <NoFriends />;
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {safeFriends.map((friend) => (
                  <FriendCard key={friend.id || friend._id} friend={friend} />
                ))}
              </div>
            );
          })()}

        {/* RECOMMENDED USERS */}
        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center item-start gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Users</h2>
              <p className="opacity-70">Discover new users and connect with them</p>
            </div>
            <div className="mt-4 mb-5 flex">
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search users by name or email"
                className="input input-bordered w-full"
              />
            </div>

            {loadingUsers ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : recommendedUsers.length === 0 ? (
              <div className="card bg-base-200 p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
                <p className="text-base-content opacity-70">Check back later for new users!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedUsers
                  .filter((u) => {
                    const t = userSearch.trim().toLowerCase();
                    if (!t) return true;
                    const name = (u.name || "").toLowerCase();
                    const email = (u.email || "").toLowerCase();
                    return name.includes(t) || email.includes(t);
                  })
                  .map((user) => {
                  const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                  return (
                    <div
                      key={user._id}
                      className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="card-body p-5 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="avatar size-16 rounded-full">
                            <img src={user.avatar} alt={user.name} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm opacity-70">{user.email}</p>
                          </div>
                        </div>
                        {user.bio && (
                          <p className="text-sm text-base-content opacity-80">
                            {user.bio}
                          </p>
                        )}

                        <button
                          className="btn btn-primary btn-sm w-full"
                          disabled={hasRequestBeenSent || isPending}
                          onClick={() => sendRequestMutation(user._id)}
                        >
                          {hasRequestBeenSent ? "Request Sent" : "Add Friend"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;

