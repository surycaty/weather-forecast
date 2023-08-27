import React from 'react';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text } from 'react-native';

const cardDetail = props => (
  <Container>
    <HeaderContent>
      <Title>{props.item.name}</Title>
    </HeaderContent>
    <Cover color={props.weather.color}>
      <MaterialCommunityIcons name={props.weather.icon} size={80} />
      <Temperature>{props.item.weather.temp}°</Temperature>
      <View>
        <Text>Min {props.item.weather.temp_min}°</Text>
        <Text>Max {props.item.weather.temp_max}°</Text>
      </View>
    </Cover>
    <Content>
      <Description>{props.weather.title}</Description>
      <Subtitle>{props.weather.subtitle}</Subtitle>
    </Content>
  </Container>
);

export default CardDetail;

const Container = styled.View`
  background: #fff;
  height: 240px;
  border-radius: 14px;
  margin: 18px;
  elevation: 10;
`;

const Cover = styled.View`
  width: 100%;
  height: 110px;
  overflow: hidden;
  align-items: flex-end;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const Content = styled.View`
  padding-top: 10px;
  flex-direction: column;
  align-items: center;
  height: 40px;
`;

const HeaderContent = styled(Content)`
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  font-size: 28px;
`;

const Title = styled.Text`
  color: #3c4560;
  font-size: 28px;
  font-weight: 600;
`;

const Description = styled(Title)`
  font-size: 20px;
`;

const Subtitle = styled.Text`
  color: #b8b3c3;
  font-size: 15px;
  font-weight: 600;
  margin-top: 4px;
`;

const Temperature = styled.Text`
  font-size: 72px;
  font-weight: 600;
  color: black;
`;
