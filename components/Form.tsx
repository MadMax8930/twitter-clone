import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import Button from "@/components/Button";
import Avatar from "@/components/Avatar";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";
import axios from "axios";

interface FormProps {
   placeholder: string;
   isComment?: boolean;
   postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
   const registerModal = useRegisterModal();
   const LoginModal = useLoginModal();
   const { data: currentUser } = useCurrentUser();
   const { mutate: mutatePosts } = usePosts();
   const { mutate: mutatePost } = usePost(postId as string);

   const [body, setBody] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const onSubmit = useCallback(async () => {
      try {
        setIsLoading(true);

        // Separate if it's for global feed (Home) or for a personal reply
        const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';
        await axios.post(url, { body });

        toast.success('Tweet created');
        setBody('');

        mutatePosts();  // mutate existing post so it loads all the new ones including this newly created one
        mutatePost();
      } catch (error) {
        toast.error('Something went wrong.')
      } finally {
        setIsLoading(false);
      }
   }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className="border-neutral-800 border-b-[1px] px-5 py-2">
      {currentUser 
       ? (<div className="flex flex-row gap-4">
            <div>
               <Avatar userId={currentUser?.id} />
            </div>
            <div className="w-full">
               <textarea 
                  placeholder={placeholder}
                  disabled={isLoading} 
                  onChange={(e) => setBody(e.target.value)}
                  value={body}
                  className="bg-black placeholder-neutral-500 text-white text-[20px] ring-0
                              w-full mt-3 resize-none outline-none disabled:opacity-80 peer">
               </textarea>
               <hr className="border-neutral-800 opacity-0 peer-focus:opacity-100 h-[1px] w-full transition" />
               <div className="flex flex-row justify-end mt-4">
                  <Button label="Tweet" onClick={onSubmit} disabled={isLoading || !body} />
               </div>
            </div>
         </div>) 

       : (<div className="py-8">
            <h1 className="text-white text-2xl text-center font-bold mb-4">Welcome to MyTwittah!</h1>
            <div className="flex flex-row items-center justify-center gap-4">
               <Button label="Login" onClick={LoginModal.onOpen} />
               <Button label="Register" onClick={registerModal.onOpen} secondary />
            </div>
         </div>)
      }
    </div>
  );
};

export default Form;