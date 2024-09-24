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
  },
  {
    id: 2,
    headingText: 'Stay Hydrated',
    mainText: 'Drinking plenty of water helps prevent dehydration, which can trigger sickle cell crises.',
    containerColor: '#009444',
  },
  {
    id: 3,
    headingText: 'Avoid Extreme Temperatures',
    mainText: 'Extreme heat or cold can lead to sickle cell pain crises. Try to maintain a comfortable environment.',
  },
];

const { width: windowWidth } = Dimensions.get('window');
const cardWidth = windowWidth - 42;

function HeaderCardCarousel() {
  const { container, cardContainer, indicatorContainer, dot } = styles;
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }) => (
    <View style={[cardContainer, { width: cardWidth }]}>
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
          snapToInterval={cardWidth}
          decelerationRate="fast"
          snapToAlignment="start"

        />
        <View style={indicatorContainer}>
          {headerCardData.map((_, i) => {
            const inputRange = [(i - 1) * cardWidth, i * cardWidth, (i + 1) * cardWidth];
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
                style={[dot, { width: dotWidth, opacity }]}
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
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
