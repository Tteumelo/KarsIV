import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface AuthInputProps extends TextInputProps {
  icon?: string;
  style?: ViewStyle | TextStyle | null;
}

const AuthInput: React.FC<AuthInputProps> = ({ icon, style, ...props }) => {
  return (
    <View style={[styles.container, style]}>
      {icon && <Icon name={icon} size={24} color="#6200ee" style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF3B30',
    borderWidth: 1,
  },
});

export default AuthInput;