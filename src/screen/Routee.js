import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAllRoutes } from '../API/Home';
import Button from './components/Button';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import RouteData from './components/RouteData';
import NavigationHomeEndPointRoutesLogs from './components/NavigationHomeEndPointRoutesLogs';

const Routee = ({ navigation }) => {
  const { data: routes = [], isLoading } = useQuery({
    queryKey: ['routes'],
    queryFn: getAllRoutes,
  });

  return (
    <View style={styles.container}>
      <ScrollViewContainer>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}
        >
          <Header title="Channels" fontSize={35} />
          <Button
            title="Add Channels"
            onPress={() => navigation.navigate('AddRouteDetail')}
          />
        </View>

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#2F80ED"
            style={{ marginTop: 50 }}
          />
        ) : routes.length > 0 ? (
          routes.map((item, index) => (
            <RouteData
              key={item.route_id || index}
              name={item.channel_name}
              src_server={item.src_server?.name}
              dest_server={item.dest_server?.name}
              onPress={() =>
                navigation.navigate('RouteDetail', { channel: item })
              }
            />
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 50, color: '#999' }}>
            No routes found
          </Text>
        )}
      </ScrollViewContainer>

      <NavigationHomeEndPointRoutesLogs activeTab="Channels" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#B0B0B0',
    paddingBottom: 10,
    marginTop: 10,
  },
  serverHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  middleTitle: { fontSize: 14, fontWeight: 'bold', color: '#0D253C', flex: 1 },
  buttonContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
});

export default Routee;
