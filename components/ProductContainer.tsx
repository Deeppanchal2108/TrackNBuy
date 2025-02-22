"use client"
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '@/actions/productActions';
import { getUserIdfromClerkId } from '@/actions/userAction';

function ProductContainer({ clerkId }: { clerkId: string }) {
    const [products, setProducts] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getUserIdfromClerkId(clerkId);
                if (!result.success || !result.id) {
                    setError("Failed to fetch user");
                    return;
                }

                const productsData = await getProducts(result.id);
                if (!productsData.success || !productsData.data) {
                    setError("Failed to fetch products");
                    return;
                }

                setProducts(productsData.data);
            } catch (err) {
                setError("An error occurred");
            }
        };

        fetchProducts();
    }, [clerkId]);

    if (error) {
        return <div className="text-white">{error}</div>;
    }

    return (
        <div className="relative z-20 px-6 py-8">
            <h2 className="text-xl font-medium text-white/90 mb-6">Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        imageUrl={product.imageUrl}
                        title={product.title}
                        url={product.url}
                        symbol={product.symbol}
                        discountedPrice={product.discountedPrice}
                        currentPrice={product.currentPrice}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductContainer;