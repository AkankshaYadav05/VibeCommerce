import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const subtotal = item.products.price * item.quantity;

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
      <img
        src={item.products.image_url}
        alt={item.products.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{item.products.name}</h4>
        <p className="text-gray-600">${item.products.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
          className="p-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
          disabled={item.quantity <= 1}
        >
          <Minus size={16} />
        </button>
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="p-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="text-right min-w-20">
        <p className="font-bold text-gray-800">${subtotal.toFixed(2)}</p>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}
