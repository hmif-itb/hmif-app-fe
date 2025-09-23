export interface PropertyData {
  id: string;
  name: string;
  type: 'eksklusif' | 'non-eksklusif';
  condition: 'new' | 'used';
  amount: number;
  location: string;
  description?: string;
  image?: string;
}

export interface SekreData {
  id: string;
  name: string;
  type: 'eksklusif' | 'non-eksklusif';
  condition: 'new' | 'used';
  location: string;
  photo?: string;
  status?: 'available' | 'unavailable';
  description?: string;
  capacity?: number;
  facilities?: string[];
}

// Dummy Property Data
const propertyDummyData: PropertyData[] = [
  {
    id: 'prop-001',
    name: 'Proyektor Epson X200',
    condition: 'used',
    amount: 2,
    type: 'eksklusif',
    location: 'Ruang Multimedia',
    description: 'Proyektor berkualitas tinggi untuk presentasi dan acara',
    image: '/img/property/proyektor.jpg',
  },
  {
    id: 'prop-002',
    name: 'Speaker JBL',
    condition: 'new',
    amount: 1,
    type: 'eksklusif',
    location: 'Ruang Sekretariat',
    description: 'Speaker portable dengan kualitas suara jernih',
    image: '/img/property/speaker.jpg',
  },
  {
    id: 'prop-003',
    name: 'Kabel HDMI',
    condition: 'used',
    amount: 5,
    type: 'non-eksklusif',
    location: 'Gudang Properti',
    description: 'Kabel HDMI untuk koneksi perangkat multimedia',
    image: '/img/property/hdmi.jpg',
  },
  {
    id: 'prop-004',
    name: 'Laptop Asus',
    condition: 'new',
    amount: 3,
    type: 'eksklusif',
    location: 'Ruang IT',
    description: 'Laptop untuk keperluan administrasi dan presentasi',
    image: '/img/property/laptop.jpg',
  },
  {
    id: 'prop-005',
    name: 'Microphone Wireless',
    condition: 'new',
    amount: 4,
    type: 'eksklusif',
    location: 'Ruang Audio',
    description: 'Microphone wireless untuk acara dan presentasi',
    image: '/img/property/mic.jpg',
  },
];

// Dummy Sekre Data
const sekreDummyData: SekreData[] = [
  {
    id: 'sekre-001',
    name: 'Sekre 1',
    condition: 'used',
    location: 'Ganesha',
    type: 'eksklusif',
    photo:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
    status: 'unavailable',
    description: 'Ruang sekretariat utama dengan fasilitas lengkap',
    capacity: 20,
    facilities: ['AC', 'Proyektor', 'Whiteboard', 'Wi-Fi'],
  },
  {
    id: 'sekre-002',
    name: 'Ruang Rapat',
    condition: 'new',
    location: 'Jatinangor',
    type: 'eksklusif',
    photo:
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
    status: 'available',
    description: 'Ruang rapat dengan fasilitas modern untuk meeting',
    capacity: 15,
    facilities: ['AC', 'TV', 'Sound System', 'Wi-Fi'],
  },
  {
    id: 'sekre-003',
    name: 'Aula Besar',
    condition: 'used',
    location: 'Ruang Utama Sekre',
    type: 'eksklusif',
    photo:
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop',
    status: 'unavailable',
    description: 'Aula untuk acara besar dan seminar',
    capacity: 100,
    facilities: ['AC', 'Sound System', 'Lighting', 'Stage'],
  },
  {
    id: 'sekre-004',
    name: 'Study Room',
    condition: 'new',
    location: 'Ganesha',
    type: 'non-eksklusif',
    photo:
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop',
    status: 'available',
    description: 'Ruang belajar untuk diskusi kelompok kecil',
    capacity: 8,
    facilities: ['Whiteboard', 'Wi-Fi', 'Power Outlets'],
  },
];

// API Functions
export const fetchAllProperties = async (): Promise<PropertyData[]> => {
  console.log('Fetching all properties...');
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...propertyDummyData];
};

export const fetchAllSekre = async (): Promise<SekreData[]> => {
  console.log('Fetching all sekre...');
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...sekreDummyData];
};

export const fetchPropertyById = async (
  id: string,
): Promise<PropertyData | null> => {
  console.log(`Fetching property with ID: ${id}`);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const property = propertyDummyData.find((prop) => prop.id === id);
  return property || null;
};

export const fetchSekreById = async (id: string): Promise<SekreData | null> => {
  console.log(`Fetching sekre with ID: ${id}`);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const sekre = sekreDummyData.find((s) => s.id === id);
  return sekre || null;
};

// Combined fetch function for both
export const fetchAllPeminjamanData = async (): Promise<{
  properties: PropertyData[];
  sekre: SekreData[];
}> => {
  console.log('Fetching all peminjaman data...');
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    properties: [...propertyDummyData],
    sekre: [...sekreDummyData],
  };
};
