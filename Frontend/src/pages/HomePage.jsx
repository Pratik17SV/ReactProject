import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { getUserFriends , getRecommendedUsers,getOutgoingFriendReqs,sendFriendRequest } from '../lib/api';
import { Link } from 'react-router-dom';
import { UsersIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useEffect } from 'react';
import FriendCard from '../components/FriendCard.jsx';
import NoFriends from '../components/NoFriends.jsx';

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds,setOutgoingRequestsIds] = useState(new Set());

  const{data:friends=[],isLoading:loadingFriends}= useQuery({
    queryKey:["friends"],
    queryFn:getUserFriends,
  })

  const {data:recommendedUsers=[],isLoading:loadingUsers } = useQuery({
    queryKey:['users'],
    queryFn:getRecommendedUsers,
  })

  const {data:outgoingFriendReqs}= useQuery({
    queryKey:["outgoingFriendReqs"],
    queryFn:getOutgoingFriendReqs,
  })

  const {mutate:sendRequestMutation,isPending}= useMutation({
    mutationFn:sendFriendRequest,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["outgoingFriendReqs"]})
    }
  })

  useEffect(()=>{
    const outgoingIds = new Set()
    if(outgoingFriendReqs && outgoingFriendReqs.length>0)
      {
        outgoingFriendReqs.forEach((req)=>{
          outgoingIds.add(req.id)
        })
        setOutgoingRequestsIds(outgoingIds)
      }
  },[outgoingFriendReqs]);
    
  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto space-y-10'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center item-start gap-4' >
          <h2 className='text-2xl font-bold tracking-tight' >Your Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className='mr-2 size-4'/>
            Friend Requests
          </Link>
        </div>
        {loadingFriends ? ( <div className='flex justify-center py-12'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>): (()=>{
          const safeFriends = Array.isArray(friends) ? friends : [];
          if (safeFriends.length === 0) return (<NoFriends/>);
          return (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {safeFriends.map((friend)=>(
                <FriendCard key={friend.id || friend._id} friend={friend}/>
              ))}
            </div>
          );
        })()}
      </div>
        
    </div>
  )
}

export default HomePage;