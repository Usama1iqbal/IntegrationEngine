import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 1. CHOTA COMPONENT (Jo har line ko banata hai)
const MappingItem = ({ label, isChecked }) => {
  return (
    <View style={styles.itemRow}>
      {/* Checkbox (Dabba) */}
      <View style={styles.checkbox}>
        {isChecked && <Text style={styles.tick}>✓</Text>}
      </View>

      {/* Text (Agar checked hai to line pheri hui hogi) */}
      <Text
        style={[
          styles.itemText,
          isChecked && styles.crossedText, // Conditional Style
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

// 2. MAIN COMPONENT (Table)
const MappingTable = () => {
  return (
    <View style={styles.container}>
      {/* === HEADER (Mapping) === */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Mapping</Text>
      </View>

      {/* === SUB-HEADER (Source | Destination) === */}
      <View style={styles.subHeaderRow}>
        <Text style={styles.columnTitle}>Source</Text>
        <View style={styles.verticalLine} />
        <Text style={styles.columnTitle}>Destination</Text>
      </View>

      {/* === BODY (Columns) === */}
      <View style={styles.bodyRow}>
        {/* --- LEFT COLUMN --- */}
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>Patient</Text>
          <MappingItem label="MPI" isChecked={true} />
          <MappingItem label="Name" isChecked={true} />
          <MappingItem label="Gender" isChecked={false} />
          <MappingItem label="DOB" isChecked={false} />
          <MappingItem label="Address" isChecked={false} />
          <MappingItem label="Phone no" isChecked={false} />
        </View>

        {/* --- BEECH KI LINE --- */}
        <View style={styles.verticalLine} />

        {/* --- RIGHT COLUMN --- */}
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>PID</Text>
          <MappingItem label="MPI" isChecked={true} />
          <MappingItem label="FName" isChecked={true} />
          <MappingItem label="LName" isChecked={true} />
          <MappingItem label="Age" isChecked={false} />
          <MappingItem label="Gender" isChecked={false} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden', // Konay gol rakhne ke liye
    margin: 20, // Side se thora gap
    elevation: 3, // Shadow
  },

  // --- HEADERS ---
  header: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3E50', // Dark Blue Title
  },
  subHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: '#fff',
  },
  columnTitle: {
    flex: 1, // 50% jagah
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 8,
    color: '#000',
    fontSize: 16,
  },

  // --- BODY & COLUMNS ---
  bodyRow: {
    flexDirection: 'row', // Columns ko aamne samne lata hai
  },
  column: {
    flex: 1,
    padding: 15,
  },
  verticalLine: {
    width: 1, // Patli si line
    backgroundColor: '#000',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },

  // --- CHECKBOX ITEM STYLES ---
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tick: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  itemText: {
    fontSize: 15,
    color: '#000',
  },
  crossedText: {
    textDecorationLine: 'line-through', // Kata hua text
    color: '#888', // Grey color
  },
});

export default MappingTable;
