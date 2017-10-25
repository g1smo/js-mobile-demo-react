import React, { Component } from 'react';
import { StyleSheet,
         View,
         Text,
         FlatList,
         Button,
         Image
    } from 'react-native';
import { Bars } from 'react-native-loader';

class MusicList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
            page: 0,
            limit: 30
        };
    }

    keyExtractor = (item, index) => item.id;

    loadMusic = () => {
        if (this.state.loading) return;

        console.log("initial load!");

        const url = 'http://kreten.si:3333/music?_limit=' + this.state.limit + '&_page=' + this.state.page;
        this.setState({ data: [], loading: true, page: 0 });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res,
                    error: res.error,
                });
                this.setState({
                    loading: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false});
            })
    };

    loadMore = () => {
        if (this.state.loading) return;

        console.log("load more!");

        this.setState({ loading: true, page: this.state.page + 1 });
        const url = 'http://kreten.si:3333/music?_limit=' + this.state.limit + '&_page=' + this.state.page;

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: this.state.data.concat(res),
                    error: res.error,
                });
                this.setState({
                    loading: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false});
            })
    };

    renderHeader = () => (
        <Button
            onPress={this.loadMusic}
            title="Load Music"
        />
    );

    renderFooter = () => {
        if (this.state.loading) {
            return (
                <View style={styles.loaderContainer}>
                    <Bars size={10} />
                </View>
            );
        } else {
            return null;
        }
    };

    renderItem = ({item}) => (
        <View style={{ flexDirection: 'row', borderBottomColor: 'black' }}>
            <Image style={styles.albumArt} source={{uri: item.albumArt}} />
            <View style={{ paddingTop: 7 }}>
                <Text style={{ fontWeight: 'bold' }}>{item.artist}</Text>
                <Text style={{ fontSize: 18 }}>{item.title}</Text>
            </View>
        </View>
    );

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.state.data}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                onEndReached={this.loadMore}
            />
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
        width: '100%'
    },
    loaderContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 10
    },
    albumArt: {
        width: 50,
        height: 50,
        margin: 5,
        marginRight: 10,
        borderRadius: 4
    }
});
