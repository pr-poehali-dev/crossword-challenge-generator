
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from '@/components/ui/Icon';
import CrosswordGrid from '@/components/CrosswordGrid';

// Временные данные для демо
const getDummyCrosswordData = (difficulty: string) => {
  const sizes = {
    normal: 8,
    medium: 10,
    hard: 12,
    expert: 15
  };
  
  const size = sizes[difficulty as keyof typeof sizes] || 8;
  
  // Создаем пустую сетку нужного размера
  const grid = Array(size).fill(null).map(() => Array(size).fill(''));
  
  // Заполняем некоторые ячейки черным цветом (для блокировки)
  const blockedCells = Math.floor(size * size * 0.2); // ~20% ячеек заблокировано
  for (let i = 0; i < blockedCells; i++) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    grid[row][col] = '#';
  }
  
  // Добавляем несколько слов для демонстрации
  const horizontalWords = [
    { row: 1, col: 0, word: "ПРИМЕР", direction: "horizontal" },
    { row: 3, col: 2, word: "ТЕСТ", direction: "horizontal" },
  ];
  
  const verticalWords = [
    { row: 0, col: 2, word: "СЛОВО", direction: "vertical" },
    { row: 2, col: 5, word: "МИР", direction: "vertical" },
  ];
  
  // Подсказки
  const clues = {
    horizontal: [
      { number: 1, clue: "Образец для объяснения" },
      { number: 3, clue: "Проверка знаний" },
    ],
    vertical: [
      { number: 2, clue: "Речевая единица" },
      { number: 5, clue: "Вселенная вокруг нас" },
    ]
  };
  
  return { grid, clues, size };
};

const CrosswordPage = () => {
  const { difficulty = "normal" } = useParams();
  const navigate = useNavigate();
  const [crosswordData, setCrosswordData] = useState(getDummyCrosswordData(difficulty));
  
  // Получаем название сложности для отображения
  const getDifficultyName = () => {
    const names: Record<string, string> = {
      normal: "Нормальный",
      medium: "Обычный",
      hard: "Сложный",
      expert: "Профи"
    };
    return names[difficulty] || "Нормальный";
  };
  
  // Генерация нового кроссворда
  const generateNewCrossword = () => {
    setCrosswordData(getDummyCrosswordData(difficulty));
  };

  return (
    <div className="min-h-screen bg-amber-50 bg-[url('https://images.unsplash.com/photo-1587653263995-422546657aa5?q=80&w=2000')] bg-cover bg-opacity-50 p-4">
      <div className="max-w-5xl mx-auto bg-white/90 rounded-lg shadow-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Icon name="ArrowLeft" size={18} />
            Назад
          </Button>
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Кроссворд: <span className="text-amber-700">{getDifficultyName()}</span>
          </h1>
          <Button 
            variant="outline" 
            onClick={generateNewCrossword}
            className="flex items-center gap-2"
          >
            <Icon name="RefreshCw" size={18} />
            Новый
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Сетка кроссворда */}
          <div className="md:w-2/3">
            <Card className="border-2 border-amber-200 bg-amber-50/70">
              <CardContent className="p-4">
                <CrosswordGrid data={crosswordData} />
              </CardContent>
            </Card>
          </div>
          
          {/* Подсказки */}
          <div className="md:w-1/3">
            <Card className="border-2 border-amber-200 bg-amber-50/70 mb-4">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2 text-amber-800">По горизонтали:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {crosswordData.clues.horizontal.map((clue) => (
                    <li key={`h-${clue.number}`} className="text-gray-700">
                      <span className="font-semibold">{clue.number}.</span> {clue.clue}
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-bold mb-2 mt-4 text-amber-800">По вертикали:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {crosswordData.clues.vertical.map((clue) => (
                    <li key={`v-${clue.number}`} className="text-gray-700">
                      <span className="font-semibold">{clue.number}.</span> {clue.clue}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-amber-600 hover:bg-amber-700"
                onClick={generateNewCrossword}
              >
                <Icon name="RefreshCw" size={18} />
                Новый кроссворд
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-amber-300 bg-amber-100 text-amber-800 hover:bg-amber-200"
              >
                <Icon name="Check" size={18} />
                Проверить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrosswordPage;
