import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUserFriends } from '../lib/api'
import { Search } from 'lucide-react'

const MessagePage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ['friends'],
    queryFn: getUserFriends,
  });
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return Array.isArray(friends) ? friends : [];
    return (Array.isArray(friends) ? friends : []).filter(f =>
      (f.name || '').toLowerCase().includes(q) ||
      (f.email || '').toLowerCase().includes(q)
    );
  }, [friends, query]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-sm opacity-70 mt-1">Search your friends and start a conversation.</p>
        </div>

        {/* Search */}
        <div className="mb-5">
          <label className="input input-bordered flex items-center gap-2 max-w-xl">
            <Search className="size-4 opacity-70" />
            <input
              type="text"
              className="grow"
              placeholder="Search by name or email"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="card bg-base-200 p-8 text-center">
            <h3 className="font-semibold text-lg mb-1">No conversations found</h3>
            <p className="text-sm opacity-70">Add friends from Home and start chatting.</p>
          </div>
        ) : (
          <ul className="divide-y divide-base-300 bg-base-200 rounded-xl overflow-hidden">
            {filtered.map((f) => (
              <li key={f._id || f.id} className="">
                <Link to={`/chat/${f._id || f.id}`} className="flex items-center gap-4 p-4 hover:bg-base-300 transition-colors">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src={f.avatar}
                        alt={f.name || 'User'}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(f?.name || 'User');
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{f.name}</p>
                    </div>
                    <p className="text-sm opacity-70 truncate">{f.email}</p>
                  </div>
                  <div>
                    <span className="btn btn-outline btn-sm">Open</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default MessagePage
