
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/Icon';

const Index = () => {
  const difficultyLevels = [
    { name: "Нормальный", value: "normal", icon: "Book" },
    { name: "Обычный", value: "medium", icon: "BookOpen" },
    { name: "Сложный", value: "hard", icon: "Library" },
    { name: "Профи", value: "expert", icon: "GraduationCap" }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 bg-[url('https://images.unsplash.com/photo-1587653263995-422546657aa5?q=80&w=2000')] bg-cover bg-opacity-50">
      <div className="w-full max-w-4xl p-8 bg-white/90 rounded-lg shadow-lg backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Кроссворды</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">Выберите уровень сложности для начала игры</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {difficultyLevels.map(level => (
            <Link to={`/crossword/${level.value}`} key={level.value} className="hover-scale">
              <Card className="border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 bg-amber-50/70">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-3 rounded-full">
                      <Icon name={level.icon} size={24} className="text-amber-800" />
                    </div>
                    <span className="text-xl font-medium text-gray-800">{level.name}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-amber-300 bg-amber-100 text-amber-800 hover:bg-amber-200"
                  >
                    Начать
                    <Icon name="ChevronRight" size={18} />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center text-gray-600 mt-8">
          <p>Кроссворды различной сложности для развития словарного запаса и логики</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
