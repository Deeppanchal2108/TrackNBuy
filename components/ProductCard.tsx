import React from 'react';
import Link from 'next/link';
interface ProductCardProps {
    id: string;
    imageUrl: string | null;
    title: string;
    url: string;
    symbol: string | null;
    discountedPrice: string | null;
    currentPrice: string;
}

function ProductCard({
    imageUrl,
    title,
    url,
    symbol,
    discountedPrice,
    currentPrice
}: ProductCardProps) {
    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#1a1825] hover:bg-[#1f1d2b] transition-all duration-300"
        >
            {/* Image Container */}
            <div className="aspect-square w-full overflow-hidden bg-[#2a2438]">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-contain"
                    />
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                <h3 className="text-white/90 font-medium line-clamp-2 mb-2 text-sm">
                    {title}
                </h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-purple-400 text-lg font-medium">
                        {symbol}{discountedPrice || currentPrice}
                    </span>
                    {discountedPrice && (
                        <span className="text-gray-500 text-sm line-through">
                            {symbol}{currentPrice}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;