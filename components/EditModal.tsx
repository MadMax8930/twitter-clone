import { useState, useEffect, useCallback } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/Input";
import { toast } from "react-hot-toast";
import axios from "axios";

const EditModal = () => {
   const { data: currentUser } = useCurrentUser();
   const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
   const editModal = useEditModal();

   const [profileImage, setProfileImage] = useState('');
   const [coverImage, setCoverImage] = useState('');
   const [username, setUsername] = useState('');
   const [name, setName] = useState('');
   const [bio, setBio] = useState('');

   useEffect(() => {
      setProfileImage(currentUser?.profileImage);
      setCoverImage(currentUser?.coverImage);
      setUsername(currentUser?.username);
      setName(currentUser?.name);
      setBio(currentUser?.bio);
   }, [currentUser]);

   const [isLoading, setIsLoading] = useState(false);

   const onSubmit = useCallback(async () => {
      try {
        setIsLoading(true);
        await axios.patch('/api/edit', {
         name,
         username,
         bio,
         profileImage,
         coverImage
        });
        mutateFetchedUser();

        toast.success('Updated');

        editModal.onClose();
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
   }, [name, username, bio, profileImage, coverImage, mutateFetchedUser, editModal]);

   const bodyContent = (
      <div className="flex flex-col gap-4">
         <ImageUpload 
            label="Upload profile image"
            onChange={(image) => setProfileImage(image)}
            value={profileImage}
            disabled={isLoading} 
         />
         <ImageUpload 
            label="Upload cover image"
            onChange={(image) => setCoverImage(image)}
            value={coverImage}
            disabled={isLoading} 
         />
         <Input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isLoading}
         />
         <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            disabled={isLoading}
         />
         <Input
            placeholder="Bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            disabled={isLoading}
         />
      </div>
   )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;