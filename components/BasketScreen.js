import React, { useMemo, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { selectRestaurant } from '../features/restaurantSlice'
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { urlFor } from '../sanity'
import { SCREENS } from '../screens'

const BasketScreen = () => {
  const DELIVERY_FEE = 5.99
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectBasketItems)
  const basketTotal = useSelector(selectBasketTotal)
  const [groupedItemsBasket, setGroupedItemsBasket] = useState([])
  const dispatch = useDispatch()

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item)
      return results
    }, {})

    setGroupedItemsBasket(groupedItems)
  }, [items])

  const handlePress = () => {
    navigation.goBack()
  }

  const addItemToBasket = (item) => {
    dispatch(addToBasket({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      imgUrl: item.imgUrl
    })
    )
  }

  const removeItemFromBasket = (item) => {
    dispatch(removeFromBasket({
      id: item.id
    }))
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 border-b border-[#00CCBB] bg-white shadow-xs'>
          <View>
            <Text className='text-lg font-bold text-center'>Basket</Text>
            <Text className='text-center text-gray-400'>{restaurant.title}</Text>
          </View>
          <TouchableOpacity
            onPress={handlePress}
            className='rounded-full bg-gray-100 absolute top-3 right-5'
          >
            <XCircleIcon color='#00CCBB' height={50} width={50} />
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-3'>
          <Image
            source={{
              uri: 'https://links.papareact.com/wru'
            }}
            className='h-7 w-7 bg-gray-300 p-4 rounded-full'
          />
          <Text className='flex-1'>
            Deliver in 30-40 min
          </Text>
          <TouchableOpacity>
            <Text className='text-[#00CCBB]'>Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {Object.entries(groupedItemsBasket).map(([key, value], index) => (
            <View key={index} className='flex-row items-center space-x-2 px-4 py-2 bg-white my-1'>
              <Image
                source={{ uri: urlFor(value[0]?.imgUrl).url() }}
                className='h-20 w-20 rounded-lg'
              />
              <View className='flex-1'>
                <Text className='font-bold'>{value[0].title}</Text>
                <Text className='text-gray-400'>{value[0].description}</Text>
                <Text className='text-gray-400'>{value[0].price}</Text>
              </View>
              <View className='flex-row items-center space-x-2'>
                <TouchableOpacity
                  onPress={() => removeItemFromBasket(value[0])}
                  className='bg-[#00CCBB] px-2 py-1 rounded-lg'
                >
                  <Text className='text-white'>-</Text>
                </TouchableOpacity>
                <Text>{value.length}</Text>
                <TouchableOpacity
                  onPress={() => addItemToBasket(value[0])}
                  className='bg-[#00CCBB] px-2 py-1 rounded-lg'
                >
                  <Text className='text-white'>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <View className='p-5 bg-white mt-3 space-y-4'>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Subtotal</Text>
            <Text className='text-gray-400'>
              ${basketTotal.toFixed(2)}
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Delivery Fee</Text>
            <Text className='text-gray-400'>
              ${DELIVERY_FEE}
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text>Order Total</Text>
            <Text className='font-extrabold'>
              ${(basketTotal + DELIVERY_FEE).toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            className='rounded-lg bg-[#00CCBB] p-4'
            onPress={() => navigation.navigate(SCREENS.PREPARING_ORDER)}
          >
            <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default BasketScreen
