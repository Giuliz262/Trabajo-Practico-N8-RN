import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'

export default function HomeScreen() {
  const titleOpacity = useSharedValue(0)
  const bgColor = useSharedValue(0)
  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(titleOpacity.value === 1 ? 0 : -200, { duration: 1000 }) }],
      opacity: withTiming(titleOpacity.value, { duration: 800 }),
    }
  })
  const backgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      bgColor.value,
      [0, 1],
      ['#fdcae1', '#84b6f4']
    )
    return {
      backgroundColor: withTiming(backgroundColor, { duration: 800 }),
    }
  })
  const starPress = () => {
    bgColor.value = bgColor.value === 0 ? 1 : 0 
    titleOpacity.value = 0 
  }
  const refleshPress = () => {
    bgColor.value = 0
    titleOpacity.value = 1
  }

  React.useEffect(() => {
    titleOpacity.value = 1
  }, [])

  //Botones
  return (
    <Animated.View style={[styles.container, backgroundStyle]}>
      <Animated.Text style={[styles.title, titleStyle]}>
        Bienvenido
      </Animated.Text>
      <TouchableOpacity style={styles.startButton} onPress={starPress}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.refreshButton} onPress={refleshPress}>
        <Ionicons name="reload" size={24} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#581845',
    marginBottom: 20,
  },
  startButton: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: "#581845",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  refreshButton: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#581845',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
