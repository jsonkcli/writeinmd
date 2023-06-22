import {
  Coins,
  type Icon as LucideIcon,
} from "lucide-react"

interface IconProps {
  name: string;
  className?: string;
}

const icons: { [key: string]: React.ReactElement } = {
  google: Coins
};

export const Icons: React.FC<IconProps> = ({ name, className }: IconProps) => {
  const icon = icons[name]

  if (!icon) {
    return null;
  }

  return <span className={` block ${className}`}>{icon}</span>;
};

