import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFriendRequests, acceptFriendRequest, rejectFriendRequest } from '../lib/api';

const DISMISSED_KEY = 'dismissedIncomingRequestIds';

const useDismissStore = () => {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(DISMISSED_KEY) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(DISMISSED_KEY, JSON.stringify(dismissed));
    } catch {}
  }, [dismissed]);

  const add = (id) => setDismissed((arr) => (arr.includes(id) ? arr : [...arr, id]));
  const clear = (id) => setDismissed((arr) => arr.filter((x) => x !== id));
  return { dismissed, add, clear };
};

const FriendRequestPopup = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { dismissed, add: dismiss } = useDismissStore();

  const { data, isFetching } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: getFriendRequests,
    refetchInterval: 15000,
    staleTime: 5000,
  });

  const incoming = useMemo(() => (data?.incomingReqs || []).filter((r) => !dismissed.includes(r._id)), [data, dismissed]);
  const firstReq = incoming[0];

  const { mutate: acceptMut, isPending: accepting } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      // refresh lists
      queryClient.invalidateQueries({ queryKey: ['friendRequests'] });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
  });

  const { mutate: rejectMut, isPending: rejecting } = useMutation({
    mutationFn: rejectFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendRequests'] });
    },
  });

  // Hide popup on notifications page to avoid duplication
  const hideOnThisPage = location.pathname.startsWith('/notifications');

  if (hideOnThisPage || isFetching || !firstReq) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="card bg-base-200 shadow-xl w-80">
        <div className="card-body p-4">
          <div className="flex items-center gap-3">
            <div className="avatar w-12 h-12 rounded-full overflow-hidden">
              <img src={firstReq.sender?.avatar} alt={firstReq.sender?.name || 'User'} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold truncate">{firstReq.sender?.name}</p>
              <p className="text-xs opacity-70 truncate">{firstReq.sender?.email}</p>
            </div>
          </div>

          <p className="mt-2 text-sm">sent you a friend request.</p>

          <div className="mt-3 flex gap-2">
            <button
              className="btn btn-primary btn-sm flex-1"
              disabled={accepting}
              onClick={() => acceptMut(firstReq._id)}
            >
              Accept
            </button>
            <button
              className="btn btn-ghost btn-sm flex-1"
              disabled={rejecting}
              onClick={() => rejectMut(firstReq._id)}
            >
              Reject
            </button>
            <button
              className="btn btn-outline btn-sm"
              title="Dismiss"
              onClick={() => dismiss(firstReq._id)}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestPopup;
