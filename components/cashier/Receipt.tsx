import React from "react";

interface ReceiptProps {
    items: {
        name: string;
        quantity: number;
        price: number;
    }[];
    subtotal: number;
    discount: number;
    total: number;
    cashierName: string;
    date: string;
}

export const Receipt = React.forwardRef<HTMLDivElement, ReceiptProps>(
    ({ items, subtotal, discount, total, cashierName, date }, ref) => {
        return (
            <div ref={ref} className="hidden print:block w-[80mm] p-4 font-mono text-sm text-black">
                <div className="text-center mb-4">
                    <h1 className="text-xl font-bold mb-1">New Patisse</h1>
                    <p className="text-xs">33 B LOT RIAD SALAM BD MOHAMMAD 6 MOHAMMEDIA</p>
                    <p className="text-xs mt-1">Tel: +212 662-394164</p>
                    <div className="mt-2 text-xs border-b border-dashed border-gray-400 pb-2">
                        <p>Date: {date}</p>
                        <p>Cashier: {cashierName}</p>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between font-bold border-b border-dashed border-gray-400 pb-1 mb-2">
                        <span className="w-1/2 text-left">Item</span>
                        <span className="w-1/4 text-center">Qty</span>
                        <span className="w-1/4 text-right">Price</span>
                    </div>
                    {items.map((item, index) => (
                        <div key={index} className="flex justify-between mb-1">
                            <span className="w-1/2 text-left truncate pr-1">{item.name}</span>
                            <span className="w-1/4 text-center">{item.quantity}</span>
                            <span className="w-1/4 text-right">{(item.price * item.quantity).toFixed(2)} DH</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-dashed border-gray-400 pt-2 mb-4">
                    <div className="flex justify-between mb-1">
                        <span>Subtotal:</span>
                        <span>{subtotal.toFixed(2)} DH</span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between mb-1">
                            <span>Discount:</span>
                            <span>-{discount.toFixed(2)} DH</span>
                        </div>
                    )}
                    <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-dashed border-gray-400">
                        <span>Total:</span>
                        <span>{total.toFixed(2)} DH</span>
                    </div>
                </div>

                <div className="text-center text-xs mt-6">
                    <p className="mb-2">Thank you for your visit!</p>
                    <p>Wifi: KKP_Guest</p>
                </div>
            </div>
        );
    }
);

Receipt.displayName = "Receipt";
