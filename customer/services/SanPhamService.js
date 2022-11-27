//Danh sách sản phẩm

function SanPhamService(){

    this.layDanhSachSP = function (){
        return axios({
            method: 'get',
            url: 'https://636e0829182793016f342cf4.mockapi.io/Products',
          });
    }
}