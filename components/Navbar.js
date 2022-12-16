import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

function Navbar({ routes, navigation }) {
  return (
    <View style={styles.navbar}>
      {routes.map((route, index) => {
        const label = route
        const isFocused = false
        const onPress = () => {
          if (!isFocused) {
            navigation.navigate('HomeNav',{ screen: route });
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={onPress}
            key={index}
            style={styles.navitem}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#fff' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#000',
    alignItems: 'center'
  },
  navitem: {
    flex: 1,
    alignItems: 'center'
  }
})

export default Navbar