import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { selectShowConfirmationModal, selectTemporaryRestaurant, setShowConfirmationModal } from '../features/restaurantSlice'
import { SCREENS } from '../screens'
import { useNavigation } from '@react-navigation/native'
import { View as CustomView } from 'react-native-animatable'

const ConfirmationModal = ({ title, description }) => {
  const temporaryRestaurant = useSelector(selectTemporaryRestaurant)
  const visible = useSelector(selectShowConfirmationModal)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleBackdropPress = () => {
    dispatch(setShowConfirmationModal(false))
  }

  const onContinue = () => {
    dispatch(setShowConfirmationModal(false))
    navigation.navigate(SCREENS.RESTAURANT, temporaryRestaurant)
  }

  if (!visible) return null
  return (
    <CustomView
      className='absolute w-screen z-99 h-screen bg-gray-900/50 bottom-0'
      onTouchStart={handleBackdropPress}
      animation='fadeIn'
      duration={250}
    >
      <CustomView
        className='absolute w-screen h-2/5 bg-white rounded-xl p-4 items-center bottom-0 opacity-100'
        onTouchStart={(e) => e.stopPropagation()}
        animation='fadeInUp'
        duration={250}
      >

        <Image
          source={{ uri: 'https://links.papareact.com/wru' }}
          className='h-9 w-9 bg-gray-300 rounded-full'
        />
        <Text className='text-lg font-bold text-center mx-2 mt-4'>{title}</Text>

        <Text className='my-3'>{description}</Text>
        <TouchableOpacity
          className='p-5 rounded-lg items-center space-x-1 bg-[#00d4be] m-2 w-5/6'
          onPress={onContinue}
        >
          <Text className=' text-white'>Go to {temporaryRestaurant.title}!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='p-4 rounded-lg items-center space-x-1 border border-[#00d4be] m-2 w-5/6'
          onPress={handleBackdropPress}
        >
          <Text className='text-[#00d4be]'>Keep my current selection</Text>
        </TouchableOpacity>
      </CustomView>
    </CustomView>
  )
}

export default ConfirmationModal
