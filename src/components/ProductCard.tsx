import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Товар добавлен в корзину',
      description: `${product.name} добавлен в корзину`,
    });
  };

  const getBrandColor = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'hot wheels':
        return 'bg-primary text-primary-foreground';
      case 'hot wheels rlc':
        return 'bg-accent text-accent-foreground';
      case 'mini gt':
        return 'bg-secondary text-secondary-foreground';
      case 'tomica':
        return 'bg-red-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border">
      <div className="aspect-square p-4 bg-gray-50 rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
          <Badge className={`${getBrandColor(product.brand)} text-xs`}>
            {product.brand}
          </Badge>
        </div>
        <p className="text-gray-600 text-sm mb-3">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
          <Button onClick={handleAddToCart} size="sm">
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            В корзину
          </Button>
        </div>
      </div>
    </div>
  );
};