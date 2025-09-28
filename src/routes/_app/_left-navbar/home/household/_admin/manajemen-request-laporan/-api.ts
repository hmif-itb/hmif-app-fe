// Types for the data
export interface RequestData {
  id: number;
  name: string;
  profilePicture?: string;
  startDate: string;
  endDate: string;
  status: string;
  item?: string;
  borrowTime?: string;
  quantity?: number;
  type?: string;
  reason?: string;
  category: 'sekre' | 'properti';
}

export interface ReportData {
  id: number;
  name: string;
  profilePicture?: string;
  startDate: string;
  endDate: string;
  status: string;
  reportContent?: string;
  photo?: string;
  category: 'sekre' | 'properti';
}

// Dummy data
const sampleRequests: RequestData[] = [
  {
    id: 1,
    name: 'Adinda Putri',
    startDate: '03/01/2022',
    endDate: '05/01/2022',
    status: 'Pending',
    item: 'Proyektor',
    borrowTime: '09:00 - 17:00',
    quantity: 2,
    type: 'Eksklusif',
    reason:
      'Ingin menonton kimetsu no yaiba dari pagi hingga malam, setelah itu karaoke sepanjang hari menggunakan proyektor yang ada.',
    category: 'properti',
  },
  {
    id: 2,
    name: 'Akabane Karma',
    startDate: '03/01/2022',
    endDate: '05/01/2022',
    status: 'Pending',
    item: 'Ruang Rapat',
    borrowTime: '09:00 - 17:00',
    quantity: 1,
    type: 'Eksklusif',
    reason:
      'Membutuhkan ruangan untuk meeting tim dan presentasi project akhir semester.',
    category: 'sekre',
  },
  {
    id: 3,
    name: 'Budi Santoso',
    startDate: '05/01/2022',
    endDate: '07/01/2022',
    status: 'Pending',
    item: 'Speaker JBL',
    borrowTime: '14:00 - 18:00',
    quantity: 3,
    type: 'Berbagi',
    reason: 'Acara musik dan karaoke bersama teman-teman di sekre.',
    category: 'properti',
  },
  {
    id: 4,
    name: 'Citra Dewi',
    startDate: '08/01/2022',
    endDate: '10/01/2022',
    status: 'Pending',
    item: 'Ruang Aula',
    borrowTime: '10:00 - 16:00',
    quantity: 1,
    type: 'Eksklusif',
    reason: 'Event organisasi dan workshop untuk mahasiswa baru.',
    category: 'sekre',
  },
];

const sampleReports: ReportData[] = [
  {
    id: 1,
    name: 'Adinda Putri',
    startDate: '03/01/2022',
    endDate: '05/01/2022',
    status: 'Pending',
    reportContent:
      'Proyektor tidak bisa menampilkan gambar dengan jelas, layar sering berkedip.',
    photo:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
    category: 'properti',
  },
  {
    id: 2,
    name: 'Akabane Karma',
    startDate: '03/01/2022',
    endDate: '05/01/2022',
    status: 'Pending',
    reportContent: 'AC di ruang rapat rusak, suhu terlalu panas untuk meeting.',
    photo:
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
    category: 'sekre',
  },
  {
    id: 3,
    name: 'Budi Santoso',
    startDate: '05/01/2022',
    endDate: '05/01/2022',
    status: 'Pending',
    reportContent:
      'Kabel proyektor putus dan perlu diganti. Kondisi fisik proyektor juga kotor dan perlu dibersihkan.',
    photo:
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop',
    category: 'properti',
  },
  {
    id: 4,
    name: 'Citra Dewi',
    startDate: '08/01/2022',
    endDate: '10/01/2022',
    status: 'Pending',
    reportContent:
      'Kursi di ruang aula ada yang patah, berbahaya untuk digunakan.',
    photo:
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop',
    category: 'sekre',
  },
];

// API simulation functions
export const fetchRequests = async (): Promise<RequestData[]> => {
  console.log('Fetching requests from API...');
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...sampleRequests];
};

export const fetchReports = async (): Promise<ReportData[]> => {
  console.log('Fetching reports from API...');
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...sampleReports];
};

// Combined fetch function for both requests and reports
export const fetchRequestsAndReports = async (): Promise<{
  requests: RequestData[];
  reports: ReportData[];
}> => {
  console.log('Fetching all data from API...');
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    requests: [...sampleRequests],
    reports: [...sampleReports],
  };
};
