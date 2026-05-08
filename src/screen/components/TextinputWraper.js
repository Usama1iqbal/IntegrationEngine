import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const TextinputWraper = ({
  placeholder,
  icon,
  rightIcon,
  isPassword,
  // 👇 Humne inhein receive kiya, par agar ye na milein to code phatega nahi
  value,
  onChangeText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputWrapper}>
      {icon && <Image source={icon} style={styles.iconStyle} />}

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        
        // 👇 SAFE LOGIC:
        // Agar 'value' pass ki gayi hai to use karo, nahi to undefined rehne do (Crash nahi hoga)
        value={value ? value : undefined}
        
        // Agar 'onChangeText' pass kiya gaya hai to function call karo
        onChangeText={(text) => {
            if (onChangeText) {
                onChangeText(text);
            }
        }}

        secureTextEntry={isPassword && !showPassword}
      />

      {rightIcon && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={rightIcon}
            style={[
              styles.iconStyle,
              { tintColor: showPassword ? '#2D3E50' : '#999' },
            ]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    width: '100%',
  },
  iconStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#999',
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: 14,
    height: '100%',
  },
});

export default TextinputWraper;