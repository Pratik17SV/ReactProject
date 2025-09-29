import { Link } from "react-router-dom";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img
              src={friend.avatar}
              alt={friend.name || "User"}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(friend?.name || "User");
              }}
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold truncate">{friend.name}</h3>
            <p className="text-xs text-base-content/70 truncate">{friend.email}</p>
          </div>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
