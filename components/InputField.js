import { View, StyleSheet, Text, TextInput } from 'react-native';

function InputField({ fieldName, stateFunction, state, placeholder, passwordType, bottomMargin, topMargin }) {
  return (
    <View style={{justifyContent: 'center', marginBottom: bottomMargin?15:0, marginTop: topMargin?15:0}}>
      <Text style={styles.fieldName}>{fieldName}</Text>
      <TextInput secureTextEntry={passwordType} multiline={false} style={styles.fieldInput} value={state} onChange={stateFunction} placeholder={placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldName: {
    color: '#fff',
    fontFamily: 'Helvetica',
    fontSize: 16,
  },
  fieldInput: {
    padding: 10,
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Helvetica',
    outlineStyle: 'none',
    borderRadius: 10,
    width: 280,
    backgroundColor: '#535353'
  }
});

export default InputField;