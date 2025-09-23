export interface PropertyData {
  name: string;
  condition: 'new' | 'used';
  amount: number;
  location: string;
}

export interface SekreData {
  name: string;
  condition: 'new' | 'used';
  location: string;
  photo?: string;
}

export interface PropertyFormData {
  name: string;
  condition: 'new' | 'used';
  amount: number;
  location: string;
}

export interface SekreFormData {
  name: string;
  condition: 'new' | 'used';
  location: string;
  photo?: string;
}

// DummyData
export const propertyDummyData: PropertyData[] = [
  {
    name: 'Proyektor Epson X200',
    condition: 'used',
    amount: 2,
    location: 'Ruang Multimedia',
  },
  {
    name: 'Speaker JBL',
    condition: 'new',
    amount: 1,
    location: 'Ruang Sekretariat',
  },
  {
    name: 'Kabel HDMI',
    condition: 'used',
    amount: 5,
    location: 'Gudang Properti',
  },
];

export const sekreDummyData: SekreData[] = [
  {
    name: 'Sekre 1',
    condition: 'used',
    location: 'Ruang Rapat Sekre',
    photo:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
  },
  {
    name: 'Speaker JBL',
    condition: 'new',
    location: 'Gudang Sekre',
    photo:
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
  },
  {
    name: 'Meja Kayu',
    condition: 'used',
    location: 'Ruang Utama Sekre',
    photo:
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop',
  },
  {
    name: 'Kursi Lipat',
    condition: 'new',
    location: 'Ruang Rapat Sekre',
    photo:
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop',
  },
];

// Fetch locations untuk dropdown lokasi Item
export async function fetchLocations(): Promise<string[]> {
  console.log('Fetching locations from API...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['Sekre 1', 'Sekre 2', 'Sekre 3', 'Gudang', 'Ruang Rapat']);
    }, 500);
  });
}

export async function handlePropertyCreate(
  data: PropertyFormData,
): Promise<void> {
  console.log('Creating property:', data);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Property created successfully');
      resolve();
    }, 1000);
  });
}

export async function handleSekreCreate(data: SekreFormData): Promise<void> {
  console.log('Creating sekre:', data);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Sekre created successfully');
      resolve();
    }, 1000);
  });
}
