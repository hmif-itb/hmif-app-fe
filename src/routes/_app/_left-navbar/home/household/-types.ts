export interface PropertyFormData {
  name: string;

  condition: 'good' | 'broken' | 'cant_be_used' | 'lost';

  quantity: number;

  location: string;
}

export interface PropertiResponseData {
  id: string;

  name: string;

  description: string | null;

  category: 'sekre' | 'properti';

  condition: 'good' | 'broken' | 'cant_be_used' | 'lost';

  quantity: number;

  location: 'Sekretariat 1' | 'Sekretariat 2' | 'Jatinangor';

  photo: string | null;

  createdAt: string;

  updatedAt: string;

  status: 'in_use' | 'available';
}

export type PropertyData = PropertiResponseData;

export interface SekreFormData {
  name: string;

  condition: 'good' | 'broken' | 'cant_be_used' | 'lost';

  location: string;

  photo?: string | null;
}

export type SekreData = PropertiResponseData;

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

  buktiFotoUrl?: string;
}

export interface ReportData {
  id: string;

  borrowerName: string;

  profilePicture?: string;

  item: string;

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

  name: string;

  type: 'sekre' | 'properti';

  start_time: Date;

  end_time: Date;
}

export interface PeminjamanItemData {
  id: string;

  name: string;

  item: string;

  startDate: string;

  endDate: string;

  status: string;
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

export interface PengembalianFormData {
  startDate: string;

  endDate: string;

  startTime: string;

  endTime: string;

  jenisPeminjaman: string;

  alasan: string;
}
