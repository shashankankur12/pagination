import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

const App = () => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect( () => {
    getFoodList();
  }, [page]);

  const getFoodList = () => {
    axios
      .get('https://www.omdbapi.com/?s=Batman&apikey=663be951&page='+page )
      .then(response => {
        setMovie([...movie, ...response.data.Search]);
        setLoading(false);
      });
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          style={styles.images}
          source={{uri: item.Poster}}
          resizeMode={'contain'}
        />

        <View style={styles.containerItem}>
          <Text style={styles.itemTitle}>{item.Title} </Text>
          <Text style={styles.itemText}>{item.Year} </Text>
          <Text style={styles.itemTextSmall}>{item.Type} </Text>
        </View>
      </View>
    );
  };

  const separator = () => {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: 'grey',
          marginVertical: 3,
          height: 1,
        }}
      />
    );
  };

  const loadMoreData = () => {
    setPage(page+1);
    console.log(page);
  };

  const loader = () => {
    return (
      <View>
        <ActivityIndicator size="large" color="primary" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeaderStyle}>Movies</Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={styles.listStyle}
          data={movie}
          ItemSeparatorComponent={separator}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          onEndReached={loadMoreData}
          ListFooterComponent={loader}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 2,
  },
  containerItem: {
    flex: 1,
    flexDirection: 'column',
  },
  textHeaderStyle: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: '500'
  },
  itemTitle: {
    paddingHorizontal: 8,
    fontSize: 22,
    fontWeight: '400',
    color:'black',
  },
  itemText: {
    paddingHorizontal: 8,
    fontSize: 20,
    paddingVertical: 1,
    fontWeight: '300',
  },
  itemTextSmall: {
    paddingHorizontal: 8,
    fontSize: 18,
    fontWeight: '300',
  },
  images: {
    height: 90,
    width: 70,
    alignSelf: 'center',
    borderRadius:8,
    marginStart:10,
  },
  listStyle: {
    marginTop: 10,
    width: '100%',
  },
});

export default App;
