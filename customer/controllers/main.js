const spService = new SanPhamService();
var productList = [];
var cartSP = [];

function getELE(id) {
  return document.getElementById(id);
}

function setLocalStorage() {
  localStorage.setItem("cartSP", JSON.stringify(cartSP));
}
function getLocalStorage() {
  if (localStorage.getItem("cartSP") != null) {
    cartSP = JSON.parse(localStorage.getItem("cartSP"));
  }
}
// getLocalStorage();

function layDanhSachSanPham() {
  spService
    .layDanhSachSP()
    .then(function (result) {
      //Hiển thị lên UI
      hienThiUI(result.data);
      productList = result.data;
      // hienThiDashboard(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
layDanhSachSanPham();

function hienThiUI(mangSP) {
  var content = "";
  // console.log(mangSP)
  mangSP.map(function (sp) {
    content += `
            <div class="product__item col py-2">
              <div class="product__bg">
                <div class="product__img">
                <img src="${sp.img}" alt="">
                  <div class="product__overlay">
                    <div>${sp.desc}</div>
                  </div>
                </div>
                <div class="product__text">
                  <h2 class="product__name"><b>${sp.name}</b></h2>
                  <h4 class="product__price"><b>$${sp.price}</b></h4>
                  <p>Camera trước: ${sp.frontCamera}</p>
                  <p>${sp.backCamera}</p>
                </div>
                <button class="btn-buy" onclick="themGioHang(${sp.id})" id="addCart">THÊM VÀO GIỎ HÀNG</button>
              </div>
            </div>
    `;
  });
  document.querySelector("#product-list").innerHTML = content;
}
getELE("cart-btn-mobile").onclick = function () {
  getLocalStorage();
  hienThiGioHang();
  tinhTien();
};

getELE("cart-btn-laptop").onclick = function () {
  getLocalStorage();
  hienThiGioHang();
  tinhTien();
};

function hienThiGioHang() {
  var cartContent = `<thead>
  <tr>
  <th scope="col text-center">Hình ảnh</th>
  <th scope="col text-center">Tên sản phẩm</th>
  <th scope="col text-center " >Số lượng</th>
  <th scope="col text-center">Giá</th>
  <th scope="col text-center"></th>
  </tr>
</thead>`;

  if (cartSP.length == 0) {
    cartContent = "Dường như giỏ hàng của bạn đang trống";
    getELE("pay").disabled = true;
  } else {
    cartSP.map(function (sp) {
      cartContent += `
      <tbody>
                <tr >
                <td><img src="${sp.sanPham.img}" class="w-75" alt=""></td>
                <td>${sp.sanPham.name}</td>
                <td class="plus-btn">
                    <input type="button" value="-" class="button-minus border rounded-circle  icon-shape icon-sm mx-1" data-field="quantity" onclick=giamSoLuong("${
                      sp.sanPham.id
                    }")>
                    <input step="1" min="1" value="${
                      sp.soLuong
                    }" name="quantity" class="quantity-field border-0 text-center w-50 ">
                    <input type="button" value="+" class="button-plus border rounded-circle icon-shape icon-sm" data-field="quantity" onclick=tangSoLuong("${
                      sp.sanPham.id
                    }")>
                </td>
                <td>${Number(sp.sanPham.price).toLocaleString()}$</td>
                <td><button type="button" class="btn btn-danger" onclick=xoaSP("${
                  sp.sanPham.id
                }")>Xoá</button></td>
                </tr>
            </tbody>
      `;
    });
    getELE("pay").disabled = false;
  }
  document.querySelector(".table-striped").innerHTML = cartContent;
}

function locSanPham() {
  var mangLoc = [];
  var loc = getELE("locSP").value;

  spService
    .layDanhSachSP()
    .then(function (result) {
      result.data.map(function (sp) {
        if (loc == sp.type) {
          mangLoc.push(sp);
          hienThiUI(mangLoc);
        } else if (loc == "all") {
          layDanhSachSanPham();
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function themGioHang(id) {
  var viTri = timViTriSPGioHang(id);
  if (viTri > -1) {
    cartSP[viTri].soLuong++;
  } else {
    sp = new SanPhamCart(productList[timViTri(id)], 1);
    cartSP.push(sp);
  }
  setLocalStorage();
  // tangDonViDem();
  alert("Thêm vào giỏ hàng thành công!");
}

// function tangDonViDem(){
//   var countCart = 0;
//   countCart++;

// document.querySelector("count-cart").innerHTML = countCart;
// }

// getELE("addCart").onclick= function () {
//   tangDonViDem();
// }

function tinhTien() {
  var tongTien = 0;
  cartSP.map(function (sp) {
    tongTien += sp.sanPham.price * sp.soLuong;
  });
  getELE("tongTien").innerHTML = tongTien.toLocaleString() + "$";
}

function xoaSP(id) {
  cartSP.splice(timViTriSPGioHang(id), 1);
  hienThiGioHang();
  tinhTien();
}

function tangSoLuong(id) {
  cartSP[timViTriSPGioHang(id)].soLuong++;
  hienThiGioHang();
  tinhTien();
}

function giamSoLuong(id) {
  if (cartSP[timViTriSPGioHang(id)].soLuong > 1) {
    cartSP[timViTriSPGioHang(id)].soLuong--;
    hienThiGioHang();
    tinhTien();
  }
}

function thanhToan() {
  cartSP = [];
  setLocalStorage();
  alert("Thanh toán thành công!");
  document.querySelector("#close").click();
}

function timViTri(id) {
  return productList.findIndex(function (sanPham) {
    return sanPham.id == id;
  });
}

function timViTriSPGioHang(id) {
  return cartSP.findIndex(function (sanPhamCart) {
    return sanPhamCart.sanPham.id == id;
  });
}
