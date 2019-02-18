import React, { Component } from 'react'
import axios from 'axios'
import {
  ScrollView,
  StyleSheet,
  View,
  SectionList,
  Text
} from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'
import api from '../api'

export default class ExpenseListScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tableHead: ['Nombre', 'Monto', 'Pagado por'],
      tableData: [['cargando']],
    }
    this.getData()
  }

  static navigationOptions = {
    title: 'Mis gastos',
  }

  getData = () => {

    fetch(`${api.endpoint}/expenses/list`, { method: "GET" })
      .then(response => response.json())
      .then(responseData => {
        if (responseData && responseData.length > 0) {
          this.setState({
            tableData: responseData.map(row => {
              return [
                row.name,
                row.amount,
                row.user,
              ]
            })
          })
        } else {
          this.setState({
            tableData: []
          })
        }
      })
      .done()
  }

  componentDidUpdate() {
    this.getData()
  }

  render() {
    const { tableHead, tableData } = this.state
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Table style={{ padding: 10 }} borderStyle={{ borderWidth: 2, borderColor: '#ccc' }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  head: { height: 40, backgroundColor: '#ccc' },
  text: { margin: 6 }

})
