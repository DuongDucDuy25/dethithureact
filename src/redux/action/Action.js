import { createAsyncThunk } from "@reduxjs/toolkit";
import {addSanPham} from '../reducer/SanPhamReducer';


// link api 
const API_URL = "https://6660354b5425580055b2ca1e.mockapi.io/sanpham";

// hiển thị sản phẩm
export const fetchSanPham = () =>{
    return async dispatch =>{
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            data.forEach(row => {
                dispatch(addSanPham(row));
            });
        } catch (error) {
            console.log('Lỗi : ' + error);
            
        }
    }
};

// delete sản phẩm 
export const deleteSanPhamAPI = createAsyncThunk('sanpham,deleteSanPhamAPI',
    async (id,thunkAPI) => {
        try {
            // gửi yêu cầu delete đến API để xóa 
            const res = await fetch(`${API_URL}/${id}`,{
                method : 'DELETE'
            });
            // log ra res 
            if (res.ok) {
                // sau khi xóa thành công , trả về id của sản phẩm đã xóa để cập nhật 
                // action.payload ở trong reducer sẽ chính là id 
                return id;
            }
            else{
                const errorData = await res.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (e) {
            // xử lí lỗi nếu có bất kì lỗi nào xảy ra 
            return thunkAPI.rejectWithValue(e)
        }
    }
);


// thêm sản phẩm 
export const addSanPhamAPI = createAsyncThunk(
    'sanpham,addSanPhamAPI',
    async (objSanPham,thunkAPI) =>{
        console.log(objSanPham);
        try {
            // gửi yêu cầu add đến API 
            const res = await fetch(API_URL,{
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(objSanPham)
            });
            const data = await res.json();
            if (res.ok) {
                return data;
            } else {
                // nếu có lỗi từ phía server , trả về lỗi 
                const errorData = await res.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (e) {
            // xử lý nếu có bất kì lỗi nào xảy ra 
            return thunkAPI.rejectWithValue(e);
        }
        
    }
);

// update sản phẩm 
export const updateSanPhamAPI = createAsyncThunk(
    'sanpham,updateSanPhamAPi',
    async (objUpdate,thunkAPI) =>{
        try {
            const res = await fetch(`${API_URL}/${objUpdate.id}`,{
                method : 'PUT',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(objUpdate.data)
            });
            const data = await res.json();
            if (res.ok) {
                return data;
            } else {
                const errorData = await res.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (e) {
            // xử lí lỗi nếu có bất kỳ lỗi nào xảy ra 
            return thunkAPI.rejectWithValue(e)
        }
    }
);