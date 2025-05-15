import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { Droplet, Scissors, BarChart3, Heart, MessagesSquare, Shirt } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    icon: string;
    description: string;
  };
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const getIcon = (iconName: string) => {
    const iconProps = { size: 28, className: "text-pink-500 mb-2" };
    
    switch (iconName) {
      case 'droplet':
        return <Droplet {...iconProps} />;
      case 'scissors':
        return <Scissors {...iconProps} />;
      case 'bar-chart':
        return <BarChart3 {...iconProps} />;
      case 'heart':
        return <Heart {...iconProps} />;
      case 'messages':
        return <MessagesSquare {...iconProps} />;
      case 'shirt':
        return <Shirt {...iconProps} />;
      default:
        return <Heart {...iconProps} />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="text-center">
        <div className="flex justify-center">
          {getIcon(service.icon)}
        </div>
        <CardTitle>{service.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-gray-600 text-sm">
        <CardDescription>{service.description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;