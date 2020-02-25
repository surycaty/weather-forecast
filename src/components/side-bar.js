import React from "react";
import { Image, View, FlatList, Text } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/EvilIcons';
import styled from 'styled-components/native';
import SwitchToggle from 'react-native-switch-toggle';

const routes = ["Configurações", "Weather"];

export default class SideBar extends React.Component {
    
    state = {
        switchTemp: false
    }

  render() {

    return (
      <Container>
        <Content>
          <Image
            square
            style={{
              height: 40,
              width: 35,
              position: "absolute",
              alignSelf: "center",
              top: 20
            }}
            source={{
              uri:
                "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/logo.png"
            }}
          />
          <FlatList
            data={routes}
            contentContainerStyle={{ marginTop: 60 }}
            renderItem={({item}) => {
              return (
                <View>
                  <Text><MaterialCommunityIcons name="gear" size={20} />{item}</Text>
                </View>
              );
            }}
          />

          <Content>
            <Text>Temperatura</Text>
            <SwitchToggle
                containerStyle={{
                    marginLeft: 5,
                    width: 50,
                    height: 25,
                    borderRadius: 25,
                    padding: 2,
                    paddingLeft:4
                }}
                circleStyle={{
                    width: 25,
                    height: 25,
                    borderRadius: 25,
                    marginLeft: -5
                }}
                rightContainerStyle={{
                    marginLeft:6
                }}
                leftContainerStyle={{
                    marginRight:-4
                }}
                textLeftStyle={{
                    marginRight:-5
                }}
                textRightStyle={{
                    marginLeft: 2
                }}
                type={1}
                circleColorOff='#87CEEB'
                circleColorOn='#ADD8E6'
                backTextRight={this.getRightText()}
                backTextLeft={this.getLeftText()}
                switchOn={this.state.switchTemp}
                onPress={this.onPressSwitchTemp} />
            </Content>
          <View style={{height:120}}></View>
        </Content>
        
      </Container>
    );
  }
  
  getRightText() {
    return this.state.switchTemp ? '' : 'C°';
  }
  
  getLeftText() {
    return this.state.switchTemp ? 'F°' : '';
  }

  onPressSwitchTemp = () => this.setState({ switchTemp: !this.state.switchTemp });

}


const Container = styled.View`
  flex: 1;
  background-color: white;
`;


const Content = styled.View`
  flex: 1;
  background-color: white;
`;