//Danh sách sản phẩm
function SanPhamService(){
    //lấy danh sách sp
    this.layDanhSachSP = function(){
        var promise = axios({
            method: 'get',
            url: 'https://636e0829182793016f342cf4.mockapi.io/Products',
          });
        return promise;
        

    }
    this.themSP = function (spNew) {
        var promise= axios({
            method: 'post',
            url: 'https://636e0829182793016f342cf4.mockapi.io/Products',
            data:spNew
          });

         return promise
    }
    this.XoaSP = function (id) {
        return axios({
            method: 'delete',
            url: `https://636e0829182793016f342cf4.mockapi.io/Products/${id}`,
          });
    }
    this.layChiTietSP = function(id){
        return axios({
            method: 'get',
            url: `https://636e0829182793016f342cf4.mockapi.io/Products/${id}`,
          });
    }
    this.capNhatSP = function(id, newData){
        return axios({
            method: 'put',
            url: `https://636e0829182793016f342cf4.mockapi.io/Products/${id}`,
            data: newData
          });
    }

}