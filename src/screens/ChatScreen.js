// AutoGo - Chat Screen (Design Image 31)
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import { mockChatMessages, quickReplies, mockDriver } from '../data/mockData';

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState(mockChatMessages);
  const [text, setText] = useState('');

  const sendMessage = (msg) => {
    const newMsg = { id: `m${Date.now()}`, sender: 'user', text: msg || text, time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newMsg]);
    setText('');
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.driverMessage]}>
        <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.driverBubble]}>
          <Text style={[styles.messageText, isUser && { color: colors.button.primaryText }]}>{item.text}</Text>
        </View>
        <Text style={[styles.messageTime, isUser && styles.userTime]}>{item.time}</Text>
      </View>
    );
  };

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.callBtn} onPress={() => navigation.navigate('Call')}>
          <Ionicons name="call-outline" size={20} color={colors.accent.primary} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{mockDriver.name}</Text>
          <Text style={styles.headerSub}>سائق الونش • متصل الآن</Text>
        </View>
        <View style={styles.headerAvatar}>
          <Ionicons name="person" size={24} color={colors.text.secondary} />
          <View style={styles.onlineDot} />
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-forward" size={22} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Date badge */}
      <View style={styles.dateBadge}>
        <Text style={styles.dateText}>اليوم</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
        />

        {/* Quick replies */}
        <View style={styles.quickReplies}>
          {quickReplies.map((qr, i) => (
            <TouchableOpacity key={i} style={styles.quickReplyChip} onPress={() => sendMessage(qr)}>
              <Text style={styles.quickReplyText}>{qr}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.sendBtn} onPress={() => text && sendMessage()}>
            <Ionicons name="send" size={20} color={colors.accent.primary} />
          </TouchableOpacity>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="اكتب رسالتك هنا..."
            placeholderTextColor={colors.text.muted}
            style={styles.input}
          />
          <TouchableOpacity style={styles.attachBtn}>
            <Ionicons name="add" size={24} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.base,
    paddingTop: 50, paddingBottom: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.divider,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.background.glass, alignItems: 'center', justifyContent: 'center' },
  headerAvatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 2, borderColor: colors.accent.primary + '40', alignItems: 'center', justifyContent: 'center',
    marginHorizontal: spacing.sm, position: 'relative',
  },
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: colors.status.success, borderWidth: 2, borderColor: colors.background.primary },
  headerInfo: { flex: 1, alignItems: 'flex-end' },
  headerName: { ...typography.label, color: colors.text.primary },
  headerSub: { ...typography.caption, color: colors.accent.primary, marginTop: 2 },
  callBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(45,212,191,0.1)', alignItems: 'center', justifyContent: 'center' },
  dateBadge: { alignSelf: 'center', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: borderRadius.full, paddingHorizontal: 16, paddingVertical: 6, marginVertical: spacing.md },
  dateText: { ...typography.caption, color: colors.text.tertiary },
  messagesList: { paddingHorizontal: spacing.base, paddingBottom: spacing.md },
  messageContainer: { marginBottom: spacing.md, maxWidth: '80%' },
  userMessage: { alignSelf: 'flex-start' },
  driverMessage: { alignSelf: 'flex-end' },
  messageBubble: { borderRadius: borderRadius.lg, padding: spacing.md },
  userBubble: { backgroundColor: colors.accent.primary, borderBottomLeftRadius: 4 },
  driverBubble: { backgroundColor: colors.background.card, borderWidth: 1, borderColor: colors.background.cardBorder, borderBottomRightRadius: 4 },
  messageText: { ...typography.body, color: colors.text.primary, textAlign: 'right', lineHeight: 24 },
  messageTime: { ...typography.caption, color: colors.text.muted, textAlign: 'right', marginTop: 4 },
  userTime: { textAlign: 'left' },
  quickReplies: { flexDirection: 'row', paddingHorizontal: spacing.base, gap: spacing.sm, marginBottom: spacing.sm },
  quickReplyChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: borderRadius.full, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  quickReplyText: { ...typography.caption, color: colors.text.secondary },
  inputContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.base, paddingBottom: 30, paddingTop: spacing.sm, gap: spacing.sm },
  attachBtn: { width: 44, height: 44, borderRadius: borderRadius.md, backgroundColor: colors.background.glass, borderWidth: 1, borderColor: colors.background.glassBorder, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, height: 44, borderRadius: borderRadius.full, backgroundColor: colors.input.background, borderWidth: 1, borderColor: colors.input.border, paddingHorizontal: spacing.base, ...typography.body, color: colors.text.primary, textAlign: 'right' },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(45,212,191,0.15)', alignItems: 'center', justifyContent: 'center' },
});

export default ChatScreen;
