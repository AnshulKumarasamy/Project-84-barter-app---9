import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class ItemDonateScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            requestedItemList: []
        }
        this.requestRef = null;
    }

    getRequestedItemList = () => {
        this.requestRef = db.collection("requested_items")
            .onSnapshot((snapshot) => {
                var requestedItemList = snapshot.docs.map(document => document.data())
                this.setState({
                    requestedItemList: requestedItemList
                })
            })
    }

    componentDidMount() {
        this.getRequestedItemList();
    }

    componentWillUnmount() {
        this.requestRef();
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                title={item.item_name}
                subtitle={item.reason_to_request}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                rightElement={
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            this.props.navigation.navigate("RecieverDetails", { "details": item })
                        }}
                    >
                        <Text style={{ color: '#ffffff' }}>View</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader title="Donate Items" navigation={this.props.navigation} />
                <View style={{ flex: 1 }}>
                    {
                        this.state.requestedItemList.length === 0
                            ? (
                                <View style={styles.subContainer}>
                                    <Text style={{ fontSize: 20 }}>None has requested an item</Text>
                                </View>
                            )
                            : (
                                <FlatList
                                    data={this.state.requestedItemList}
                                    keyExtractor={this.keyExtractor}
                                    renderItem={this.renderItem}
                                />
                            )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        }
    }
})