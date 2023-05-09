import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'
import { urlFor } from '../sanity'

export const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className='relative mr-2'>
      <Image
        source={{
          uri: urlFor(imgUrl).url()
        }}
        className='h-20 w-20 rounded'
      />
      <Text className='absolute bottom-1 left-1 text-white font-bold'>{title}</Text>
    </TouchableOpacity>
  )
}
