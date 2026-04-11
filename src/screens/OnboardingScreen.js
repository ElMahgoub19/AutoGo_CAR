// AutoGo - Onboarding Screen (Design Images 04, 05, 06(2))
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setOnboarded } from '../store/slices/authSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Button from '../components/Button';
import { onboardingData } from '../data/mockData';

const { width, height } = Dimensions.get('window');

const OnboardingSlide = ({ item }) => {
  const icons = [
    ['calendar', 'build', 'card', 'construct'],
    ['navigate', 'location', 'car', 'pin'],
    ['car-sport', 'battery-charging', 'speedometer', 'disc'],
  ];
  const slideIndex = onboardingData.findIndex(d => d.id === item.id);

  return (
    <View style={[styles.slide, { width }]}>
      {/* Illustration placeholder */}
      <View style={styles.illustrationContainer}>
        <View style={styles.mainIllustration}>
          <View style={styles.gearBg}>
            {icons[slideIndex]?.map((iconName, i) => (
              <View key={i} style={[styles.floatingIcon, {
                top: [10, 10, 70, 70][i] + '%',
                left: [10, 70, 5, 75][i] + '%',
              }]}>
                <View style={styles.iconBubble}>
                  <Ionicons name={iconName} size={22} color={colors.accent.primary} />
                </View>
              </View>
            ))}
            <Ionicons name="car-sport" size={80} color={colors.accent.primary} />
          </View>
        </View>
      </View>

      {/* Text content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {item.title.split('\n').map((line, idx) => (
            <Text key={idx}>
              {line === item.highlightedText ? (
                <Text style={styles.highlightedText}>{line}</Text>
              ) : (
                <Text>{line}</Text>
              )}
              {idx < item.title.split('\n').length - 1 && '\n'}
            </Text>
          ))}
        </Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      dispatch(setOnboarded());
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    dispatch(setOnboarded());
    navigation.replace('Login');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const isLast = currentIndex === onboardingData.length - 1;

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Skip button */}
      <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
        <Text style={styles.skipText}>تخطي</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={({ item }) => <OnboardingSlide item={item} />}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      {/* Page indicators */}
      <View style={styles.indicators}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Bottom button */}
      <View style={styles.bottomContainer}>
        <Button
          title={isLast ? 'ابدأ الآن' : 'التالي'}
          onPress={handleNext}
          icon={isLast ? 'arrow-back' : 'arrow-forward'}
          iconPosition="left"
          style={isLast ? { width: '100%' } : { width: '55%', alignSelf: 'flex-start' }}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  skipButton: {
    position: 'absolute',
    top: 55,
    left: spacing.lg,
    zIndex: 10,
    padding: spacing.sm,
  },
  skipText: {
    ...typography.label,
    color: colors.text.secondary,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  illustrationContainer: {
    flex: 0.55,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  mainIllustration: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearBg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(45, 212, 191, 0.08)',
    borderWidth: 2,
    borderColor: 'rgba(45, 212, 191, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingIcon: {
    position: 'absolute',
  },
  iconBubble: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(45, 212, 191, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(45, 212, 191, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 0.3,
    alignItems: 'center',
    paddingHorizontal: spacing.base,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.base,
    lineHeight: 44,
  },
  highlightedText: {
    color: colors.accent.primary,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 28,
    backgroundColor: colors.accent.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  bottomContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default OnboardingScreen;
