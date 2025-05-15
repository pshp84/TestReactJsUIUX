// Mock data for services
export const services = [
  {
    id: '1',
    name: 'Manicure & Pedicure',
    icon: 'droplet',
    description: 'Professional nail care services including cuticle treatment, nail shaping, and polish application.'
  },
  {
    id: '2',
    name: 'Hair Styling',
    icon: 'scissors',
    description: 'Expert hair styling services including cuts, color, treatments, and styling for all occasions.'
  },
  {
    id: '3',
    name: 'Massage Therapy',
    icon: 'heart',
    description: 'Relaxing massage services to relieve stress, reduce pain, and improve overall wellness.'
  },
  {
    id: '4',
    name: 'Makeup',
    icon: 'bar-chart',
    description: 'Professional makeup application for everyday looks, special occasions, and photoshoots.'
  },
  {
    id: '5',
    name: 'Skincare',
    icon: 'droplet',
    description: 'Customized skincare treatments to address specific concerns and improve skin health.'
  },
  {
    id: '6',
    name: 'Personal Styling',
    icon: 'shirt',
    description: 'Style consultation and personal shopping services for a refreshed wardrobe.'
  }
];

// Mock data for bookings
export const bookings = [
  {
    id: '1',
    service: 'Manicure & Pedicure',
    date: '2025-05-15',
    time: '10:00 AM',
    status: 'pending' as const,
    client: 'Sarah Johnson',
    professional: 'Emily Chen',
    address: '123 Main St, Apt 4B'
  },
  {
    id: '2',
    service: 'Hair Styling',
    date: '2025-05-16',
    time: '2:00 PM',
    status: 'accepted' as const,
    client: 'Michael Brown',
    professional: 'David Lee',
    address: '456 Oak Ave'
  },
  {
    id: '3',
    service: 'Massage Therapy',
    date: '2025-05-18',
    time: '4:30 PM',
    status: 'completed' as const,
    client: 'Jessica Williams',
    professional: 'Amanda Taylor',
    address: '789 Pine Blvd, Suite 3'
  },
  {
    id: '4',
    service: 'Makeup',
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
    service: 'Manicure & Pedicure',
    text: 'Absolutely loved my at-home manicure! The professional was on time, friendly, and did an amazing job. So convenient!'
  },
  {
    id: '2',
    name: 'Daniel K.',
    avatar: './assets/avtar_2.png',
    rating: 4,
    service: 'Massage Therapy',
    text: 'Great massage service in the comfort of my home. The therapist was professional and addressed all my problem areas.'
  },
  {
    id: '3',
    name: 'Sophia R.',
    avatar: './assets/avtar_3.png',
    rating: 5,
    service: 'Hair Styling',
    text: 'My stylist was amazing! She understood exactly what I wanted and did a beautiful job with my hair color and cut.'
  }
];