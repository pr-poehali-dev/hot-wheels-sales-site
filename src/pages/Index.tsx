import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products: Product[] = [
    {
      id: 1,
      name: 'Ferrari LaFerrari',
      brand: 'Hot Wheels',
      price: 299,
      image: '/img/62cf8cbd-bf06-40db-a4ff-dbef479817e8.jpg',
      category: 'hot-wheels',
      inStock: true
    },
    {
      id: 2,
      name: 'Lamborghini Aventador',
      brand: 'Mini GT',
      price: 1299,
      image: '/img/c6bbe84c-10e9-4b7d-b9b5-d35f1855d327.jpg',
      category: 'mini-gt',
      inStock: true
    },
    {
      id: 3,
      name: 'Toyota Supra',
      brand: 'Tomica',
      price: 599,
      image: '/img/386d72b9-5706-43dd-9aaa-6a72005bb415.jpg',
      category: 'tomica',
      inStock: true
    },
    {
      id: 4,
      name: 'McLaren P1 RLC',
      brand: 'Hot Wheels RLC',
      price: 2499,
      image: '/img/62cf8cbd-bf06-40db-a4ff-dbef479817e8.jpg',
      category: 'rlc',
      inStock: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Все товары', icon: 'Grid3X3' },
    { id: 'hot-wheels', name: 'Hot Wheels', icon: 'Car' },
    { id: 'rlc', name: 'RLC', icon: 'Crown' },
    { id: 'mini-gt', name: 'Mini GT', icon: 'Zap' },
    { id: 'tomica', name: 'Tomica', icon: 'CircleDot' }
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                <Icon name="Car" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Volga Models
                </h1>
                <p className="text-sm text-muted-foreground">Коллекционные модели автомобилей</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Главная</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Каталог</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Предзаказы</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">О нас</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Доставка</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="User" size={16} className="mr-2" />
                Войти
              </Button>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Корзина
                    {getCartItemsCount() > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {getCartItemsCount()}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Корзина покупок</SheetTitle>
                    <SheetDescription>
                      {cart.length === 0 ? 'Корзина пуста' : `${getCartItemsCount()} товаров в корзине`}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                          <p className="font-semibold">{item.price} ₽</p>
                        </div>
                        <div className="flex items-center space-x-2">
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
                        </div>
                      </div>
                    ))}
                    {cart.length > 0 && (
                      <>
                        <Separator />
                        <div className="flex justify-between items-center font-bold text-lg">
                          <span>Итого:</span>
                          <span>{getTotalPrice()} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Премиальные коллекционные модели
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Hot Wheels, RLC, Mini GT, Tomica — лучшие модели для истинных коллекционеров
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Icon name="Truck" size={16} className="mr-2" />
              Быстрая доставка
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Icon name="Shield" size={16} className="mr-2" />
              Гарантия качества
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Icon name="Star" size={16} className="mr-2" />
              Эксклюзивные модели
            </Badge>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">Категории</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <Icon name={category.icon as any} size={16} />
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg bg-gradient-to-br from-muted/20 to-muted/40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.brand}
                    </Badge>
                    {product.inStock && (
                      <Badge variant="secondary" className="text-xs">
                        В наличии
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-primary">
                    {product.price} ₽
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4 mt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                  <Icon name="Car" className="text-white" size={20} />
                </div>
                <h4 className="text-xl font-bold">Volga Models</h4>
              </div>
              <p className="text-sm text-background/70">
                Лучшие коллекционные модели автомобилей для истинных ценителей
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Категории</h5>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Hot Wheels</a></li>
                <li><a href="#" className="hover:text-background transition-colors">RLC</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Mini GT</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Tomica</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Информация</h5>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Предзаказы</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Контакты</h5>
              <div className="space-y-2 text-sm text-background/70">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={14} />
                  <span>info@volgamodels.ru</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={14} />
                  <span>+7 (800) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={14} />
                  <span>Москва, Россия</span>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-background/20" />
          <div className="text-center text-sm text-background/70">
            © 2024 Volga Models. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;