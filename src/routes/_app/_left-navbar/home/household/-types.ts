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
