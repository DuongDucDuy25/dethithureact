import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSanPham, deleteSanPhamAPI } from '../redux/action/Action';
import Banner from '../../Banner';
import 'react-native-reanimated';

const SanPhamScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const listSanPham = useSelector(state => state.sanpham.listSanPham);
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    dispatch(fetchSanPham());
  }, [dispatch]);

  const handleDelete = async (id) => {
    dispatch(deleteSanPhamAPI(id))
      .then((result) => {
        console.log('Xóa thành công');
      }).catch((e) => {
        console.error('Lỗi: ' + e);
      });
  };

  const themSP = () => {
    navigation.navigate('ThemSP');
  };

  const suaSP = (item) => {
    navigation.navigate('SuaSP', { sanpham: item });
  };

  const renderItem = ({ item, index }) => {
    const inputRange = [-1, 0, 100 * index, 100 * (index + 2)];
    const opacityInputRange = [-1, 0, 100 * index, 100 * (index + 1)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0]
    });
    const opacity = scrollY.interpolate({
      inputRange: opacityInputRange,
      outputRange: [1, 1, 1, 0]
    });

    return (
      <Animated.View style={[styles.productContainer, { opacity, transform: [{ scale }] }]}>
        <Image source={{ uri: item.hinhanh }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productText}>Tên xe: {item.tenxeph44929}</Text>
          <Text style={styles.productText}>Màu sắc: {item.mausacph44929}</Text>
          <Text style={styles.productText}>Giá bán: {item.giabanph44929}</Text>
          <Text style={styles.productText}>Mô tả: {item.mota}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={() => suaSP(item)}>
            <Text style={styles.buttonText}>Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
            <Text style={styles.buttonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Banner uri_img='https://i.pinimg.com/236x/2b/ee/04/2bee0465227d3cbe11a8041eccc9eaa4.jpg' />
      <Animated.FlatList
        data={listSanPham}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />
      <TouchableOpacity style={styles.buttonthem} onPress={themSP}>
        <Text style={styles.buttonText}>Thêm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SanPhamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  productContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 10,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  buttonText: {
    color: 'white',
  },
  buttonthem: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 100,
    alignItems: 'center',
  },
});
