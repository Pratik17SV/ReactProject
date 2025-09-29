import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  ChannelHeader,
  Thread,
} from "stream-chat-react";
import ChatLoader from "../components/ChatLoader";
import { toast } from "react-hot-toast";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;
const ChatPage = () => {
  const { id } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const { authUser, isLoading: isAuthLoading } = useAuthUser();
  const targetUser = id;
  const { data: tokenData, isLoading: isTokenLoading, isError: isTokenError } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initClient = async () => {
      if (!authUser) return;
      // Handle missing target user: show empty state without initializing channel
      if (!targetUser) {
        setConnecting(false);
        return;
      }
      const token = tokenData?.token ?? tokenData;
      if (!token) return; // wait for token fetch to complete
      try {
        setConnecting(true);
        const client = StreamChat.getInstance(STREAM_API_KEY);
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.name,
            image: authUser.avatar,
          },
          token
        );

        const channelId = [authUser._id, targetUser].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUser],
        });
        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing Stream chat client", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setConnecting(false);
      }
    };
    initClient();
    return () => {
      // cleanup on unmount or when switching chats
      (async () => {
        try {
          if (chatClient) {
            await chatClient.disconnectUser();
          }
        } catch (e) {
          // no-op
        } finally {
          setChatClient(null);
          setChannel(null);
        }
      })();
    };
  }, [tokenData?.token, tokenData, authUser, targetUser]);

  // Empty state when no chat selected
  if (!targetUser) {
    return (
      <div className="h-[93vh] flex items-center justify-center">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Select a conversation to start chatting</h2>
          <p className="text-sm opacity-70">Open a friend profile to start a chat.</p>
        </div>
      </div>
    );
  }

  // Show loaders while auth or token are loading, or during connect
  if (isAuthLoading || isTokenLoading || connecting) {
    return <ChatLoader />;
  }

  // If token fetch finished but failed or missing token, show an error instead of infinite loader
  const tokenCheck = tokenData?.token ?? tokenData;
  if (isTokenError || (tokenData !== undefined && !tokenCheck)) {
    return (
      <div className="h-[93vh] flex items-center justify-center">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Unable to fetch chat token</h2>
          <p className="text-sm opacity-70">Please refresh the page or try again later.</p>
        </div>
      </div>
    );
  }

  // If not connecting anymore but client/channel missing, show a simple fallback
  if (!chatClient || !channel) {
    return (
      <div className="h-[93vh] flex items-center justify-center">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Chat is unavailable</h2>
          <p className="text-sm opacity-70">Please go back and re-open the conversation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage
