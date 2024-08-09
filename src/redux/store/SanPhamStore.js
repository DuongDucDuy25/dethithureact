import { configureStore } from "@reduxjs/toolkit";
import SanPhamReducer from "../reducer/SanPhamReducer";

export default configureStore({
    reducer :{
        sanpham : SanPhamReducer
    }
});