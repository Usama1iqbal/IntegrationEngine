import React from 'react';
import {
  View,
  style,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const Navigation = () => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => console.log('Home Pressed')}
      >
        <Image
          source={require('../../assests/GHR.png')}
          style={styles.navIcon}
        />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => console.log('AddPressed')}
      >
        <Image
          source={require('../../assests/AddPatient.png')}
          style={[styles.navIconImage, { tintColor: '#999' }]}
        />
        <Text style={styles.navText}>Add Endpoints</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => console.log('Vector Pressed')}
      >
        <Image
          source={require('../../assests/Notification.png')}
          style={[styles.navIconImage, { tintColor: '#999' }]}
        />
        <Text style={styles.navText}>Routes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => console.log('Logs Pressed')}
      >
        <Image
          source={require('../../assests/Profile.png')}
          style={[styles.navIconImage, { tintColor: '#999' }]}
        />
        <Text style={styles.navText}>Logs</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row', // Saare buttons aik line mein (Left to Right)
    justifyContent: 'space-around', // Beech mein barabar gap
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 80, // Height thori barhai taake text fit aaye
    borderTopLeftRadius: 30, // Design ke mutabiq gol konay
    borderTopRightRadius: 30,

    // Shadow (Optional)
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,

    // Position Fixed (Screen ke neeche chipkane ke liye)
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center', // <--- ZAROORI: Icon aur Text ko center karta hai
    justifyContent: 'center',
    // flexDirection: 'row',    <--- YEH LINE MAT LIKHNA (Warna text side pe chala jayega)
  },
  navIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#999', // Default Grey Text
  },
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginBottom: 5, // <--- Icon aur Text ke beech thora gap
    tintColor: '#999', // Default Grey Color
  },
});
export default Navigation;
