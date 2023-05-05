import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { StarIcon } from 'react-native-heroicons/solid'
import { MapPinIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'

export const RestaurantCard = ({
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
}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Restaurant', {
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
        })
      }}
      className='bg-white mr-3 shadow'
    >
      <Image
        source={{
          uri: urlFor(imgUrl).url()
        }}
        className='h-36 w-64 rounded-sm'
      />
      <View className='px-3 pb-4'>
        <Text className='font-bold text-lg pt-2'>{title}</Text>
        <View className='flex-row items-center space-x-1'>
          <StarIcon color={rating > 3 ? 'green' : 'red'} opacity={0.5} size={22} />
          <View className='flex-row items-center'>
            <Text className={rating > 3 ? 'text-green-500' : 'text-red-500'}>{rating}</Text>
            <Text className='text-xs text-gray-500 ml-1'>· {genre}</Text>
          </View>
        </View>

        <View className='flex-row items-center space-x-1'>
          <MapPinIcon size={22} color='gray' opacity={0.4} />
          <Text className='text-xs text-gray-500'>Nearby · {address}</Text>
        </View>
        <View />
      </View>

    </TouchableOpacity>
  )
}
