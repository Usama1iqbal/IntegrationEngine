import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import TextInputField from './components/TextInputField';
import Button from './components/Button';
import NavigationHomeEndPointRoutesLogs from './components/NavigationHomeEndPointRoutesLogs';
import ScrollViewContainer from './components/ScrollViewContainer';
import Dropdown from './components/Dropdown';
import Header from '../screen/components/Header';

const EditServer = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollViewContainer>
        <Header title="Edit Server" fontSize={25} />

        <TextInputField title="Server IP" placeholder="e.g. 8.8.8.8" />
        <TextInputField
          title="Server Port"
          placeholder="e.g. 443"
          keyboardType="numeric"
        />
        <TextInputField title="Server Name" placeholder="Enter Server Name" />

        <View style={{ marginTop: 10 }}>
          <Dropdown title="Protocol" options={['FHIR', 'HL7']} />
        </View>

        <View style={{ marginVertical: 50, alignItems: 'center' }}>
          <Button title="Edit Server" />
        </View>
      </ScrollViewContainer>

      <NavigationHomeEndPointRoutesLogs />
    </View>
  );
};

export default EditServer;
