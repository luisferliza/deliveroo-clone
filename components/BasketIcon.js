import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { selectBasketTotal } from '../features/basketSlice'

const BasketIcon = () => {
  const items = useSelector((state) => state.basket.items)
  const navigation = useNavigation()
  const basketTotal = useSelector(selectBasketTotal)

  if (items.length === 0) return null

  return (
    <View className='absolute bottom-10 w-full z-50'>
      <TouchableOpacity
        className='mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1'
        onPress={() => navigation.navigate('Basket')}
      >
        <Text className='text-white font-extrabold text-lg bg-[#01A296] py-1 px-2'>{items.length}</Text>
        <Text className='flex-1 text-white font-extrabold text-lg text-center'>View Basket</Text>
        <Text
          className='text-lg text-white font-extrabold'
        >
          ${basketTotal.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon
