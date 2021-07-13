import firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import MyHeader from '../components/MyHeader';
import { ListItem, Icon } from 'react-native-elements';
import db from '../config';

export default class NotificationScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: firebase.auth().currentUser.email,
            allNotifications: [],
        };

        this.notificationRef = null
    }

       getNotifications = () => {
        this.requestRef = db.collection("all_notifications")
            .where("notification_status", "==", "unread")
            .where("targeted_user_id", "==", this.state.userId)
            .onSnapshot((snapshot) => {
                var allNotifications = [];
                snapshot.docs.map((doc) => {
                    var notification = doc.data();
                    notification["doc_id"] = doc.id;
                    allNotifications.push(notification);
                })
                this.setState({
                    allNotifications: allNotifications
                })
            })
    }

    componentDidMount() {
        this.getNotifications();
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, index }) => {
        return (
            <ListItem
                key={index}
                title={item.item_name}
                subtitle={item.message}
                leftElement={<Icon name="item" type="font-awesome" color='#696969' />}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                bottomDivider
            />
        )
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{ flex: 0.1 }}>
                    <MyHeader title={"Notifications"} navigation={this.props.navigation} />
                </View>
                <View style={{flex:0.9}}>
                    {
                        this.state.allNotifications.length === 0
                            ? (
                                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{ fontSize: 25 }}>You have No Notifications</Text>
                                </View>
                            )
                            : (
                                <FlatList
                                    keyExtractor={this.keyExtractor}
                                    data={this.state.allNotifications}
                                    renderItem={this.renderItem}
                                />
                            )
                    }
                </View>
            </View>
        )
    }
}