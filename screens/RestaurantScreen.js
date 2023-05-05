import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { urlFor } from '../sanity'
import { ArrowLeftIcon, MapPinIcon, StarIcon, QuestionMarkCircleIcon, ChevronRightIcon } from 'react-native-heroicons/solid'
import DishRow from '../components/DishRow'
import BasketIcon from '../components/BasketIcon'
import { useDispatch } from 'react-redux'
import { setRestaurant } from '../features/restaurantSlice'

const RestaurantScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      shortDescription,
      dishes,
      long,
      lat
    }
  } = useRoute()

  useEffect(() => {
    dispatch(setRestaurant({
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      shortDescription,
      dishes,
      long,
      lat
    }))
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className='relative'>
          <Image
            source={{
              uri: urlFor(imgUrl).url()
            }}
            className='w-full h-56 bg-gray-300 p-4'
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'
          >
            <ArrowLeftIcon size={20} color='#00CCBB' />
          </TouchableOpacity>
        </View>
        <View className='bg-white'>
          <View className='px-4 pt-4'>
            <Text className='text-3xl font-bold'>{title}</Text>
            <View className='flex-row space-x-2 my-1 justify-between'>
              <View className='flex-row items-center space-x-1'>
                <StarIcon size={22} color={rating > 3 ? 'green' : 'red'} opacity={0.5} />
                <Text className={rating > 3 ? 'text-green-500' : 'text-red-500'}>{rating}</Text>
                <Text className='text-xs text-gray-500'>· {genre}</Text>
              </View>
              <View className='flex-row space-x-2 my-1 items-center'>
                <MapPinIcon size={22} color='gray' opacity={0.4} />
                <Text className='text-xs text-gray-500'>Nearby · {address}</Text>
              </View>
            </View>

            <Text
              className='text-gray-500 mt-2 pb-4'
            >
              {shortDescription}
            </Text>
          </View>

          <TouchableOpacity className='flex-row items-center space-x-2 p-4 boder-y border-gray-300'>
            <QuestionMarkCircleIcon color='gray' opacity={0.6} size={20} />
            <Text className='pl-2 flex-1 text-md font-bold'>
              Have a food allergy?
            </Text>
            <ChevronRightIcon color='#00CCBB' />
          </TouchableOpacity>
        </View>
        <View className='pb-36'>
          <Text className='px-4 pt-6 mb-3 font-bold text-xl'>Menu</Text>
          {/* DishRows */}

          {dishes.map((dish, index) => (

            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              imgUrl={dish.image}
            />
          ))}

        </View>

      </ScrollView>
    </>
  )
}

export default RestaurantScreen
