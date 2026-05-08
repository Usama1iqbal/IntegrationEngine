import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavigationHomeEndPointRoutesLogs = ({ activeTab }) => {
  const navigation = useNavigation();

  const activeColor = '#2F80ED';
  const inactiveColor = '#999';

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('DashBoard')}
      >
        <Image
          source={require('../../assests/GHR.png')}
          style={[
            styles.navIcon,
            { tintColor: activeTab === 'Home' ? activeColor : inactiveColor },
          ]}
        />
        <Text
          style={[
            styles.navText,
            { color: activeTab === 'Home' ? activeColor : inactiveColor },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('AddEndpoints')}
      >
        <Image
          source={require('../../assests/AddPatient.png')}
          style={[
            styles.navIcon,
            {
              tintColor:
                activeTab === 'Endpoints' ? activeColor : inactiveColor,
            },
          ]}
        />
        <Text
          style={[
            styles.navText,
            { color: activeTab === 'Endpoints' ? activeColor : inactiveColor },
          ]}
        >
          Endpoints
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Routee')}
      >
        <Image
          source={require('../../assests/Vector.png')}
          style={[
            styles.navIcon,
            {
              tintColor: activeTab === 'Channels' ? activeColor : inactiveColor,
            },
          ]}
        />
        <Text
          style={[
            styles.navText,
            { color: activeTab === 'Channels' ? activeColor : inactiveColor },
          ]}
        >
          Channels
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('MessageLogs')}
      >
        <Image
          source={require('../../assests/Logs.png')}
          style={[
            styles.navIcon,
            {
              tintColor: activeTab === 'Logs' ? activeColor : inactiveColor,
            },
          ]}
        />
        <Text
          style={[
            styles.navText,
            { color: activeTab === 'Logs' ? activeColor : inactiveColor },
          ]}
        >
          Logs
        </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 80,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navIcon: { width: 24, height: 24, resizeMode: 'contain', marginBottom: 5 },
  navText: { fontSize: 10, fontWeight: '600' },
});

export default NavigationHomeEndPointRoutesLogs;
