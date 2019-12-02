import React, { Component } from "react";
import { Text, AsyncStorage  } from "react-native";
import { Card, CardSection, Button, Input, Spinner } from "./common";
import { LOGIN_URL } from "../config/URL"

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false
  };

  onButtonPress() {
    const token = '';
    const { email, password } = this.state;
    this.setState({ error: "", loading: true });

    fetch(LOGIN_URL,{
      method:'POST',
      body:JSON.stringify({
          email: email,
          password: password
      }),
      headers:{ 
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
        },
  })
  .then(response => response.json())
  .then(json =>{
    console.log('JSON',json.access_token);
    this.onloginSuccess.bind(this);
    // AsyncStorage.setItem(token, 'json.access_token');
 })
  .catch((error) => {
    console.log('ERROR',error)
})
  }

  onLoginFaild() {
    this.setState({
      email: "",
      password:"",
      error: "Fallo la Autenticacion.!!!",
      loading: false
    });
  }

  onloginSuccess() {
    this.setState({
      email: "",
      password: "",
      loading: false,
      error: ""
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>
        <Text style={styles.errorTextStyles}>{this.state.error}</Text>
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyles: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
};
export default LoginForm;
