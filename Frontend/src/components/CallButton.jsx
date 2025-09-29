import { Video } from "lucide-react";

function CallButton({ handleVideoCall, disabled = false }) {
  return (
    <button
      type="button"
      onClick={handleVideoCall}
      disabled={disabled}
      className="absolute top-2 right-2 inline-flex items-center gap-2 rounded-md bg-primary text-white px-3 py-2 shadow hover:opacity-90 disabled:opacity-50"
      title="Start video call"
    >
      <Video className="w-5 h-5" />
      <span className="hidden sm:inline">Call</span>
    </button>
  );
}

export default CallButton;
