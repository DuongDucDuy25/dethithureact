import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import React from 'react';
import SanPhamStore from './src/redux/store/SanPhamStore';
import SanPhamScreen from './src/screen/SanPhamScreen';
import ThemSP from './ThemSP'; // Đảm bảo đường dẫn đúng
import SuaSP from './SuaSP';   // Đảm bảo đường dẫn đúng

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={SanPhamStore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SanPhamScreen"
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
          <Stack.Screen name="SanPhamScreen" component={SanPhamScreen} options={{ headerShown : false }} />
          <Stack.Screen name="ThemSP" component={ThemSP} options={{ title: 'Thêm Sản Phẩm' }} />
          <Stack.Screen name="SuaSP" component={SuaSP} options={{ title: 'Sửa Sản Phẩm' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

