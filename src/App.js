import React, { Component } from "react";
import { Text, View } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { Header, Button, Spinner, CardSection, } from "./components/common";
import LoginForm from "./components/LoginForm";
import { USER_URL, LOGOUT_URL} from "./config/URL";
import  Login  from "./components/Login";
//Para el BackEnd////
//https://medium.com/@experttyce/c%C3%B3mo-crear-un-api-rest-con-laravel-5-7-y-jwt-token-94b79c533c6d
//https://github.com/barryvdh/laravel-cors
//PAra el FrontEnd//
//https://github.com/VientoDigital/ReactNativeLaravelLogin/blob/master/App/Actions/index.js

class App extends Component {
constructor(props){
  super(props);
  this.state = {
    loggeIn: null,
    user:''
  };
  this.getKey = this.getKey.bind(this);
  this.login = this.login.bind(this);
}  

  componentWillMount() {
    this.login();   
  }

login() {
this.getKey().then(value => {
    console.log('value',value)
    fetch(USER_URL,{
      method:'POST',
      body: JSON.stringify({
        token: value
      }),
      headers:{ 
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
        },
  })
  .then(response => response.json())
  .then(json =>{
     console.log('JSON',json);
     if(json.error){
      this.setState({ loggeIn: false });
     }
     else{
      this.setState({ loggeIn: true });
      console.log('loggeIn',this.state.loggeIn);
      this.setState({ user: json});
     }
 
  })
  .catch((error) => {
    console.log('ERROR',error)
    this.setState({ loggeIn: false });
    console.log('loggeIn',this.state.loggeIn);
 })
  });
}

  async getKey() {
    try {
      const value = await AsyncStorage.getItem('@token');
      console.log('accediendo la key',value);
     return (value)
    } catch (error) {
      console.log("Error retrieving data" + error);
    };
  }


  onButtonPressLogout()
  {
this.getKey().then(value => {
  console.log(value)
  fetch(LOGOUT_URL,{
    method:'POST',
    body: JSON.stringify({
      token: value
    }),
    headers:{ 
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
      },
})
.then(response => response.json())
.then(json =>{
   console.log('JSON',json);
   this.setState({
     loggeIn: false,
     user:''
    });

})
.catch((error) => {
  console.log('ERROR',error)
})
});   
  }

  renderContent() {
    switch (this.state.loggeIn) {
      case true:
        return (
<Login />
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Autenticacion" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
