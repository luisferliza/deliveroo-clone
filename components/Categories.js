import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'

import sanityClient from '../sanity'
import { CategoryCard } from './CategoryCard'

export function Categories () {
  const [categories, setCategories] = React.useState([])

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "category"] `).then((data) => {
      setCategories(data)
    })
  }, [])
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={
        {
          paddingHorizontal: 15,
          paddingTop: 10
        }
      }
    >
      {/* CategoryCard */}
      {categories?.map(category => (
        <CategoryCard
          key={category._id}
          id={category._id}
          imgUrl={category.image}
          title={category.name}
        />
      ))}

    </ScrollView>
  )
}
