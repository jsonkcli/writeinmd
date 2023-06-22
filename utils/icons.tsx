import {
  Coins,
  Image,
  type Icon as LucideIcon,
} from "lucide-react"

interface IconProps {
  name: string;
  className?: string;
}

const icons: { [key: string]: LucideIcon } = {
  google: Coins,
  media: Image
};

export const Icons: React.FC<IconProps> = ({ name, className }: IconProps) => {
  const Icon = icons[name]

  if (!Icon) {
    return null;
  }

  return <span className={` block ${className}`}>
    <Icon />
  </span>;
};

