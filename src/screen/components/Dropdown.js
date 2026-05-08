import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';

const Dropdown = ({
  title,
  options,
  onSelect,
  placeholder = 'Select an option',
}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = item => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.dropdownBox}
        onPress={() => setVisible(true)}
      >
        <Text style={[styles.selectedText, !selected && { color: '#999' }]}>
          {selected || placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.optionsList}>
            <ScrollView>
              {options.length > 0 ? (
                options.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.optionItem}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noData}>No options available</Text>
              )}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15, marginHorizontal: 10 },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0D253C',
    marginBottom: 5,
  },
  dropdownBox: {
    height: 45,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  selectedText: { fontSize: 14, color: '#333' },
  arrow: { fontSize: 12, color: '#0D253C' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsList: {
    width: '80%',
    maxHeight: '50%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  optionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: { fontSize: 14, color: '#333' },
  noData: { textAlign: 'center', padding: 20, color: '#999' },
});

export default Dropdown;
