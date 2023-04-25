import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Image from "next/image";

interface AvatarProps {
   userId: string;
   isLarge?: boolean;
   hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
   const { data: fetchedUser } = useUser(userId);
   const router = useRouter();

   const onClick = useCallback((event: any) => {
      event.stopPropagation();
      router.push(`/users/${userId}`); 
   } , [router, userId]);
  return (
    <div 
      className={`
         ${hasBorder ? 'border-4 border-black' : ''}
         ${isLarge ? 'h-32' : 'h-12'}
         ${isLarge ? 'w-32' : 'w-12'}
         rounded-full
         hover:opacity-90
         cursor-pointer
         relative
      `}
    >
      <Image 
         fill
         style={{ objectFit: 'cover', borderRadius: '100%' }}
         src={fetchedUser?.profileImage || '/images/placeholder.png'}
         alt="Avatar"
         onClick={onClick}
      /> 
    </div>
  );
};

export default Avatar;