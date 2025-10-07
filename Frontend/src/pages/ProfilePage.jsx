import { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { LoaderIcon, ShuffleIcon, CameraIcon, MailIcon, User2Icon, QuoteIcon } from "lucide-react";

const ProfilePage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: "",
    bio: "",
    email: "",
    profilePic: "",
  });

  useEffect(() => {
    if (authUser) {
      setFormState({
        fullName: authUser.name || "",
        bio: authUser.bio || "",
        email: authUser.email || "",
        profilePic: authUser.avatar || "",
      });
    }
  }, [authUser]);

  const { mutate: saveProfile, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || "Failed to update profile";
      toast.error(msg);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: formState.fullName,
      email: formState.email,
      avatar: formState.profilePic,
      bio: formState.bio,
    };
    saveProfile(payload);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState((s) => ({ ...s, profilePic: randomAvatar }));
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Edit Profile</h1>

        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col items-center gap-3">
                <div className="size-24 rounded-full bg-base-300 overflow-hidden">
                  {formState.profilePic ? (
                    <img src={formState.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <CameraIcon className="size-8 text-base-content/50" />
                    </div>
                  )}
                </div>
                <button type="button" onClick={handleRandomAvatar} className="btn btn-accent btn-sm">
                  <ShuffleIcon className="size-3 mr-1" /> Random Avatar
                </button>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2"><User2Icon className="size-4"/> Full Name</span>
                </label>
                <input
                  type="text"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                  className="input input-bordered w-full"
                  placeholder="Your full name"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2"><MailIcon className="size-4"/> Email</span>
                </label>
                <div className="relative">
                  <MailIcon className="absolute top-1/2 -translate-y-1/2 left-3 size-5 opacity-70" />
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="input input-bordered w-full pl-10"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2"><QuoteIcon className="size-4"/> Bio</span>
                </label>
                <textarea
                  value={formState.bio}
                  onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                  className="textarea textarea-bordered h-24"
                  placeholder="Tell others about yourself"
                />
              </div>

              <button type="submit" disabled={isPending} className="btn btn-primary w-full">
                {!isPending ? (
                  "Save Changes"
                ) : (
                  <span className="inline-flex items-center"><LoaderIcon className="animate-spin size-5 mr-2"/> Saving...</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
