import Food from "./../models/food.js";
import FoodList from "./../models/food-list.js";
import Validation from "./../controllers/validation.js";
// tạo đối tượng foodList từ lớp đối tượng FoodList
const foodList = new FoodList();
const validation = new Validation();
export const getEle = (id) => {
  return document.getElementById(id);
};

const getValue = () => {
  // Lấy thông tin từ người dùng
  const id = getEle("foodID").value;
  const name = getEle("tenMon").value;
  const type = getEle("loai").value;
  const price = getEle("giaMon").value;
  const promotion = getEle("khuyenMai").value;
  const status = getEle("tinhTrang").value;
  const image = getEle("hinhMon").value;
  const description = getEle("moTa").value;

  // tạo flag (cờ)
  let isValid = true;

  /**
   * Validation
   */
  isValid &= validation.checkEmpty(id, "invalidID", "(*) Vui Long Nhap ID Mon An") && validation.checkIDExist(id, "invalidID", "(*) Vui Long Nhap ID Hop Le", foodList.arr);  //&= So sanh xong rồi mới gán giá trị, thoả 2 điều kiện mới đúng
  isValid &= validation.checkEmpty(name, "invalidTen", "(*) Vui Long Nhap Ten Mon An") && validation.checkString(name, "invalidTen", "(*) Vui Long Nhap Ten Mon An Hop Le") && validation.checkCharacterLength(name, "invalidTen", "(*) Ten mon an tu 2-8 ky tu");
  // Nếu isValid là false => stop
  if (!isValid) return;

//Kiem tra loai mon an
isValid &= validation.checkSelectOption(
  "loai",
  "invalidLoai",
  "(*) Vui long chon loai mon an"
)

  // Tạo đối tượng food từ lớp đối tượng Food
  const food = new Food(
    id,
    name,
    type,
    price,
    promotion,
    status,
    image,
    description
  );
  // Gọi phương thức calcPricePromotion() để tính giá khuyến mãi
  food.calcPricePromotion();

  return food;
};

