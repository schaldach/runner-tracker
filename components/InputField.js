import { View, StyleSheet, Text, TextInput } from 'react-native';

function InputField({ fieldName, stateFunction, state, placeholder, passwordType }) {
  return (
    <View style={styles.container}>
      <Text style={styles.fieldName}>{fieldName}</Text>
      <TextInput secureTextEntry={passwordType} multiline={false} style={styles.fieldInput} value={state} onChange={stateFunction} placeholder={placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  fieldName: {
    color: '#fff',
    paddingBottom: 4,
    fontSize: 16,
  },
  fieldInput: {
    padding: 10,
    fontSize: 20,
    color: '#fff',
    outlineStyle: 'none',
    borderRadius: 10,
    width: 250,
    backgroundColor: '#535353'
  }
});

export default InputField;