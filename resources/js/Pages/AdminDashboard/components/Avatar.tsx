import pic from '@/assets/apple.jpg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const AvatarProducer = () => {
    return (
        <Avatar className="hover:size-13 size-11 transition-all duration-500">
            <AvatarImage src={pic} alt="Admin picture" />
            <AvatarFallback>RA</AvatarFallback>
        </Avatar>
    );
};
