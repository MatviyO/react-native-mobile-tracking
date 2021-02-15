import React from 'react'
import {Text, View} from "react-native";
import {GreyText, Button, Badge} from '../components'
import styled from "styled-components/native";
import {Foundation, Ionicons} from "@expo/vector-icons";

const PatientScreen = ({navigation}) => (
    <View style={{flex: 1}}>
        <PatientDetails>
            <PatientFullName>{navigation.getParam('user').fullName}</PatientFullName>
            <GreyText>{navigation.getParam('user').phone}</GreyText>
            <PattientButtons>
                <FormulaButtonView>
                    <Button>Formula</Button>
                </FormulaButtonView>
                <PhoneButtonView>
                    <Button color="#84D269"> <Foundation name="telephone" size={22} color="white"/></Button>
                </PhoneButtonView>
            </PattientButtons>
        </PatientDetails>

        <PatientAppointments>
            <Container>
                <AppointmentCard>
                    <AppoinmentCardRow>
                        <Ionicons name="md-medical" size={22} color="#a3a3a3" />
                        <AppoinmentCardLabel>tooth: <Text style={{ fontWeight: '700' }}>12</Text></AppoinmentCardLabel>
                    </AppoinmentCardRow>

                    <AppoinmentCardRow>
                        <Foundation name="clipboard-notes" size={22} color="#a3a3a3" />
                        <AppoinmentCardLabel>diagnosis: <Text style={{ fontWeight: '700' }}>pain</Text></AppoinmentCardLabel>
                    </AppoinmentCardRow>
                    <AppoinmentCardRow style={{marginTop: 15,justifyContent: 'space-between'}}>
                        <Badge style={{ width: 170}} active>9.02.2021 - 15:40</Badge>
                        <Badge color="green">300 $</Badge>
                    </AppoinmentCardRow>
                </AppointmentCard>
            </Container>
        </PatientAppointments>
    </View>

)

const AppoinmentCardLabel = styled.Text`
    font-size: 16px;
    margin-left: 10px;
`;
const AppoinmentCardRow = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 6.5px;
    margin-top: 6.5px;
`;

const AppointmentCard = styled.View`
    elevation: 0.7;
    shadow-opacity: 0.4;
    shadow-radius: 3.5;
    shadow-color: black;
    padding: 20px 25px;
    border-radius: 10px;
    background: white;
`;


const Container = styled.View`
    padding: 25px;
    flex: 1;
    
`;

const PatientDetails = styled(Container)`
    flex: 0.3;
`


const PatientAppointments = styled.View`
    flex: 1;
    background: #f8fafd;  
`;
const FormulaButtonView = styled.View`
    flex: 1;
`;
const PhoneButtonView = styled.View`
    margin-left: 10px;
    width: 45px;
`;

const PattientButtons = styled.View`
    flex: 1;
    flex-direction: row;
    margin-top: 20px;
`;

const PatientFullName = styled.Text`
    font-weight: 800;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 5px;
`;


PatientScreen.navigationOptions = {
    title: 'Road patients',
    headerColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }

}

export default PatientScreen