const renderFoodList = (data) => {
  /**
   * Hiển thị danh sách món ăn
   * 0. Tạo biến contentHTML = ""
     1. Duyệt qua mảng arr
        1.1. lấy được food từ mảng arr (food = arr[i]) 
        1.2. Tạo dòng & cột => Tích luỹ vào contentHTML
            contentHTML += `
                <tr>
                    <td></td>
                </tr>
            `
    2. Dom tới tbody gán contenHTML vào
   */
  let contentHTML = "";
  for (let i = 0; i < data.length; i++) {
    const food = data[i];
    contentHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${food.id}</td>
        <td>${food.name}</td>
        <td>${food.type === "loai1" ? "Chay" : " Mặn"}</td>
        <td>${food.price}</td>
        <td>${food.promotion}</td>
        <td>${food.pricePromotion}</td>
        <td>${food.status == "0" ? "Hết" : "Còn"}</td>
        <td>
          <button class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onclick="onEditFood('${food.id
      }')">Edit</button>
          <button class="btn btn-danger" onclick="onDeleteFood('${food.id
      }')">Delete</button>
        </td>
      </tr>    
    `;
  }
  getEle("tbodyFood").innerHTML = contentHTML;
};

/**
 * clear data form
 */
const resetForm = () => {
  getEle("foodForm").reset();
};

/**
 * Click thêm món ăn => Hiển thị modal => Cập nhật ẩn
 */
getEle("btnThem").onclick = function () {
  // Ẩn nút cập nhật
  getEle("btnCapNhat").style.display = "none";

  // Hiển thị tiêu đề modal
  getEle("exampleModalLabel").innerHTML = "Thêm món ăn";

  // Hiển thị nút Thêm
  getEle("btnThemMon").style.display = "block";

  // enable foodID
  getEle("foodID").disabled = false;

  //Clear Form
  resetForm();
};

/**
 * Cập Nhật món ăn
 */
getEle("btnCapNhat").onclick = function () {
  // Gọi phương thức addFood() để thêm món ăn vào danh sách
  const food = getValue();

  // Cập nhật thông tin món ăn
  foodList.updateFood(food);

  // close Modal
  document.getElementsByClassName("close")[0].click();

  // Render lai ds
  renderFoodList(foodList.arr);

  // Lưu data mới xuống localStorage
  setLocalStorage(foodList.arr);
};

/**
 * Hàm xử lý sự kiện sửa món ăn
 */
const onEditFood = (id) => {
  // Cập nhật tiêu đề của Modal
  getEle("exampleModalLabel").innerHTML = "Sửa món ăn";

  // Ẩn nút "Thêm"
  getEle("btnThemMon").style.display = "none";

  // Hiện nút cập nhật
  getEle("btnCapNhat").style.display = "block";

  // lấy thông tin chi tiết của món ăn muốn sửa
  const food = foodList.getFoodById(id);
  if (food) {
    // Dom tới các thẻ input trên modal => show data của food
    getEle("foodID").value = food.id;
    // Dom tới foodID => disabled
    getEle("foodID").disabled = true;

    getEle("tenMon").value = food.name;
    getEle("loai").value = food.type;
    getEle("giaMon").value = food.price;
    getEle("khuyenMai").value = food.promotion;
    getEle("tinhTrang").value = food.status;
    getEle("hinhMon").value = food.image;
    getEle("moTa").value = food.description;
  }
};
window.onEditFood = onEditFood;

/**
 * Hàm xử lý sự kiện xóa món ăn
 */
const onDeleteFood = (id) => {
  foodList.removeFood(id);
  // Gọi hàm renderFoodList() để hiển thị danh sách món ăn
  renderFoodList(foodList.arr);
  // Lưu dữ liệu vào localStorage
  setLocalStorage(foodList.arr);
};
// Khai báo onDeleteFood ra đối tượng window
window.onDeleteFood = onDeleteFood;

/**
 *
 * Lưu dữ liệu vào localStorage (browser)
 */
const setLocalStorage = (data) => {
  // Chuyển đổi mảng thành string
  const dataString = JSON.stringify(data);
  localStorage.setItem("FOOD_LIST", dataString);
};

/**
 * Lấy dữ liệu từ localStorage
 */
const getLocalStorage = (key) => {
  const dataString = localStorage.getItem(key);

  // Nếu không có dữ liệu thì trả về
  if (!dataString) return;

  // Chuyển đổi string thành mảng
  const dataJson = JSON.parse(dataString);
  // gán dữ liệu vào mảng arr của foodList
  foodList.arr = dataJson;
  // Gọi hàm renderFoodList() để hiển thị danh sách món ăn
  renderFoodList(foodList.arr);
};

getLocalStorage("FOOD_LIST");

/**
 * Add Food
 */
getEle("btnThemMon").onclick = function () {
  // Gọi phương thức addFood() để thêm món ăn vào danh sách
  const food = getValue();

  if (!food) return;

  foodList.addFood(food);

  // Gọi hàm renderFoodList() để hiển thị danh sách món ăn
  renderFoodList(foodList.arr);

  // Lưu dữ liệu vào localStorage
  setLocalStorage(foodList.arr);

  // close modal
  // document.getElementsByClassName("close")[0].click();
};

/**
 * Filter món ăn
 */
// Callback function: Hàm có tham số truyền là 1 hàm khác
getEle("selLoai").addEventListener("change", () => {
  const type = getEle("selLoai").value;

  // gọi tới phương thức filterFood(type)
  const arrFiltered = foodList.filterFood(type);

  // render list
  renderFoodList(arrFiltered);
});

/**
 * Tìm kiếm món ăn
 */
getEle("keyword").addEventListener("keyup", () => {
  const keyword = getEle("keyword").value;

  const findFoods = foodList.searchFood(keyword);

  renderFoodList(findFoods);
});
