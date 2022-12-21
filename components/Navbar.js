import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

function Navbar({ routes, navigation, setTab, activeTab }) {
  return (
    <View style={styles.navbar}>
      {routes.map((route, index) => {
        const label = route
        const isFocused = index === activeTab
        const onPress = () => {
          if (!isFocused) {
            setTab(index)
            navigation.navigate('HomeNav', { screen: route });
          }
        };
        const icon = route === 'Home' ? isFocused ? require('../assets/homeiconfilled.png') : require('../assets/homeicon.png') :
          route === 'Track' ? isFocused ? require('../assets/trackiconfilled.png') : require('../assets/trackicon.png') :
            isFocused ? require('../assets/usericonfilled.png') : require('../assets/usericon.png')

        return (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={onPress}
            key={index}
            style={styles.navitem}
          >
            <Image style={styles.imgicon} source={icon}></Image>
            <Text style={{ color: isFocused ? '#FF4B2B' : '#000' }}>
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
    paddingVertical: 5,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  navitem: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  imgicon: {
    width: 30,
    height: 30
  }
})

export default Navbar