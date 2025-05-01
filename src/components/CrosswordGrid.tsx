
import { useState } from 'react';

interface CrosswordGridProps {
  data: {
    grid: string[][];
    size: number;
    clues: {
      horizontal: { number: number; clue: string }[];
      vertical: { number: number; clue: string }[];
    };
  };
}

const CrosswordGrid = ({ data }: CrosswordGridProps) => {
  const { grid, size } = data;
  
  // Инициализируем состояние для ввода пользователя
  const [userInput, setUserInput] = useState<string[][]>(
    Array(size).fill(null).map(() => Array(size).fill(''))
  );
  
  // Создаем номера ячеек для отображения подсказок
  const cellNumbers: (number | null)[][] = Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));
  
  // Простая демо-логика для отображения номеров в сетке
  // В реальном приложении эти номера должны соответствовать подсказкам
  let currentNumber = 1;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      // Пропускаем заблокированные ячейки
      if (grid[row][col] === '#') continue;
      
      // Проверяем, является ли эта ячейка началом слова
      const isStartOfHorizontal = col === 0 || grid[row][col - 1] === '#';
      const isStartOfVertical = row === 0 || grid[row - 1][col] === '#';
      
      if (isStartOfHorizontal || isStartOfVertical) {
        cellNumbers[row][col] = currentNumber++;
      }
    }
  }
  
  // Обрабатываем изменения в ячейках
  const handleCellChange = (row: number, col: number, value: string) => {
    // Пропускаем заблокированные ячейки
    if (grid[row][col] === '#') return;
    
    // Принимаем только одну букву
    const char = value.toUpperCase().charAt(0);
    
    const newUserInput = [...userInput];
    newUserInput[row][col] = char;
    setUserInput(newUserInput);
  };

  return (
    <div 
      className="grid gap-px bg-gray-300" 
      style={{ 
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        width: 'fit-content',
        margin: '0 auto'
      }}
    >
      {grid.map((row, rowIndex) => 
        row.map((cell, colIndex) => (
          <div 
            key={`${rowIndex}-${colIndex}`}
            className={`relative ${
              cell === '#' 
                ? 'bg-gray-900' 
                : 'bg-white'
            } w-9 h-9 md:w-10 md:h-10 flex items-center justify-center font-bold text-lg`}
          >
            {cell !== '#' && (
              <>
                {cellNumbers[rowIndex][colIndex] && (
                  <span className="absolute text-xs top-0.5 left-0.5 text-gray-500">
                    {cellNumbers[rowIndex][colIndex]}
                  </span>
                )}
                <input
                  type="text"
                  maxLength={1}
                  value={userInput[rowIndex][colIndex]}
                  onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                  className="w-full h-full text-center font-medium text-gray-800 focus:outline-none focus:bg-amber-100 uppercase"
                  style={{ caretColor: 'transparent' }}
                />
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CrosswordGrid;
