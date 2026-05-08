import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const TextInputField = ({
  placeholder,
  value,
  onChangeText,
  onRemove,
  title,
  multiline,
  numberOfLines,
  inputStyle,
}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.label}>{title}</Text>

      <View
        style={[
          styles.inputContainer,
          multiline && { height: 'auto', minHeight: 60 },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            multiline && { textAlignVertical: 'top' },
            inputStyle,
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#999"
          editable={!onRemove}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />

        {onRemove && (
          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D253C',
    marginBottom: 8,
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FBFD',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E1EAF2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    height: 60,
  },
  input: {
    flex: 1,
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#2D3E50',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TextInputField;
