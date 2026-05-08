import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import TextInputField from './components/TextInputField';
import { getLogById } from '../API/Home'; // ✅ import

const MessageView = ({ navigation, route }) => {
  const { log_id } = route.params; // ✅ log_id lo
  const [logDetail, setLogDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogDetail();
  }, []);

  const fetchLogDetail = async () => {
    try {
      const data = await getLogById(log_id); // ✅ API call
      setLogDetail(data);
    } catch (err) {
      console.log('Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollViewContainer>
        <Header title="Message View" fontSize={24} />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#2F80ED"
            style={{ marginTop: 40 }}
          />
        ) : (
          <>
            <TextInputField
              title="Operation"
              value={logDetail?.operation_heading || ''}
            />
            <TextInputField
              title="Src Message"
              value={logDetail?.src_message || ''}
              multiline={true}
              numberOfLines={6}
              style={{
                height: 150,
                textAlignVertical: 'top',
              }}
            />
            <TextInputField
              title="Dest Message"
              value={logDetail?.dest_message || ''}
              multiline={true}
              numberOfLines={6}
              style={{
                height: 150,
                textAlignVertical: 'top',
              }}
            />
            <TextInputField title="Level" value={logDetail?.level || ''} />
            <TextInputField
              title="DateTime"
              value={logDetail?.datetime || ''}
            />
          </>
        )}
      </ScrollViewContainer>
    </View>
  );
};

export default MessageView;
