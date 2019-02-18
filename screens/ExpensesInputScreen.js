import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native'
import { ListItem, Input, Button, Overlay, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import api from '../api'

export default class ExpenseInputScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      amount: '',
      user: '',
      list: [
        {
          name: 'Brunita',
          avatar_url: 'https://scontent.fscl6-1.fna.fbcdn.net/v/t1.0-9/46783704_10217716703409124_4613593550842494976_n.jpg?_nc_cat=105&_nc_ht=scontent.fscl6-1.fna&oh=7272085c754c7521022eea1237fd42fe&oe=5CE67F4A',
          isSelected: false
        },
        {
          name: 'Berny',
          avatar_url: 'https://scontent.fscl6-1.fna.fbcdn.net/v/t1.0-9/293307_10151475824218726_1390888641_n.jpg?_nc_cat=100&_nc_ht=scontent.fscl6-1.fna&oh=a38ff2c208a49b32dad79d1c033ba68e&oe=5CEDAAB8',
          isSelected: false
        },
      ],
      isFetching: false,
      isSuccess: false
    }
  }

  static navigationOptions = {
    title: 'Nuevo gasto',
  }

  handleListSelect = (value) => {
    const { list } = this.state
    this.setState({
      user: value,
      list: [...list].map((row, index) => {
        return row.name === value
          ? { ...row, isSelected: true }
          : { ...row, isSelected: false }
      })
    })
  }

  handleAddExpense = () => {
    const { name, amount, user } = this.state

    this.setState({
      isFetching: true
    }, () => {
      fetch(`${api.endpoint}/expenses`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, amount, user })
      })
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            isSuccess: responseData.status === 'success'
          })
        })
        .done(() => {
          this.setState({ isFetching: false })
        })
    })
  }

  render() {
    const { name, amount, list, isFetching, isSuccess } = this.state
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Input
            placeholder='Nombre'
            value={name}
            onChangeText={(value) => { this.setState({ name: value }) }} />
          <Input
            placeholder='Monto'
            value={amount}
            onChangeText={(value) => { this.setState({ amount: value }) }}
            keyboardType="numeric" />
          {list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              rightIcon={<Icon name="check-circle" color={l.isSelected ? 'green' : '#ccc'} size={16} />}
              onPress={() => { this.handleListSelect(l.name) }}
            />
          ))}
          {!isFetching && <Button buttonStyle={{ marginTop: 20 }} onPress={this.handleAddExpense} title="Agregar gasto" />}
          {isFetching && <ActivityIndicator size="large" color="#0000ff" />}

        </ScrollView>
        {isSuccess && <Overlay
          isVisible={isSuccess}
          width={200}
          height={100}>
          <Text>Gasto agregado ;)</Text>
          <Button buttonStyle={{ marginTop: 20 }} onPress={() => { this.setState({ isSuccess: false }) }} title="Aceptar" />
        </Overlay>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  }
})
