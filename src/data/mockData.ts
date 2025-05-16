// Mock data for services
export const services = [
  {
    id: '1',
    name: 'Manicura y pedicura',
    icon: 'droplet',
    description: 'Servicios profesionales de cuidado de uñas que incluyen tratamiento de cutículas, modelado de uñas y aplicación de esmalte.'
  },
  {
    id: '2',
    name: 'Peinado',
    icon: 'scissors',
    description: 'Servicios expertos de peinado que incluyen cortes, color, tratamientos y peinados para todas las ocasiones.'
  },
  {
    id: '3',
    name: 'Terapia de masaje',
    icon: 'heart',
    description: 'Servicios de masajes relajantes para aliviar el estrés, reducir el dolor y mejorar el bienestar general.'
  },
  {
    id: '4',
    name: 'Maquillaje',
    icon: 'bar-chart',
    description: 'Aplicación de maquillaje profesional para looks cotidianos, ocasiones especiales y sesiones de fotos.'
  },
  {
    id: '5',
    name: 'Cuidado de la piel',
    icon: 'droplet',
    description: 'Tratamientos personalizados para el cuidado de la piel para abordar problemas específicos y mejorar la salud de la piel.'
  },
  {
    id: '6',
    name: 'Estilismo personal',
    icon: 'shirt',
    description: 'Servicios de asesoramiento de estilo y compras personales para un armario renovado.'
  }
];

// Mock data for bookings
export const bookings = [
  {
    id: '1',
    service: 'Manicura y pedicura',
    date: '2025-05-15',
    time: '10:00 AM',
    status: 'pending' as const,
    client: 'Sarah Johnson',
    professional: 'Emily Chen',
    address: '123 Main St, Apt 4B'
  },
  {
    id: '2',
    service: 'Peinado',
    date: '2025-05-16',
    time: '2:00 PM',
    status: 'accepted' as const,
    client: 'Michael Brown',
    professional: 'David Lee',
    address: '456 Oak Ave'
  },
  {
    id: '3',
    service: 'Terapia de masaje',
    date: '2025-05-18',
    time: '4:30 PM',
    status: 'completed' as const,
    client: 'Jessica Williams',
    professional: 'Amanda Taylor',
    address: '789 Pine Blvd, Suite 3'
  },
  {
    id: '4',
    service: 'Maquillaje',
    date: '2025-05-20',
    time: '11:00 AM',
    status: 'rejected' as const,
    client: 'Robert Davis',
    professional: 'Sophia Rodriguez',
    address: '101 Cedar St'
  }
];

// Mock testimonials data
export const testimonials = [
  {
    id: '1',
    name: 'Jennifer M.',
    avatar: './assets/avtar.png',
    rating: 5,
    service: 'Manicura y pedicura',
    text: '¡Me encantó mi manicura en casa! El profesional fue puntual, amable e hizo un trabajo increíble. ¡Tan conveniente!'
  },
  {
    id: '2',
    name: 'Daniel K.',
    avatar: './assets/avtar_2.png',
    rating: 4,
    service: 'Terapia de masaje',
    text: 'Gran servicio de masajes en la comodidad de mi hogar. El terapeuta fue profesional y abordó todas mis áreas problemáticas.'
  },
  {
    id: '3',
    name: 'Sophia R.',
    avatar: './assets/avtar_3.png',
    rating: 5,
    service: 'Peinado',
    text: '¡Mi estilista fue increíble! Ella entendió exactamente lo que quería e hizo un hermoso trabajo con el color y el corte de mi cabello.'
  }
];