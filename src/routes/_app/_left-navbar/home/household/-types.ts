export interface PropertyFormData {
  name: string;
  condition: 'good' | 'broken' | 'cant_be_used' | 'lost';
  quantity: number;
  location: string;
}

export interface PropertyData {
  id: string;
  name: string;
  condition: 'good' | 'broken' | 'cant_be_used' | 'lost';
  quantity: number;
  location: string;
}

export interface SekreFormData {
  name: string;
  condition: 'good' | 'broken' | 'cant_be_used' | 'lost';
  location: string;
  photo?: string;
}

export interface SekreData {
  id: string;
  name: string;
  condition: 'good' | 'broken' | 'cant_be_used' | 'lost';
  location: string;
  photo?: string | null;
}

export interface RequestData {
  id: string;
  borrowerName: string;
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
  id: string;
  borrowerName: string;
  profilePicture?: string;
  startDate: string;
  endDate: string;
  status: string;
  reportContent?: string;
  photo?: string;
  category: 'sekre' | 'properti';
}

export interface EventType {
  user: string;
  title: string;
  type: 'sekre' | 'properti';
  start_time: Date;
}

export interface PeminjamanItemData {
  id: string;
  name: string;
  item: string;
  startDate: string;
  endDate: string;
}

interface HouseholdData {
  events: EventType[];
  peminjamanItems: PeminjamanItemData[];
}

export interface PeminjamanData {
  id: string;
  userName: string;
  userAvatar?: string;
  startDate: string;
  endDate: string;
  properti: string;
  jumlah: number;
  tanggalMulai: string;
  tanggalSelesai: string;
  status: 'aktif' | 'selesai' | 'pending' | 'pending_return' | 'ditolak';
  type: 'properti' | 'sekre';
}