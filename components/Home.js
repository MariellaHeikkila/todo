import {AntDesign} from '@expo/vector-icons'
import { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@todo_key'

export default function Home({route, navigation}) {

    // const [todos, setTodos] = useState(Array(20).fill('').map((_,i) =>(`Test ${i}`)))
    const [todos, setTodos] = useState([])

    useEffect(() => {
        if (route.params?.todo) {
            const newkey = todos.length + 1
            const newTodo = {
                key: newkey.toString(),
                description: route.params.todo
            }
            const newTodos = [...todos, newTodo]
            storeData(newTodos)
        }
        getData()
    }, [route.params?.todo])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#f0f0f0'
            },
            headerRight: () => (
                <AntDesign
                style={styles.navButton}
                name='plus'
                size={24}
                color='black'
                onPress={() => navigation.navigate('Todo')}
                />
            )
        })
    }, [])

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        } catch (e) {
          console.log(e);
        }
      };

      const getData = async () => {
        try {
          return AsyncStorage.getItem(STORAGE_KEY)
          .then(req => JSON.parse(req))
          .then(json => {
            if (json === null) {
                json = []
            }
            setTodos(json)
        })
        .catch(error => console.log(error))
        } catch (e) {
            console.log(e);
        }
      };

    return(
        <View style={styles.container}>
            <ScrollView>
            {
                todos.map((todo) => (
                    <View key={todo.key} style={styles.rowContainer}>
                        <Text style={styles.rowText}>{todo.description}</Text>
                    </View>
                ))
            }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20
    },
    rowContainer: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 5,
      marginBottom: 5
    },
    rowText: {
      fontSize: 20,
      marginLeft: 5
    },
    navButton: {
      marginRight: 5,
      fontSize: 24,
      padding: 4
    },
    newTask: {
      width: '100%',
      margin: 20,
      fontSize: 18
    }
  });