import React, { Component } from 'react';
import { StyleSheet,
         View,
         Text,
         FlatList,
         Button,
         Image
    } from 'react-native';
import { Bars } from 'react-native-loader';

class MusicListItem extends Component {
}

class MusicList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [
                {id:1, artist: "test", title: 'WHAAAAAT'},
                {id:2, artist: "test", title: 'WHAAAAT'},
                {id:3, artist: "test", title: 'WHAAAT'},
                {id:4, artist: "test", title: 'WHAAAT'},
                {id:5, artist: "test", title: 'WHAAT'},
                {id:6, artist: "test", title: 'WHT'},
                {id:7, artist: "test", title: 'WHAAAAAAAAT'},
                {id:8, artist: "test", title: 'WHAANNNNNAAAT'}
            ],
            error: null
        };
    }

    keyExtractor = (item, index) => item.id;

    loadMusic = () => {
        const url = 'http://kreten.si:3333/music?_limit=30';

        this.setState({ data: [], loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res,
                    error: res.error,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({ error, loading: false});
            })
    };

    renderItem = ({item}) => (
        <View>
            <Image style={{width: 50, height: 50}} source={{uri: item.albumArt}} />
            <Text>{item.artist}</Text>
            <Text>{item.title}</Text>
        </View>
    );

    renderHeader = () => (
        <Button
            onPress={this.loadMusic}
            title="Load Music"
        />
    );

    _renderFooter = () => (
        <Bars size={10} color="darkgray" />
    );

    renderFooter = () => (
        <Text>I will cick you faget</Text>
    );

    render() {
        if (this.state.loading) {
            return (
                <Bars size={10} />
            );
        }
        return (
            <FlatList
                style={styles.list}
                data={this.state.data}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                ListHeaderComponent={this.renderHeader}>
                ListFooterComponent={this.renderFooter}>
            </FlatList>
        );
    }
}

export default MusicList;

const styles = StyleSheet.create({
    header: {
        fontSize: 20
    },
    list: {
        backgroundColor: 'lightgray',
        height: 200,
        width: '100%'
    }
});
