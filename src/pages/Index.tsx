import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { products, brands, categories } from '@/data/products';

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState('Все');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredProducts = products.filter(product => {
    const brandMatch = selectedBrand === 'Все' || product.brand === selectedBrand;
    const categoryMatch = selectedCategory === 'Все' || product.category === selectedCategory;
    return brandMatch && categoryMatch;
  });

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
          <Header />

          {/* Hero Section */}
          <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
            <div className="container mx-auto text-center">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Volga Models
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Премиальные коллекционные модели автомобилей Hot Wheels, RLC, Mini GT и Tomica 
                для истинных ценителей. Эксклюзивные серии и редкие модели в наличии.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Icon name="Truck" size={16} className="mr-2" />
                  Быстрая доставка по РФ
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Icon name="Shield" size={16} className="mr-2" />
                  100% оригинальные модели
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Icon name="Star" size={16} className="mr-2" />
                  Эксклюзивные серии
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Icon name="Package" size={16} className="mr-2" />
                  Защитная упаковка
                </Badge>
              </div>
              <Button size="lg" className="text-lg px-8 py-3">
                <Icon name="ArrowDown" size={20} className="mr-2" />
                Смотреть каталог
              </Button>
            </div>
          </section>

          {/* Filters */}
          <section className="py-8 px-4 bg-white/50 backdrop-blur-sm border-y" id="catalog">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <h3 className="text-2xl font-bold">Каталог товаров</h3>
                <div className="flex gap-4">
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Выберите бренд" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="py-12 px-4">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
                  <p className="text-muted-foreground">Попробуйте изменить фильтры поиска</p>
                </div>
              )}
            </div>
          </section>

          {/* About Section */}
          <section className="py-16 px-4 bg-muted/30" id="about">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6">О компании Volga Models</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Мы специализируемся на продаже премиальных коллекционных моделей автомобилей 
                    от ведущих мировых производителей. В нашем ассортименте представлены модели 
                    Hot Wheels, включая эксклюзивную серию RLC, детализированные модели Mini GT 
                    и японские Tomica.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Icon name="Award" className="text-primary" size={20} />
                      </div>
                      <div>
                        <div className="font-semibold">5+ лет</div>
                        <div className="text-sm text-muted-foreground">на рынке</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary/10 p-2 rounded-lg">
                        <Icon name="Users" className="text-secondary" size={20} />
                      </div>
                      <div>
                        <div className="font-semibold">10,000+</div>
                        <div className="text-sm text-muted-foreground">довольных клиентов</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-accent/10 p-2 rounded-lg">
                        <Icon name="Package" className="text-accent" size={20} />
                      </div>
                      <div>
                        <div className="font-semibold">500+</div>
                        <div className="text-sm text-muted-foreground">моделей в наличии</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <Icon name="ShieldCheck" className="text-green-500" size={20} />
                      </div>
                      <div>
                        <div className="font-semibold">100%</div>
                        <div className="text-sm text-muted-foreground">гарантия качества</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-6 rounded-lg">
                    <Icon name="Car" className="text-primary mb-4" size={32} />
                    <h4 className="font-semibold mb-2">Hot Wheels</h4>
                    <p className="text-sm text-muted-foreground">
                      Классические и современные модели от легендарного бренда
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 p-6 rounded-lg">
                    <Icon name="Crown" className="text-secondary mb-4" size={32} />
                    <h4 className="font-semibold mb-2">RLC Series</h4>
                    <p className="text-sm text-muted-foreground">
                      Эксклюзивные модели для коллекционеров Red Line Club
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-accent/20 to-accent/10 p-6 rounded-lg">
                    <Icon name="Zap" className="text-accent mb-4" size={32} />
                    <h4 className="font-semibold mb-2">Mini GT</h4>
                    <p className="text-sm text-muted-foreground">
                      Детализированные модели в масштабе 1:64
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-red-500/20 to-red-500/10 p-6 rounded-lg">
                    <Icon name="CircleDot" className="text-red-500 mb-4" size={32} />
                    <h4 className="font-semibold mb-2">Tomica</h4>
                    <p className="text-sm text-muted-foreground">
                      Японские модели с превосходной детализацией
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16 px-4" id="contact">
            <div className="container mx-auto text-center">
              <h3 className="text-3xl font-bold mb-8">Свяжитесь с нами</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Icon name="Mail" className="text-primary" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">Email</h4>
                  <p className="text-muted-foreground">info@volgamodels.ru</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-secondary/10 p-4 rounded-full mb-4">
                    <Icon name="Phone" className="text-secondary" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">Телефон</h4>
                  <p className="text-muted-foreground">+7 (800) 123-45-67</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-accent/10 p-4 rounded-full mb-4">
                    <Icon name="MessageCircle" className="text-accent" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">Telegram</h4>
                  <p className="text-muted-foreground">@volgamodels</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-secondary text-secondary-foreground py-12 px-4">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Car" className="text-primary" size={24} />
                    <h4 className="text-xl font-bold">Volga Models</h4>
                  </div>
                  <p className="text-sm text-secondary-foreground/70 mb-4">
                    Лучшие коллекционные модели автомобилей для истинных ценителей
                  </p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="Instagram" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="MessageCircle" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Youtube" size={16} />
                    </Button>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold mb-3">Каталог</h5>
                  <ul className="space-y-2 text-sm text-secondary-foreground/70">
                    <li><a href="#" className="hover:text-secondary-foreground transition-colors">Hot Wheels</a></li>
                    <li><a href="#" className="hover:text-secondary-foreground transition-colors">Hot Wheels RLC</a></li>
                    <li><a href="#" className="hover:text-secondary-foreground transition-colors">Mini GT</a></li>
                    <li><a href="#" className="hover:text-secondary-foreground transition-colors">Tomica</a></li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-3">Информация</h5>
                  <ul className="space-y-2 text-sm text-secondary-foreground/70">
                    <li><a href="#about" className="hover:text-secondary-foreground transition-colors">О нас</a></li>
                    <li><a href="#" className="hover:text-secondary-foreground transition-colors">Доставка и оплата</a></li>
                    <li><a href="#contact" className="hover:text-secondary-foreground transition-colors">Контакты</a></li>
                    <li><a href="#" className="hover:text-secondary-foreground transition-colors">Гарантии</a></li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-3">Поддержка</h5>
                  <ul className="space-y-2 text-sm text-secondary-foreground/70">
                    <li><a href="#" className="hover:text-secondary-foreground transition-colors">Помощь</a></li>
                    <li><a href="#" className="hover:text-secondary-foreground transition-colors">Возврат</a></li>
                    <li><a href="#" className="hover:text-secondary-foreground transition-colors">Обмен</a></li>
                    <li><a href="#" className="hover:text-secondary-foreground transition-colors">FAQ</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm text-secondary-foreground/70">
                © 2024 Volga Models. Все права защищены.
              </div>
            </div>
          </footer>
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default Index;