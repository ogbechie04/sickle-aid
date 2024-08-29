import React, { useRef } from 'react';
import {
  Dimensions,
  SafeAreaView,
  Animated,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import HeaderCard from './HeaderCard';

/**
 *
 * TODO
 * Putting individual bgWidth and bgColor for each card
 */

const headerCardData = [
  {
    id: 1,
    headingText: 'Booster',
    mainText: 'Taking 2.5gms of protein everyday could maintain steeze',
    containerColor: '#FFED4A',
  },
  {
    id: 2,
    headingText: 'Tip Header',
    mainText: '4 transition stages for PSC & tips for each stage.',
    containerColor: '#009444',
    textColor: '#FFFADE',
  },
  {
    id: 3,
    headingText: 'Tip Header',
    mainText: '4 transition stages for PSC & tips for each stage.',
    containerColor: '#FFFFFF',
  },
];

const { width } = Dimensions.get('window');

function HeaderCardCarousel() {
  const { container } = styles;
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }) => (
    <View style={{ width }}>
      <HeaderCard
        headingText={item.headingText}
        mainText={item.mainText}
        containerColor={item.containerColor}
        textColor={item.textColor}
      />
    </View>
  );

  return (
    <SafeAreaView>
      <View style={container}>
        <FlatList
          data={headerCardData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          snapToInterval={width}
          decelerationRate="fast"
          snapToAlignment="start"
        />
        <View style={styles.indicatorContainer}>
          {headerCardData.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 16, 8],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i.toString()}
                style={[styles.dot, { width: dotWidth, opacity }]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -20,
    alignSelf: 'center',
  },
  dot: {
    height: 5,
    borderRadius: 4,
    backgroundColor: '#595959',
    marginHorizontal: 4,
  },
});

export default HeaderCardCarousel;
