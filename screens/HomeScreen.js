import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Image, ScrollView,
  TextInput, TouchableOpacity, StatusBar,
  ActivityIndicator, Platform, Animated
} from 'react-native';
import profileData from '../data/profileData';

export default function HomeScreen({ navigation }) {
  const [mahasiswa, setMahasiswa] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMahasiswa(profileData);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Fungsi untuk mencetak / menyimpan CV ke PDF — hanya tampilan kertas
  const handlePrintPDF = () => {
    if (typeof window === 'undefined' || !window.print) {
      alert("Fitur cetak PDF hanya dapat digunakan saat membuka aplikasi melalui browser web.");
      return;
    }

    // Inject CSS print khusus — sembunyikan semua kecuali konten CV
    const printStyle = document.createElement('style');
    printStyle.id = 'cv-print-style';
    printStyle.innerHTML = `
      @media print {
        /* Sembunyikan SEMUA elemen dulu */
        body > * { display: none !important; }

        /* Tampilkan hanya root app */
        body > div { display: block !important; }

        /* Reset layout untuk tampilan kertas */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        /* Sembunyikan: header/appbar, tombol cetak PDF, action buttons, like, footer, form kontak */
        [data-print="hide"] {
          display: none !important;
        }

        /* Konten utama: tampil penuh di kertas */
        [data-print="content"] {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 20px !important;
          background: white !important;
          box-shadow: none !important;
        }

        /* Kartu profil & sub kartu */
        [data-print="card"] {
          break-inside: avoid;
          page-break-inside: avoid;
          margin-bottom: 16px !important;
          box-shadow: none !important;
          border: 1px solid #e2e8f0 !important;
        }

        /* Pastikan teks terbaca di print */
        body {
          font-size: 12pt !important;
          color: #000 !important;
          background: white !important;
        }

        /* Hapus shadow & efek visual yang tidak perlu */
        * {
          box-shadow: none !important;
          text-shadow: none !important;
        }

        /* Ukuran halaman A4 */
        @page {
          size: A4 portrait;
          margin: 15mm 12mm;
        }
      }
    `;
    document.head.appendChild(printStyle);

    // Jalankan print dialog
    window.print();

    // Hapus style setelah print selesai
    const cleanup = () => {
      const el = document.getElementById('cv-print-style');
      if (el) el.remove();
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    // Fallback cleanup jika afterprint tidak terpicu
    setTimeout(cleanup, 3000);
  };

  const handleLike = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.3, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    setLiked(!liked);
  };

  const handleSendMessage = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert("Peringatan: Semua kolom formulir harus diisi terlebih dahulu!");
      return;
    }
    setSuccessMessage(`Terima kasih, ${contactForm.name}! Pesan Anda telah terkirim.`);
    setContactForm({ name: '', email: '', message: '' });
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <View style={styles.loaderCard}>
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text style={styles.loaderText}>Memuat Profil Akademik...</Text>
          <Text style={styles.loaderSub}>Mohon tunggu sebentar ✨</Text>
        </View>
      </View>
    );
  }

  if (!mahasiswa) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>⚠️ Gagal memuat data profil.</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainWrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#3730a3" />

      {/* ═══════════════════════════════════════════
          HEADER / APP BAR MODERN
      ═══════════════════════════════════════════ */}
      <View style={styles.appBar} data-print="hide">
        <View style={styles.appBarBrand}>
          <View style={styles.appBarIconWrap}>
            <Text style={styles.appBarIcon}>✨</Text>
          </View>
          <View>
            <Text style={styles.appBarTitle}>My Digital CV</Text>
            <Text style={styles.appBarSub}>Personal Portfolio</Text>
          </View>
        </View>

        <View style={styles.appBarActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('Score')}
          >
            <Text style={styles.headerButtonEmoji}>📊</Text>
            <Text style={styles.headerButtonText}>Score</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.headerButton, styles.printHeaderBtn]}
            onPress={handlePrintPDF}
          >
            <Text style={styles.headerButtonEmoji}>🖨️</Text>
            <Text style={styles.headerButtonText}>PDF</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* ═══════════════════════════════════════════
            KARTU PROFIL UTAMA
        ═══════════════════════════════════════════ */}
        <View style={styles.mainCard}>
          {/* Background dekoratif */}
          <View style={styles.cardBgTop} />
          <View style={styles.cardBgCircle1} />
          <View style={styles.cardBgCircle2} />

          <Image
            source={require('../assets/foto_orang.jpeg')}
            style={styles.profileImage}
          />

          <Text style={styles.name}>{mahasiswa.nama}</Text>
          <Text style={styles.nim}>NIM: {mahasiswa.nim}</Text>

          <View style={styles.badge}>
            <Text style={styles.profesiText}>🎓 {mahasiswa.profesi}</Text>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3+</Text>
              <Text style={styles.statLabel}>Proyek</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>A</Text>
              <Text style={styles.statLabel}>Grade</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>89</Text>
              <Text style={styles.statLabel}>Nilai</Text>
            </View>
          </View>

          {/* Action Buttons Row */}
          <View style={styles.actionButtonRow} data-print="hide">
            <Animated.View style={{ transform: [{ scale: scaleAnim }], flex: 1 }}>
              <TouchableOpacity
                style={[styles.actionBtn, liked ? styles.actionBtnLikedActive : styles.actionBtnLike]}
                onPress={handleLike}
              >
                <Text style={styles.actionBtnEmoji}>{liked ? '❤️' : '🤍'}</Text>
                <Text style={[styles.actionBtnText, liked && styles.actionBtnTextLiked]}>
                  {likeCount > 0 ? `Suka (${likeCount})` : 'Suka'}
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity
              style={[styles.actionBtn, styles.actionBtnScore]}
              onPress={() => navigation.navigate('Score')}
            >
              <Text style={styles.actionBtnEmoji}>📊</Text>
              <Text style={styles.actionBtnText}>Lihat Score</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>👋 Tentang Saya</Text>
            <Text style={styles.deskripsi}>{mahasiswa.deskripsi}</Text>
          </View>
        </View>

        {/* ═══════════════════════════════════════════
            🖨️ TOMBOL CETAK PDF — DASHBOARD UTAMA
        ═══════════════════════════════════════════ */}
        <TouchableOpacity
          style={styles.printPDFCard}
          onPress={handlePrintPDF}
          activeOpacity={0.85}
          data-print="hide"
        >
          <View style={styles.printPDFLeft}>
            <View style={styles.printIconCircle}>
              <Text style={styles.printIconText}>🖨️</Text>
            </View>
            <View style={styles.printPDFTextWrap}>
              <Text style={styles.printPDFTitle}>Cetak / Simpan CV sebagai PDF</Text>
              <Text style={styles.printPDFSub}>Simpan portofolio Anda dalam format PDF</Text>
            </View>
          </View>
          <View style={styles.printArrow}>
            <Text style={styles.printArrowText}>↗</Text>
          </View>
        </TouchableOpacity>

        {/* ═══════════════════════════════════════════
            SECTION KETERAMPILAN / SKILLS
        ═══════════════════════════════════════════ */}
        <View style={[styles.subCard, styles.cardBorderPurple]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>⚡ Keterampilan</Text>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>{mahasiswa.skills.length} skills</Text>
            </View>
          </View>
          <View style={styles.skillsContainer}>
            {mahasiswa.skills.map((skill, index) => (
              <View key={index} style={[styles.skillBadge, { backgroundColor: skillColors[index % skillColors.length].bg, borderColor: skillColors[index % skillColors.length].border }]}>
                <Text style={[styles.skillText, { color: skillColors[index % skillColors.length].text }]}>
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ═══════════════════════════════════════════
            SECTION HOBI
        ═══════════════════════════════════════════ */}
        <View style={[styles.subCard, styles.cardBorderPink]}>
          <Text style={styles.sectionHeading}>🎯 Hobi & Minat</Text>
          {mahasiswa.hobbies.map((hobby, index) => (
            <View key={index} style={styles.hobbyRow}>
              <View style={styles.hobbyIconWrap}>
                <Text style={styles.hobbyIcon}>{hobby.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.hobbyTitle}>{hobby.name}</Text>
                <Text style={styles.hobbyDesc}>{hobby.desc}</Text>
              </View>
              <View style={styles.hobbyChevron}>
                <Text style={styles.hobbyChevronText}>›</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ═══════════════════════════════════════════
            SECTION PENDIDIKAN
        ═══════════════════════════════════════════ */}
        <View style={[styles.subCard, styles.cardBorderBlue]}>
          <Text style={styles.sectionHeading}>🎓 Pendidikan</Text>
          <View style={styles.eduContainer}>
            <View style={styles.eduDot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.eduText}>{mahasiswa.pendidikan}</Text>
              <Text style={styles.eduStatus}>✅ Aktif Kuliah</Text>
            </View>
          </View>
        </View>

        {/* ═══════════════════════════════════════════
            SECTION PORTFOLIO PROYEK
        ═══════════════════════════════════════════ */}
        <View style={[styles.subCard, styles.cardBorderOrange]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>💼 Portofolio Proyek</Text>
            <View style={[styles.sectionBadge, { backgroundColor: '#fff7ed', borderColor: '#fed7aa' }]}>
              <Text style={[styles.sectionBadgeText, { color: '#c2410c' }]}>{mahasiswa.projects.length} proyek</Text>
            </View>
          </View>
          {mahasiswa.projects.map((project, index) => (
            <View key={index} style={styles.projectCard}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectIndex}>#{index + 1}</Text>
                <Text style={styles.projectTitle}>{project.title}</Text>
              </View>
              <Text style={styles.projectDesc}>{project.description}</Text>
              <View style={styles.projectTechBadge}>
                <Text style={styles.projectTechText}>🛠 {project.tech}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ═══════════════════════════════════════════
            SECTION FORMULIR KONTAK
        ═══════════════════════════════════════════ */}
        <View style={[styles.subCard, styles.cardBorderGreen]} data-print="hide">
          <Text style={styles.sectionHeading}>✉️ Hubungi Saya</Text>
          <Text style={styles.subText}>Kirimkan pesan atau pertanyaan melalui formulir di bawah ini:</Text>

          {successMessage ? (
            <View style={styles.successBox}>
              <Text style={styles.successEmoji}>🎉</Text>
              <Text style={styles.successText}>{successMessage}</Text>
            </View>
          ) : null}

          <Text style={styles.label}>👤 Nama Lengkap</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan nama Anda..."
            placeholderTextColor="#94a3b8"
            value={contactForm.name}
            onChangeText={(text) => setContactForm({ ...contactForm, name: text })}
          />

          <Text style={styles.label}>📧 Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan email Anda..."
            placeholderTextColor="#94a3b8"
            keyboardType="email-address"
            value={contactForm.email}
            onChangeText={(text) => setContactForm({ ...contactForm, email: text })}
          />

          <Text style={styles.label}>💬 Pesan</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tulis pesan Anda..."
            placeholderTextColor="#94a3b8"
            multiline={true}
            numberOfLines={4}
            value={contactForm.message}
            onChangeText={(text) => setContactForm({ ...contactForm, message: text })}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSendMessage} activeOpacity={0.85}>
            <Text style={styles.submitButtonText}>Kirim Pesan Sekarang 🚀</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer} data-print="hide">
          <Text style={styles.footerText}>✨ {mahasiswa.nama} · Digital CV</Text>
          <Text style={styles.footerSub}>Dibuat dengan React Native & Expo</Text>
        </View>

      </ScrollView>
    </View>
  );
}

// Warna variasi untuk skill badges
const skillColors = [
  { bg: '#f3e8ff', border: '#d8b4fe', text: '#7e22ce' },
  { bg: '#ede9fe', border: '#c4b5fd', text: '#6d28d9' },
  { bg: '#e0e7ff', border: '#a5b4fc', text: '#4338ca' },
  { bg: '#dbeafe', border: '#93c5fd', text: '#1d4ed8' },
  { bg: '#d1fae5', border: '#6ee7b7', text: '#065f46' },
];

const styles = StyleSheet.create({
  /* ─── WRAPPER & LOADER ─── */
  mainWrapper: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  loaderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  loaderText: {
    marginTop: 14,
    fontSize: 15,
    color: '#4f46e5',
    fontWeight: 'bold',
  },
  loaderSub: {
    marginTop: 4,
    fontSize: 12,
    color: '#94a3b8',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: 'bold',
  },

  /* ─── APP BAR ─── */
  appBar: {
    height: 68,
    backgroundColor: '#3730a3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 8,
    shadowColor: '#1e1b4b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  appBarBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appBarIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  appBarIcon: {
    fontSize: 18,
  },
  appBarTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  appBarSub: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 10,
    letterSpacing: 0.3,
  },
  appBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 52,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  printHeaderBtn: {
    backgroundColor: '#0d9488',
    borderColor: '#0f766e',
  },
  headerButtonEmoji: {
    fontSize: 14,
  },
  headerButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 1,
  },

  /* ─── SCROLL CONTAINER ─── */
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
    paddingBottom: 24,
  },

  /* ─── KARTU PROFIL UTAMA ─── */
  mainCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 14,
  },
  cardBgTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: '#4f46e5',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  cardBgCircle1: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(99, 102, 241, 0.4)',
  },
  cardBgCircle2: {
    position: 'absolute',
    top: 60,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(167, 139, 250, 0.3)',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
    marginBottom: 14,
    borderWidth: 5,
    borderColor: '#ffffff',
    zIndex: 2,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e1b4b',
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  nim: {
    fontSize: 13,
    color: '#6366f1',
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  badge: {
    backgroundColor: '#ede9fe',
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#ddd6fe',
  },
  profesiText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5b21b6',
    textAlign: 'center',
  },

  /* Stats Row */
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  statLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#e2e8f0',
    alignSelf: 'center',
  },

  /* Action Buttons */
  actionButtonRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginBottom: 16,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 14,
    gap: 6,
    borderWidth: 1.5,
  },
  actionBtnLike: {
    backgroundColor: '#fdf2f8',
    borderColor: '#fbcfe8',
  },
  actionBtnLikedActive: {
    backgroundColor: '#ffe4e6',
    borderColor: '#f43f5e',
  },
  actionBtnScore: {
    backgroundColor: '#ede9fe',
    borderColor: '#ddd6fe',
  },
  actionBtnEmoji: {
    fontSize: 16,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#374151',
  },
  actionBtnTextLiked: {
    color: '#e11d48',
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#e2e8f0',
    marginBottom: 16,
  },
  sectionContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },

  /* ─── TOMBOL CETAK PDF (DASHBOARD) ─── */
  printPDFCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#0f172a',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  printPDFLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  printIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  printIconText: {
    fontSize: 24,
  },
  printPDFTextWrap: {
    flex: 1,
  },
  printPDFTitle: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  printPDFSub: {
    color: '#94a3b8',
    fontSize: 11,
  },
  printArrow: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  printArrowText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  /* ─── SUB CARDS ─── */
  subCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 5,
  },
  cardBorderPurple: { borderLeftColor: '#8b5cf6' },
  cardBorderPink: { borderLeftColor: '#ec4899' },
  cardBorderBlue: { borderLeftColor: '#3b82f6' },
  cardBorderOrange: { borderLeftColor: '#f97316' },
  cardBorderGreen: { borderLeftColor: '#10b981' },

  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionBadge: {
    backgroundColor: '#f3e8ff',
    borderWidth: 1,
    borderColor: '#d8b4fe',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  sectionBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#7e22ce',
  },

  /* ─── HEADINGS & TEXT ─── */
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e1b4b',
    marginBottom: 10,
  },
  deskripsi: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    textAlign: 'left',
  },
  subText: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 14,
    lineHeight: 20,
  },

  /* ─── SKILLS ─── */
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
  },
  skillText: {
    fontSize: 13,
    fontWeight: 'bold',
  },

  /* ─── HOBI ─── */
  hobbyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdf4ff',
    padding: 12,
    borderRadius: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f5d0fe',
  },
  hobbyIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#fae8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e879f9',
  },
  hobbyIcon: {
    fontSize: 22,
  },
  hobbyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6b21a8',
    marginBottom: 2,
  },
  hobbyDesc: {
    fontSize: 12,
    color: '#9333ea',
  },
  hobbyChevron: {
    marginLeft: 8,
  },
  hobbyChevronText: {
    fontSize: 20,
    color: '#c084fc',
    fontWeight: 'bold',
  },

  /* ─── PENDIDIKAN ─── */
  eduContainer: {
    flexDirection: 'row',
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    alignItems: 'flex-start',
  },
  eduDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3b82f6',
    marginTop: 4,
    marginRight: 12,
  },
  eduText: {
    fontSize: 13,
    color: '#1e40af',
    fontWeight: 'bold',
    lineHeight: 20,
    marginBottom: 4,
  },
  eduStatus: {
    fontSize: 11,
    color: '#16a34a',
    fontWeight: '600',
  },

  /* ─── PROYEK ─── */
  projectCard: {
    backgroundColor: '#fff7ed',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  projectIndex: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ea580c',
    backgroundColor: '#ffedd5',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9a3412',
    flex: 1,
  },
  projectDesc: {
    fontSize: 13,
    color: '#7c2d12',
    marginBottom: 10,
    lineHeight: 18,
  },
  projectTechBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffedd5',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fdba74',
  },
  projectTechText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#c2410c',
  },

  /* ─── FORMULIR KONTAK ─── */
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 12,
  },
  textArea: {
    height: 96,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#10b981',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  successBox: {
    backgroundColor: '#d1fae5',
    borderColor: '#10b981',
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    alignItems: 'center',
  },
  successEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  successText: {
    color: '#065f46',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  /* ─── FOOTER ─── */
  footer: {
    marginTop: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  footerSub: {
    fontSize: 11,
    color: '#cbd5e1',
    marginTop: 2,
  },
});
