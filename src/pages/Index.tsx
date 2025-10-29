import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Link {
  id: number;
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
}

const MOCK_LINKS: Link[] = [
  {
    id: 1,
    title: 'Документация React',
    url: 'https://react.dev',
    description: 'Официальная документация React - современная библиотека для создания пользовательских интерфейсов',
    category: 'Разработка',
    tags: ['react', 'frontend', 'javascript']
  },
  {
    id: 2,
    title: 'TypeScript Handbook',
    url: 'https://www.typescriptlang.org/docs/',
    description: 'Полное руководство по TypeScript для разработчиков',
    category: 'Разработка',
    tags: ['typescript', 'javascript', 'types']
  },
  {
    id: 3,
    title: 'GitHub',
    url: 'https://github.com',
    description: 'Платформа для хостинга кода и совместной разработки проектов',
    category: 'Инструменты',
    tags: ['git', 'vcs', 'collaboration']
  },
  {
    id: 4,
    title: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    description: 'Крупнейшее сообщество разработчиков для поиска ответов на технические вопросы',
    category: 'Сообщество',
    tags: ['qa', 'help', 'community']
  },
  {
    id: 5,
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description: 'Документация по веб-технологиям: HTML, CSS, JavaScript и Web APIs',
    category: 'Разработка',
    tags: ['html', 'css', 'javascript', 'api']
  },
  {
    id: 6,
    title: 'Figma',
    url: 'https://www.figma.com',
    description: 'Collaborative design tool для создания интерфейсов и прототипов',
    category: 'Дизайн',
    tags: ['design', 'ui', 'ux', 'prototyping']
  }
];

const CATEGORIES = ['Все', 'Разработка', 'Инструменты', 'Сообщество', 'Дизайн'];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredLinks = MOCK_LINKS.filter(link => {
    const matchesSearch = 
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Все' || link.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary rounded-lg">
              <Icon name="Link2" className="text-primary-foreground" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Форум Mellero</h1>
              <p className="text-muted-foreground">Важные ресурсы и информация</p>
            </div>
          </div>
          
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Поиск по ссылкам, описанию или тегам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-200"
            >
              {category}
            </Button>
          ))}
        </div>

        {filteredLinks.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="SearchX" className="mx-auto mb-4 text-muted-foreground" size={64} />
            <h2 className="text-2xl font-semibold mb-2 text-foreground">Ничего не найдено</h2>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLinks.map((link, index) => (
              <Card 
                key={link.id} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => window.open(link.url, '_blank')}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {link.title}
                    </CardTitle>
                    <Icon name="ExternalLink" className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" size={20} />
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    {link.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-3">
                    {link.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {link.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Форум ссылок • Все важные ресурсы в одном месте</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;