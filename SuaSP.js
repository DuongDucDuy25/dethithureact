import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TextInput from './TextInput';
import Button from './Button';
import { updateSanPhamAPI } from './src/redux/action/Action'; // Cập nhật đường dẫn import nếu cần

const SuaSP = ({ route, navigation }) => {
  const { sanPham } = route.params;
  const dispatch = useDispatch();

  const [tenxeph44929, setedittenxe] = useState('');
  const [mausacph44929, seteditmausac] = useState('');
  const [giabanph44929, seteditgiaban] = useState(0);
  const [mota, seteditmota] = useState('');
  const [hinhanh, setedithinhanh] = useState('');
  const [id, setid] = useState(null);

  useEffect(() => {
    if (sanPham) {
      setedittenxe(sanPham.tenxeph44929);
      seteditmausac(sanPham.mausacph44929);
      seteditgiaban(sanPham.giabanph44929);
      seteditmota(sanPham.mota);
      setedithinhanh(sanPham.hinhanh);
      setid(sanPham.id);
    }
  }, [sanPham]);

  const handleUpdate = () => {
    const dulieuUpdate = {
      id: id,
      tenxeph44929: tenxeph44929,
      mausacph44929: mausacph44929,
      giabanph44929: giabanph44929,
      mota: mota,
      hinhanh: hinhanh,
    };

    dispatch(updateSanPhamAPI({ id: id, data: dulieuUpdate }))
      .then((result) => {
        console.log('Cập nhật thành công');
        setedittenxe('');
        seteditmausac('');
        seteditgiaban(0);
        seteditmota('');
        setedithinhanh('');
        setid(null);
        navigation.goBack(); // Quay lại trang trước đó sau khi cập nhật thành công
      })
      .catch((e) => {
        console.error('Lỗi cập nhật: ', e);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Mời nhập tên xe"
        label="Tên Xe"
        value={tenxeph44929}
        onChangeText={setedittenxe}
      />
      <TextInput
        placeholder="Mời nhập màu sắc"
        label="Màu Sắc"
        value={mausacph44929}
        onChangeText={seteditmausac}
      />
      <TextInput
        placeholder="Mời nhập Giá Bán"
        label="Giá Bán"
        value={giabanph44929.toString()}
        onChangeText={(text) => seteditgiaban(parseInt(text))}
      />
      <TextInput
        placeholder="Mời nhập Mô tả"
        label="Mô tả"
        value={mota}
        onChangeText={seteditmota}
      />
      <TextInput
        placeholder="Hình ảnh"
        label="Hình Ảnh"
        value={hinhanh}
        onChangeText={setedithinhanh}
      />
      <Button title="Cập nhật sản phẩm" onPress={handleUpdate} />
    </View>
  );
};

export default SuaSP;

const styles = StyleSheet.create({});
