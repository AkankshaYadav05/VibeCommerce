import { Check, X } from 'lucide-react';

export default function ReceiptModal({ receipt, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Successful!</h2>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Order ID:</span>
            <span className="font-mono text-gray-800">{receipt.orderId.slice(0, 8)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Customer:</span>
            <span className="text-gray-800">{receipt.customerName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Email:</span>
            <span className="text-gray-800">{receipt.customerEmail}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Date:</span>
            <span className="text-gray-800">
              {new Date(receipt.timestamp).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="border-t pt-4 mb-4">
          <h3 className="font-semibold text-gray-800 mb-3">Order Items:</h3>
          <div className="space-y-2">
            {receipt.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.productName} x {item.quantity}
                </span>
                <span className="font-semibold text-gray-800">
                  ${item.subtotal.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-700">Total:</span>
          <span className="text-2xl font-bold text-gray-900">
            ${receipt.total.toFixed(2)}
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
