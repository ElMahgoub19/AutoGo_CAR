// AutoGo - Booking Screen (Design Image 26)
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { selectDate, selectTime } from '../store/slices/servicesSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';

const days = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
const dates = [
  [28,29,30,1,2,3,4],
  [5,6,7,8,9,10,11],
  [12,13,14,15,16,17,18],
  [19,20,null,null,null,null,null],
];

const timeSlots = [
  '09:00 ص', '09:30 ص', '10:00 ص',
  '10:30 ص', '11:00 ص', '11:30 ص',
  '01:00 م', '01:30 م', '02:00 م',
];

const BookingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState(12);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00 ص');

  const handleContinue = () => {
    dispatch(selectDate(`${selectedDay} مايو 2024`));
    dispatch(selectTime(selectedTimeSlot));
    navigation.navigate('ServiceMethod');
  };

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="جدولة الموعد" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Month header */}
        <View style={styles.monthHeader}>
          <View style={styles.monthNav}>
            <TouchableOpacity style={styles.navBtn}><Ionicons name="chevron-back" size={18} color={colors.text.secondary} /></TouchableOpacity>
            <TouchableOpacity style={styles.navBtn}><Ionicons name="chevron-forward" size={18} color={colors.text.secondary} /></TouchableOpacity>
          </View>
          <View>
            <Text style={styles.monthTitle}>مايو 2024</Text>
            <Text style={styles.monthSub}>اختر تاريخ الزيارة</Text>
          </View>
        </View>

        {/* Calendar */}
        <Card style={styles.calendar}>
          <View style={styles.daysRow}>
            {days.map((d, i) => <Text key={i} style={styles.dayLabel}>{d}</Text>)}
          </View>
          {dates.map((week, wi) => (
            <View key={wi} style={styles.weekRow}>
              {week.map((date, di) => (
                <TouchableOpacity
                  key={di}
                  style={[styles.dateCell, selectedDay === date && styles.selectedDate]}
                  onPress={() => date && date > 0 && setSelectedDay(date)}
                  disabled={!date || date < 1}
                >
                  <Text style={[
                    styles.dateText,
                    !date && { opacity: 0 },
                    date && date < 1 && styles.fadedDate,
                    selectedDay === date && styles.selectedDateText,
                  ]}>{date || ''}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </Card>

        {/* Time slots */}
        <View style={styles.timeHeader}>
          <Text style={styles.timeTitle}>حدد وقت الحجز</Text>
          <Ionicons name="time-outline" size={22} color={colors.accent.primary} />
        </View>

        <View style={styles.timeGrid}>
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot}
              style={[styles.timeChip, selectedTimeSlot === slot && styles.selectedTimeChip]}
              onPress={() => setSelectedTimeSlot(slot)}
            >
              <Text style={[styles.timeText, selectedTimeSlot === slot && styles.selectedTimeText]}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Button title="متابعة المراجعة" onPress={handleContinue} icon="arrow-back" iconPosition="left" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.base, paddingBottom: 120 },
  monthHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  monthNav: { flexDirection: 'row', gap: spacing.sm },
  navBtn: {
    width: 36, height: 36, borderRadius: borderRadius.sm,
    backgroundColor: colors.background.glass, borderWidth: 1, borderColor: colors.background.glassBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  monthTitle: { ...typography.h3, color: colors.accent.primary, textAlign: 'right' },
  monthSub: { ...typography.bodySmall, color: colors.text.secondary, textAlign: 'right' },
  calendar: { marginBottom: spacing.xl },
  daysRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: spacing.md },
  dayLabel: { ...typography.caption, color: colors.text.muted, width: 36, textAlign: 'center' },
  weekRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: spacing.sm },
  dateCell: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  dateText: { ...typography.body, color: colors.text.primary },
  fadedDate: { color: colors.text.muted },
  selectedDate: { backgroundColor: colors.accent.primary },
  selectedDateText: { color: colors.button.primaryText, fontWeight: '700' },
  timeHeader: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.lg },
  timeTitle: { ...typography.h4, color: colors.text.primary },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  timeChip: {
    width: '31%', paddingVertical: 14, borderRadius: borderRadius.md, marginBottom: spacing.md,
    backgroundColor: colors.background.card, borderWidth: 1, borderColor: colors.background.cardBorder,
    alignItems: 'center',
  },
  selectedTimeChip: { backgroundColor: colors.accent.primary, borderColor: colors.accent.primary },
  timeText: { ...typography.label, color: colors.text.secondary },
  selectedTimeText: { color: colors.button.primaryText },
  bottomContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.base, paddingBottom: 40, backgroundColor: colors.background.primary },
});

export default BookingScreen;
