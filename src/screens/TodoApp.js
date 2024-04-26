import { View, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Button, Text, TextInput, useTheme } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';
import Todo from '../components/Todo';

const TodoApp = () => {

    const [todo, setTodo] = useState('');
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState([]);
    const ref = firestore().collection('todos');

    const addTodo = async () => {
        await ref.add({
            title: todo, complete: false,
        });
        setTodo('');
    }

    useEffect(() => {
        return ref.onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
                const { title, complete } = doc.data();
                list.push({
                    id: doc.id,
                    title,
                    complete
                });
            });
            setTodos(list);
            if (loading) {
                setLoading(false);
            }
        });
    });

    if (loading) {
        return null;
    }

    return (
        <View style={{ flex: 1 }}>
            <Appbar>
                <Appbar.Content title={'TODOs List'} />
            </Appbar>
            <FlatList 
                style={{ flex: 1 }} data={todos} keyExtractor={(item) => item.id} renderItem={({ item }) => <Todo {...item} />}
            />
            <TextInput label={'New Todo'} value={todo} onChangeText={(text) => setTodo(text)} />
            <Button onPress={addTodo}>Add TODO</Button>
        </View>
    );
}


/*
const TodoApp = () => {
    const ref = firestore().collection("todos");
    const [newToDo, setNewToDo] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        var result = [];
        ref.onSnapshot((collection) => {
            collection.forEach(
                doc => {
                    const {title, complete} = doc.data();
                    result.push({
                        id: doc.id,
                        title,
                        complete
                    })
                }
            )
        })
        setTodos(result)
    }, [todos])

    const addNewToDo = () => {
        ref.add({
            title: newToDo,
            complete: false,
        })
        .then(() => {
            console.log("Thêm thành công")
            setNewToDo('')
        })
        .catch(e => console.log(e))
    }

    const renderItem = ({item}) => {
        const {title, complete} = item;
        return (
            <View>
                <Text>{title}</Text>
            </View>
        )
    }

  return (
    <View style={{flex: 1}}>
      <Appbar>
        <Appbar.Content title="To do list"/>
      </Appbar>
      <ScrollView style={{flex: 1}}>
        <FlatList 
            data={todos}
            keyExtractor={item => item.id}
            renderItem={renderItem}
        />
      </ScrollView>
      <TextInput value={newToDo} onChangeText={setNewToDo} />
      <Button onPress={addNewToDo}>
        Add new button
      </Button>
    </View>
  )
}
*/
export default TodoApp