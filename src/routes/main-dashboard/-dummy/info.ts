const infos = [
  {
    category: 'Himpunan',
    title: 'Sertijab DE 2024/2025',
    description: 'Sertijab kepengurusan DE periode 2024/2025',
    location: 'Parkiran Labtek V',
    timeStart: '10:00',
    timeEnd: '12:00',
    createdAt: '2024-05-10T13:45:36.149Z',
    creatorId: 'o012mt56ctwqskpiztjozetn',
    id: '87623d0b-0923-4840-ae94-fe0751df024f',
  },
  {
    category: 'Himpunan',
    title: 'Kunjungan HMIF x HME',
    description: 'Kunjungan bersama Intrakampus dengan HMJ',
    location: 'Sekre 2 HMIF',
    timeStart: '13:15',
    timeEnd: '14:45',
    createdAt: '2024-05-10T13:45:36.149Z',
    creatorId: 'o012mt56ctwqskpiztjozetn',
    id: '87623d0b-0923-4840-ae94-fe0751df024f',
  },
  {
    category: 'Akademik',
    title: "UTS RPL IF'22",
    description: 'Ujian Tengah Semester Mata Kuliah Rekayasa Perangkat Lunak',
    location: '7609-7610',
    timeStart: '15:10',
    timeEnd: '16:40',
    createdAt: '2024-05-10T13:45:36.149Z',
    creatorId: 'o012mt56ctwqskpiztjozetn',
    id: '87623d0b-0923-4840-ae94-fe0751df024f',
  },
];

export interface Schedule {
  category: string;
  title: string;
  description: string;
  location: string;
  timeStart: string;
  timeEnd: string;
  createdAt: string;
  creatorId: string;
  id: string;
}

export default infos;
