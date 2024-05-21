const infos = [
  {
    date: '18',
    info: [
      {
        category: 'Workshop',
        title: 'Workshop React JS',
        description:
          'Pelatihan intensif tentang React JS untuk pengembangan web',
        location: 'Lab. Komputer Gedung A',
        timeStart: '09:00',
        timeEnd: '12:00',
        createdAt: '2024-05-13T08:00:00.000Z',
        creatorId: 'o015mt56ctwqskpiztjozetn',
        id: '87623d0b-0923-4840-ae94-fe0751df024k',
      },
      {
        category: 'Diskusi',
        title: 'Diskusi Terbuka tentang AI',
        description: 'Diskusi tentang perkembangan dan etika penggunaan AI',
        location: 'Ruang Rapat Gedung D',
        timeStart: '13:00',
        timeEnd: '15:00',
        createdAt: '2024-05-13T09:00:00.000Z',
        creatorId: 'o015mt56ctwqskpiztjozetn',
        id: '87623d0b-0923-4840-ae94-fe0751df024l',
      },
    ],
  },
  {
    date: '19',
    info: [
      {
        category: 'Workshop',
        title: 'Workshop Python untuk Data Science',
        description:
          'Pelatihan intensif tentang Python dan aplikasinya dalam Data Science',
        location: 'Lab. Komputer Gedung B',
        timeStart: '09:00',
        timeEnd: '12:00',
        createdAt: '2024-05-11T10:00:00.000Z',
        creatorId: 'o013mt56ctwqskpiztjozetn',
        id: '87623d0b-0923-4840-ae94-fe0751df024h',
      },
      {
        category: 'Lomba',
        title: 'Kompetisi Coding Nasional',
        description: 'Kompetisi Coding antar universitas tingkat nasional',
        location: 'Aula Gedung F',
        timeStart: '13:00',
        timeEnd: '17:00',
        createdAt: '2024-05-11T11:00:00.000Z',
        creatorId: 'o013mt56ctwqskpiztjozetn',
        id: '87623d0b-0923-4840-ae94-fe0751df024i',
      },
    ],
  },
  {
    date: '20',
    info: [
      {
        category: 'Seminar',
        title: 'Seminar Kewirausahaan',
        description: 'Seminar tentang kewirausahaan dan startup',
        location: 'Aula Gedung C',
        timeStart: '10:00',
        timeEnd: '12:00',
        createdAt: '2024-05-12T09:30:00.000Z',
        creatorId: 'o014mt56ctwqskpiztjozetn',
        id: '87623d0b-0923-4840-ae94-fe0751df024j',
      },
    ],
  },
  {
    date: '21',
    info: [
      {
        category: 'Himpunan',
        title: 'Sertijab DE 2024/2025',
        description: 'Sertijab kepengurusan DE periode 2024/2025',
        location: 'Parkiran Labtek V',
        timeStart: '10:00',
        timeEnd: '12:00',
        createdAt: '2024-05-10T13:45:36.149Z',
        creatorId: 'o012mt56ctwqskpiztjozetn',
        id: '87623d0b-0923-4840-ae94-fe0751df024e',
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
        description:
          'Ujian Tengah Semester Mata Kuliah Rekayasa Perangkat Lunak',
        location: '7609-7610',
        timeStart: '15:10',
        timeEnd: '16:40',
        createdAt: '2024-05-10T13:45:36.149Z',
        creatorId: 'o012mt56ctwqskpiztjozetn',
        id: '87623d0b-0923-4840-ae94-fe0751df024g',
      },
    ],
  },
  {
    date: '22',
    info: [
      {
        category: 'Lomba',
        title: 'Hackathon 2024',
        description: 'Hackathon untuk pengembangan aplikasi inovatif',
        location: 'Gedung E',
        timeStart: '08:00',
        timeEnd: '20:00',
        createdAt: '2024-05-14T08:30:00.000Z',
        creatorId: 'o016mt56ctwqskpiztjozetn',
        id: '87623d0b-0923-4840-ae94-fe0751df024m',
      },
    ],
  },
  {
    date: '23',
    info: [
      {
        category: 'Himpunan',
        title: 'Rapat Kerja Himpunan',
        description: 'Rapat kerja untuk membahas program kerja himpunan',
        location: 'Sekre Himpunan',
        timeStart: '10:00',
        timeEnd: '12:00',
        createdAt: '2024-05-15T09:00:00.000Z',
        creatorId: 'o017mt56ctwqskpiztjozetn',
        id: '87623d0b-0923-4840-ae94-fe0751df024n',
      },
    ],
  },
  {
    date: '24',
    info: [
      {
        category: 'Seminar',
        title: 'Seminar Teknologi Blockchain',
        description: 'Seminar tentang teknologi blockchain dan aplikasinya',
        location: 'Aula Gedung B',
        timeStart: '09:00',
        timeEnd: '11:00',
        createdAt: '2024-05-16T08:30:00.000Z',
        creatorId: 'o018mt56ctwqskpiztjozetn',
        id: '87623d0b-0923-4840-ae94-fe0751df024o',
      },
      {
        category: 'Workshop',
        title: 'Workshop UI/UX Design',
        description: 'Pelatihan intensif tentang desain UI/UX untuk aplikasi',
        location: 'Lab. Komputer Gedung C',
        timeStart: '13:00',
        timeEnd: '16:00',
        createdAt: '2024-05-16T09:00:00.000Z',
        creatorId: 'o018mt56ctwqskpiztjozetn',
        id: '87623d0b-0923-4840-ae94-fe0751df024p',
      },
    ],
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
