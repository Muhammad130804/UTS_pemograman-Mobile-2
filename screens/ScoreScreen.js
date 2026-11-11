import React from 'react';
import {
  StyleSheet, Text, View, ScrollView,
  TouchableOpacity, StatusBar
} from 'react-native';
import profileData from '../data/profileData';

export default function ScoreScreen({ navigation }) {
  const academic = profileData.academic;

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#3730a3" />

      {/* HEADER */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>← Kembali</Text>
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>📊 Score Dashboard</Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Info Akademik */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📋 Informasi Akademik</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nama</Text>
            <Text style={styles.infoValue}>{academic.nama}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>NIM</Text>
            <Text style={styles.infoValue}>{academic.nim}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Mata Kuliah</Text>
            <Text style={styles.infoValue}>{academic.mataKuliah}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Dosen</Text>
            <Text style={styles.infoValue}>{academic.dosen}</Text>
          </View>
        </View>

        {/* Score Highlight */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Nilai Akhir</Text>
            <Text style={styles.scoreValue}>{academic.currentScore.nilai}</Text>
          </View>
          <View style={styles.scoreDivider} />
          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Grade</Text>
            <Text style={[styles.scoreValue, { color: '#16a34a' }]}>{academic.currentScore.grade}</Text>
          </View>
          <View style={styles.scoreDivider} />
          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>LP</Text>
            <Text style={[styles.scoreValue, { fontSize: 18, color: '#7c3aed' }]}>{academic.learningPoints}</Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📈 Learning Progress</Text>
          <View style={styles.progressGrid}>
            <View style={[styles.progressItem, { backgroundColor: '#eff6ff' }]}>
              <Text style={styles.progressEmoji}>📅</Text>
              <Text style={styles.progressLabel}>Attendance</Text>
              <Text style={[styles.progressValue, { color: '#1d4ed8' }]}>{academic.progress.attendance}</Text>
            </View>
            <View style={[styles.progressItem, { backgroundColor: '#f0fdf4' }]}>
              <Text style={styles.progressEmoji}>💻</Text>
              <Text style={styles.progressLabel}>Practice</Text>
              <Text style={[styles.progressValue, { color: '#16a34a' }]}>{academic.progress.practice}</Text>
            </View>
            <View style={[styles.progressItem, { backgroundColor: '#fdf4ff' }]}>
              <Text style={styles.progressEmoji}>🎯</Text>
              <Text style={styles.progressLabel}>Quest</Text>
              <Text style={[styles.progressValue, { color: '#9333ea' }]}>{academic.progress.quest}</Text>
            </View>
            <View style={[styles.progressItem, { backgroundColor: '#fff7ed' }]}>
              <Text style={styles.progressEmoji}>🏆</Text>
              <Text style={styles.progressLabel}>Challenge</Text>
              <Text style={[styles.progressValue, { color: '#ea580c' }]}>{academic.progress.challenge}</Text>
            </View>
          </View>
        </View>

        {/* Tombol kembali */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Kembali ke CV</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#f1f5f9' },
  appBar: {
    height: 68,
    backgroundColor: '#3730a3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 8,
  },
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    width: 80,
  },
  backBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  appBarTitle: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  container: { padding: 16, alignItems: 'center', paddingBottom: 32 },
  card: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
    elevation: 4,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e1b4b',
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  infoLabel: { fontSize: 13, color: '#64748b', fontWeight: '600' },
  infoValue: { fontSize: 13, color: '#1e293b', fontWeight: 'bold', maxWidth: '60%', textAlign: 'right' },
  scoreCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#4f46e5',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 14,
    elevation: 6,
  },
  scoreItem: { alignItems: 'center' },
  scoreLabel: { fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: '600', marginBottom: 4 },
  scoreValue: { fontSize: 28, fontWeight: 'bold', color: '#ffffff' },
  scoreDivider: { width: 1, height: 50, backgroundColor: 'rgba(255,255,255,0.3)' },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  progressItem: {
    width: '47%',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  progressEmoji: { fontSize: 24, marginBottom: 6 },
  progressLabel: { fontSize: 11, color: '#64748b', fontWeight: '600', marginBottom: 4 },
  progressValue: { fontSize: 20, fontWeight: 'bold' },
  backButton: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#3730a3',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
    elevation: 4,
  },
  backButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});

