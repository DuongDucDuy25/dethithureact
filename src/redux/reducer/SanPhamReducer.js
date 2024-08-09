import { createSlice } from "@reduxjs/toolkit";
import { addSanPhamAPI,deleteSanPhamAPI,updateSanPhamAPI } from "../action/Action";

const initialState = {
    listSanPham : [],
};

const sanphamSlice = createSlice({
    name : 'sanpham',
    initialState,
    reducers:{
        setSanPham(state,action){
            state.listSanPham = action.payload;
        },
        addSanPham(state,action){
            state.listSanPham.push(action.payload);
        },
        deleteSanPham(state,action){
            state.listSanPham = state.listSanPham.filter(item=>item.id !== action.payload);
        },
        updateSanPham(state,action){
            const index = state.listSanPham.findIndex(item => item.id === action.payload );
            if (index !== -1) {
                state.listSanPham[index] = action.payload;
            }
        }
    }, 
    extraReducers: builder =>{
        // xử lí khi API xóa thành công 
        builder.addCase(deleteSanPhamAPI.fulfilled,(state,action)=>{
            state.listSanPham = state.listSanPham.filter(row => row.id !== action.payload);
        })
        .addCase(deleteSanPhamAPI.rejected,(state,action)=>{
            console.log('xóa không thành công ', action.error.message);
            
        });

        // xử lí API thêm thành công 
        builder.addCase(addSanPhamAPI.fulfilled,(state,action)=>{
            state.listSanPham.push(action.payload);
        })
        .addCase(addSanPhamAPI.rejected,(state,action)=>{
            console.log('Thêm không thành công' , action.error.message);
            
        });

        // xử lí khi API cập nhật thành công 
        builder.addCase(updateSanPhamAPI.fulfilled,(state,action)=>{
            const {id,tenxeph44929,mausacph44929,giabanph44929,mota,hinhanh} = action.payload;
            const sanpham = state.listSanPham.find(row=>row.id === id);
            if (sanpham) {
                Object.assign(sanpham,{tenxeph44929,mausacph44929,giabanph44929,mota,hinhanh});
            }
        })
        .addCase(updateSanPhamAPI.rejected,(state,action)=>{
            console.log('Sửa thất bại' , action.error.message);
            
        });
    },
});

export const {setSanPham,addSanPham,deleteSanPham,updateSanPham} = sanphamSlice.actions;
export const selectListSanPham = (state) => state.sanpham.listSanPham;
export default sanphamSlice.reducer;