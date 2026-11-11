const profileData = {
  nama: "Rafly M Ubaidillah",
  nim: "242505010",
  profesi: "Pengembang Aplikasi Seluler & Mahasiswa",
  deskripsi: "Mahasiswa aktif yang antusias mempelajari pengembangan aplikasi mobile menggunakan React Native, antarmuka pengguna, dan teknologi modern.",
  skills: ["Laravel12", "UI/UX Design", "Git & GitHub"],
  pendidikan: "Universitas Ma'soem - S1 Sistem Informasi (2024 - Sekarang)",
  projects: [
    {
      title: "Personal CV Mobile App",
      description: "Aplikasi mobile profil diri dan akademik menggunakan React Native dan Expo.",
      tech: "React Native, Expo"
    },
    {
      title: "Sistem Informasi Akademik",
      description: "Platform web dan mobile untuk memantau capaian akademik mahasiswa.",
      tech: "JavaScript, React"
    }
  ],
  hobbies: [
    { name: "Coding", icon: "💻", desc: "Membangun aplikasi & eksplorasi kode" },
    { name: "UI/UX Design", icon: "🎨", desc: "Membuat sketsa antarmuka pengguna" },
    { name: "Gaming", icon: "🎮", desc: "Bermain game strategi & petualangan" }
  ],
  academic: {
    nama: "Rafly M Ubaidillah",  // <-- Pastikan bagian ini ada di dalam objek academic
    nim: "242505010",           // <-- Pastikan bagian ini ada di dalam objek academic
    mataKuliah: "Pemrograman Mobile 2",
    dosen: "Iin, M.Kom",
    currentScore: {
      nilai: 89,
      grade: "A"
    },
    learningPoints: "12375 LP",
    progress: {
      attendance: "100%",
      practice: "87%",
      quest: "95%",
      challenge: "100%"
    }
  }
};

export default profileData;