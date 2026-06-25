import { View } from 'react-native';
import { Image } from 'expo-image';

export default function LoginScreen() {
  return (
    <View className="flex-1">
      <Image
        source={require('@/assets/images/banner.png')}
        style={{ width: '100%', height: '100%' }}
        contentFit="cover"
      />
    </View>
  );
}
