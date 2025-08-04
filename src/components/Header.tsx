import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from './AuthModal';

export const Header: React.FC = () => {
  const { getTotalItems, items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Car" className="text-primary" size={32} />
          <h1 className="text-2xl font-bold text-secondary">Volga Models</h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#catalog" className="text-gray-600 hover:text-primary transition-colors">Каталог</a>
          <a href="#about" className="text-gray-600 hover:text-primary transition-colors">О нас</a>
          <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">Контакты</a>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Привет, {user?.name}!</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <Icon name="LogOut" size={16} />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setAuthModalOpen(true)}>
              <Icon name="User" size={16} className="mr-2" />
              Войти
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <Icon name="ShoppingCart" size={16} />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Корзина покупок</SheetTitle>
                <SheetDescription>
                  {getTotalItems() === 0 ? 'Ваша корзина пуста' : `${getTotalItems()} товаров в корзине`}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.brand}</p>
                      <p className="font-bold text-primary">{item.price} ₽</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Icon name="Minus" size={12} />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Icon name="Plus" size={12} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
                {items.length > 0 && (
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold">Итого:</span>
                      <span className="text-lg font-bold text-primary">{getTotalPrice()} ₽</span>
                    </div>
                    <Button className="w-full" size="lg">
                      Оформить заказ
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </header>
  );
};