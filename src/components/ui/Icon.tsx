
import * as React from "react";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports;
  fallback?: keyof typeof dynamicIconImports;
}

const Icon = ({ name, fallback = "CircleAlert", ...props }: IconProps) => {
  const [icon, setIcon] = React.useState<React.ComponentType<LucideProps>>();
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const importIcon = async () => {
      try {
        const { default: LucideIcon } = await import(`lucide-react/dist/esm/icons/${name}`);
        setIcon(() => LucideIcon);
        setError(false);
      } catch (err) {
        console.error(`Failed to load icon: ${name}`, err);
        setError(true);
        
        if (fallback && fallback !== name) {
          try {
            const { default: FallbackIcon } = await import(`lucide-react/dist/esm/icons/${fallback}`);
            setIcon(() => FallbackIcon);
          } catch (fallbackErr) {
            console.error(`Failed to load fallback icon: ${fallback}`, fallbackErr);
          }
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
