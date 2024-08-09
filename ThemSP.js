import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from './TextInput'; // Đảm bảo rằng bạn đã định nghĩa TextInput component
import { addSanPhamAPI } from './src/redux/action/Action';
import * as ImagePicker from 'react-native-image-picker';

const ThemSP = () => {
  const dispatch = useDispatch();
  const listSanPham = useSelector(state => state.sanpham.listSanPham);

  const [tenxeph44929, settenxe] = useState('');
  const [mausacph44929, setmausac] = useState('');
  const [giabanph44929, setgiaban] = useState(0);
  const [mota, setmota] = useState('');
  const [hinhanh, sethinhanh] = useState(null);

  const handleAdd = () => {
    let newSanPham = {
      tenxeph44929,
      mausacph44929,
      giabanph44929,
      mota,
      hinhanh: hinhanh?.assets[0]?.uri || ''
    };
    dispatch(addSanPhamAPI(newSanPham))
      .then((result) => {
        console.log('Thêm thành công');
      })
      .catch((e) => {
        console.log('Thêm sản phẩm thất bại');
      });
  };

  // Hàm chụp ảnh
  const chupAnh = useCallback(() => {
    let option = {
      saveToPhoto: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true
    };
    ImagePicker.launchCamera(option, (response) => {
      if (!response.didCancel && !response.errorCode) {
        sethinhanh(response);
      }
    });
  }, []);

  // Hàm chọn ảnh từ thư viện
  const chonAnh = useCallback(() => {
    let option = {
      mediaType: 'photo',
      selectionLimit: 1 // Giới hạn số lượng ảnh sẽ chọn
    };
    ImagePicker.launchImageLibrary(option, (response) => {
      if (!response.didCancel && !response.errorCode) {
        sethinhanh(response);
      }
    });
  }, []);

  useEffect(() => {
    console.log(hinhanh);
  }, [hinhanh]);

  return (
    <View style={styles.container}>
      <TextInput placeholder="Mời nhập tên xe " label="Tên Xe" value={tenxeph44929} onChangeText={settenxe} />
      <TextInput placeholder="Mời nhập màu sắc " label="Màu Sắc" value={mausacph44929} onChangeText={setmausac} />
      <TextInput placeholder="Mời nhập Giá Bán " label="Giá Bán" value={giabanph44929.toString()} onChangeText={setgiaban} />
      <TextInput placeholder="Mời nhập Mô tả " label="Mô tả" value={mota} onChangeText={setmota} />

      <View style={styles.buttonContainer}>
        <Button title="Chụp ảnh" onPress={chupAnh} />
        <Button title="Chọn ảnh" onPress={chonAnh} />
      </View>

      {hinhanh && hinhanh.assets && hinhanh.assets.length > 0 && (
        <Image source={{ uri: hinhanh.assets[0].uri }} style={styles.image} />
      )}

      <Button title="Thêm sản phẩm" onPress={handleAdd} />
    </View>
  );
};

export default ThemSP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});
