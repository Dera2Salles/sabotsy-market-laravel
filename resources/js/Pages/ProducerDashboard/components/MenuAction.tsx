import { Button } from '@/components/ui/button';
import { MdDelete, MdEdit } from 'react-icons/md';

interface MenuActionProps {
  productId: string;
}

export const MenuAction: React.FC<MenuActionProps> = ({ productId }) => {
  // TODO: Implement Producer context for edit/delete
  const openEditModal = () => console.log('Open edit modal for', productId);
  const deleteProduct = (id: string) => console.log('Delete product', id);

  return (
    <div className=" flex gap-3">
      <Button
        onClick={openEditModal}
        size="icon"
        variant="outline"
        className="rounded-full size-8 cursor-pointer hover:text-white hover:bg-green-700 border-transparent text-green-700"
      >
        <div className=" px-1 py-0.5">
          <MdEdit />
        </div>
      </Button>
      <Button
        onClick={() => deleteProduct(productId)}
        size="icon"
        variant="outline"
        className="rounded-full size-8 cursor-pointer border-transparent text-red-600 hover:bg-red-600 hover:text-white"
      >
        <div className=" px-1 py-0.5">
          <MdDelete />
        </div>
      </Button>
    </div>
  );
};
