// AutoGo - Onboarding Screen (Design Images 04, 05, 06(2))
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, StatusBar, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { setOnboarded } from '../store/slices/authSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Button from '../components/Button';
import { onboardingData } from '../data/mockData';
import type { RootState } from '../types';
import { useAppDispatch } from '../hooks';

const { width, height } = Dimensions.get('window');

const OnboardingSlide = ({ item }) => {
  const icons = [
    ['calendar', 'build', 'card', 'construct'],
    ['navigate', 'location', 'car', 'pin'],
    ['car-sport', 'battery-charging', 'speedometer', 'disc'],
  ];
  const slideIndex = onboardingData.findIndex(d => d.id === item.id);

  return (
    <View style={[styles.slide, { width, height }]}>
      <Image 
        source={item.image} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <LinearGradient 
        colors={['transparent', 'rgba(10, 37, 37, 0.8)', colors.background.primary]} 
        style={styles.gradientOverlay}
      />
      
      {/* Text content absolute position near bottom */}
      <View style={styles.contentContainer}>
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
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

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
    <View style={styles.container}>
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

      {/* Indicators and buttons wrapper */}
      <View style={styles.bottomWrapper}>
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

        <View style={styles.bottomContainer}>
          <Button
            title={isLast ? 'ابدأ الآن' : 'التالي'}
            onPress={handleNext}
            icon={isLast ? 'arrow-back' : 'arrow-forward'}
            iconPosition="left"
            style={isLast ? { width: '100%' } : { width: '55%', alignSelf: 'flex-start' }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background.primary 
  },
  skipButton: {
    position: 'absolute',
    top: 55,
    left: spacing.lg,
    zIndex: 10,
    padding: spacing.sm,
  },
  skipText: {
    ...typography.label,
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
  },
  slide: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    top: '40%', // Start fading out the image around 40% from top
  },
  contentContainer: {
    position: 'absolute',
    bottom: 150, // Keep space for the indicators and button
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
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
  bottomWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 40,
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default OnboardingScreen;
