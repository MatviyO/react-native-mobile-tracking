import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components/native';
import GreyText from './GreyText'
import GetLocation from 'react-native-get-location'
import Badge from "./Badge";

const Appointment = ({item ,navigate }) => {
    const {user, description, time, active} = item;
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
        .then(location => {
            console.log(location);
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    return (
        <GroupItem onPress={navigate.bind(this, 'Patient', item)}>
            <Avatar source={{uri: `${user.avatar}`}}/>
            <View style={{flex: 1}}>
                <FullName>{user.fullName}</FullName>
                <GreyText>{description}</GreyText>
            </View>
            <Badge active={active}>{time}</Badge>
        </GroupItem>
    )
}
export default Appointment;




const FullName = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;

const Avatar = styled.Image`
  border-radius: 50px;
  width: 40px;
  height: 40px;
  margin-right: 15px;  
`;

const GroupItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f3f3;
`;


