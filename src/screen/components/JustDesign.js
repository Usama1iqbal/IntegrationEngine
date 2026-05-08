import React from 'react';
import { View } from 'react-native';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import TextInputField from './components/TextInputField';

const MessageView = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollViewContainer>
        <Header title="Message View" fontSize={24} />
        <TextInputField title="Src Message" value="" />

        <TextInputField title=" Message" value="" />
        

      </ScrollViewContainer>
    
    </View>
  );
};

export default MessageView;