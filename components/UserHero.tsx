import Image from "next/image";
import Avatar from "@/components/Avatar";
import useUser from "@/hooks/useUser";

interface UserHeroProps {
   userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
   const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
         {fetchedUser?.coverImage && (
            <Image
               fill
               src={fetchedUser.coverImage}
               alt="Cover Image"
               style={{ objectFit: 'cover' }}
            />
         )}
         <div className="absolute -bottom-16 left-4 rounded-full hover:bg-black">
            <Avatar userId={userId} isLarge hasBorder/>
         </div>
      </div>
    </div>
  );
};

export default UserHero;