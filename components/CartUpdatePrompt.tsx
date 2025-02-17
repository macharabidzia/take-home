import React, { JSX } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CartUpdatePromptProps {
  changes: { item: any; change: string; changes?: any }[] | null;
  onAcknowledge: () => void;
}

const CartUpdatePrompt: React.FC<CartUpdatePromptProps> = ({ changes, onAcknowledge }) => {
  if (!changes || changes.length === 0) {
    return null;
  }
  return (
    <Dialog open={true} onOpenChange={onAcknowledge}>
      <DialogContent className="p-8 rounded-lg shadow-md bg-white">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-800">Cart Updated</DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-3">
          {changes.map((change, index) => (
            <div key={index} className="text-base text-gray-700">
              <DialogDescription className="font-medium">
                {formatChangeMessage(change)}
              </DialogDescription>{' '}
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Button
            onClick={onAcknowledge}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
          >
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const formatChangeMessage = (change: {
  item: any;
  change: string;
  changes?: any;
}): JSX.Element | string => {
  const { item, change: changeType, changes } = change;
  const productTitle = item?.product?.title;

  if (!productTitle) {
    return 'Product information not available.';
  }

  const message =
    changeType === 'added' || changeType === 'removed'
      ? `${productTitle} ${changeType} from your cart.`
      : changeType === 'quantity_changed'
        ? `Quantity of ${productTitle} updated to ${changes.newQuantity}.`
        : changeType === 'availableQuantity_changed'
          ? `Availability of ${productTitle} changed.`
          : changeType === 'out_of_stock'
            ? `${productTitle} is out of stock.`
            : `Update: ${changeType}`;

  return <span className={changeType === 'out_of_stock' ? 'text-red-500' : ''}>{message}</span>;
};

export default CartUpdatePrompt;
