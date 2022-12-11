import { View, Text, TouchableOpacity } from 'react-native';

function Navbar({ routes, navigation }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
      {routes.map((route, index) => {
        const label = route
        const isFocused = false
        const onPress = () => {
          if(!isFocused){
            navigation.navigate({ name: route, merge: true });
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={onPress}
            style={{ flex: 1, marginVertical:10}}
            key={index}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default Navbar