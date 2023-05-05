import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect } from 'react'
import { Image, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon
} from 'react-native-heroicons/outline'
import { Categories } from '../components/Categories'
import { FeaturedRow } from '../components/FeaturedRow'
import sanityClient from '../sanity'

function HomeScreen () {
  const navigation = useNavigation()
  const [featuredCategories, setFeaturedCategories] = React.useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->{
          ...
        }
      }      
    }`).then((data) => {
      setFeaturedCategories(data)
    })
  }, [])

  return (
    <SafeAreaView className='pt-5 bg-white '>
      {/* Header */}
      <View className='flex-row pb-3 items-center mx-4 space-x-2'>
        <Image
          source={{ uri: 'https://links.papareact.com/wru' }}
          className='h-7 w-7 bg-gray-300 rounded-full'
        />

        <View className='flex-grow'>
          <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
          <Text className='font-bold text-xl'>
            Current Location
            <ChevronDownIcon size={20} color='#00CCBB' />
          </Text>
        </View>
        <UserIcon size={35} color='#00CCBB' />
      </View>

      {/* Search */}
      <View className='flex-row items-center space-x-2 pb-2 mx-4'>
        <View className='flex-row flex-grow space-x-2 bg-gray-200 p-3'>
          <MagnifyingGlassIcon size={20} color='gray' />
          <TextInput
            placeholder='Restaurants and cuisines'
            keyboardType='default'
          />
        </View>
        <AdjustmentsVerticalIcon size={20} color='#00CCBB' />
      </View>

      {/* Body */}
      <ScrollView
        className='bg-gray-100'
        contentContainerStyle='flex-grow'
      >
        <View className='pb-28'>
          {/* Categories */}
          <Categories />

          {/* Featured */}
          {featuredCategories?.map((category) => (

            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
