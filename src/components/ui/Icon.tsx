
import * as React from "react";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { AlertCircle } from "lucide-react"; // Импортируем fallback иконку напрямую

interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports;
  fallback?: keyof typeof dynamicIconImports;
}

const Icon = ({ name, fallback, ...props }: IconProps) => {
  const [icon, setIcon] = React.useState<React.ComponentType<LucideProps>>();
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const importIcon = async () => {
      try {
        // Проверяем, существует ли такое имя иконки в списке доступных
        if (!(name in dynamicIconImports)) {
          throw new Error(`Icon name "${name}" not found in dynamicIconImports`);
        }
        
        const iconImport = await import(`lucide-react/dist/esm/icons/${dynamicIconImports[name]}`);
        setIcon(() => iconImport.default);
        setError(false);
      } catch (err) {
        console.error(`Failed to load icon: ${name}`, err);
        setError(true);
        
        // Используем fallback иконку, если она указана
        if (fallback && fallback !== name && fallback in dynamicIconImports) {
          try {
            const fallbackImport = await import(`lucide-react/dist/esm/icons/${dynamicIconImports[fallback]}`);
            setIcon(() => fallbackImport.default);
          } catch (fallbackErr) {
            console.error(`Failed to load fallback icon: ${fallback}`, fallbackErr);
            setIcon(() => AlertCircle); // Используем предварительно импортированную иконку
          }
        } else {
          setIcon(() => AlertCircle); // Используем предварительно импортированную иконку
        }
      }
    };
    
    importIcon();
  }, [name, fallback]);

  if (!icon) {
    return <div className="w-5 h-5 animate-pulse bg-gray-200 rounded" />;
  }

  const IconComponent = icon;
  return <IconComponent {...props} />;
};

export default Icon;
