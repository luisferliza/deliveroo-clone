import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import 'react-native-url-polyfill/auto'
import RestaurantScreen from './screens/RestaurantScreen'
import { Provider } from 'react-redux'
import { store } from './store'
import BasketScreen from './components/BasketScreen'
import PreparingOrderScreen from './components/PreparingOrderScreen'
import DeliveryScreen from './components/DeliveryScreen'
const Stack = createNativeStackNavigator()

export default function App () {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Restaurant' component={RestaurantScreen} />
            <Stack.Screen
              name='Basket' component={BasketScreen}
              options={
                {
                  presentation: 'modal',
                  headerShown: false

                }
              }
            />
            <Stack.Screen
              name='PreparingOrder' component={PreparingOrderScreen}
              options={{
                headerShown: false,
                presentation: 'fullScreenModal'

              }}
            />
            <Stack.Screen
              name='Delivery' component={DeliveryScreen}
              options={{
                headerShown: false,
                presentation: 'fullScreenModal'

              }}
            />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
