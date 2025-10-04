import React from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { getFriendRequests, acceptFriendRequest, rejectFriendRequest } from '../lib/api'
import NoNotificationsFound from '../components/NoNotificationsFound.jsx'
import { UserCheckIcon, BellIcon, ClockIcon, MessageSquareIcon } from 'lucide-react'

const NotificationPage = () => {
  const queryClient = useQueryClient();
  const {data:friendRequests,isLoading} = useQuery({
    queryKey:["friendRequests"],
    queryFn: getFriendRequests
  });
  const { mutate: acceptReq, isPending: isAccepting } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
  const { mutate: rejectReq, isPending: isRejecting } = useMutation({
    mutationFn: rejectFriendRequest,
    onMutate: async (requestId) => {
      await queryClient.cancelQueries({ queryKey: ["friendRequests"] });
      const previous = queryClient.getQueryData(["friendRequests"]);
      // Optimistically remove the rejected request from cache
      queryClient.setQueryData(["friendRequests"], (old) => {
        if (!old) return old;
        return {
          ...old,
          incomingReqs: (old.incomingReqs || []).filter((r) => r._id !== requestId),
        };
      });
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["friendRequests"], context.previous);
      }
    },
    onSettled: () => {
      // Try to revalidate; backend may not yet update but it's harmless
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || []
  const acceptedRequests = friendRequests?.acceptedReqs || []
    
  
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Notifications</h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <>
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheckIcon className="h-5 w-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">{incomingRequests.length}</span>
                </h2>

                <div className="space-y-3">
                  {incomingRequests.map((req) => (
                    <div key={req._id} className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="avatar w-14 h-14 rounded-full bg-base-300 overflow-hidden">
                              <img src={req.sender?.avatar} alt={req.sender?.name} />
                            </div>
                            <div>
                              <h3 className="font-semibold">{req.sender?.name}</h3>
                              <p className="text-sm opacity-70">{req.sender?.email}</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => acceptReq(req._id)}
                              disabled={isAccepting}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() => rejectReq(req._id)}
                              disabled={isRejecting}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {acceptedRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-success" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptedRequests.map((notification) => (
                    <div key={notification._id} className="card bg-base-200 shadow-sm">
                      <div className="card-body p-4">
                        <div className="flex items-start gap-3">
                          <div className="avatar mt-1 size-10 rounded-full overflow-hidden">
                            <img src={notification.sender?.avatar} alt={notification.sender?.name} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{notification.sender?.name}</h3>
                            <p className="text-sm my-1">
                              {notification.sender?.name} accepted your friend request
                            </p>
                            <p className="text-xs flex items-center opacity-70">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              Recently
                            </p>
                          </div>
                          <div className="badge badge-success">
                            <MessageSquareIcon className="h-3 w-3 mr-1" />
                            New Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default NotificationPage
