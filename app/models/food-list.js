class FoodList {
  constructor() {
    this.arr = [];
  }

  addFood(food) {
    this.arr.push(food);
  }

  findIndexFood(id) {
    // Tim vị trí của món ăn trong mảng arr theo id
    let index = -1;
    for (let i = 0; i < this.arr.length; i++) {
      const food = this.arr[i];
      if (food.id === id) {
        index = i;
        break; // tìm thấy thì dừng vòng lặp
      }
    }
    return index;
  }

  removeFood(id) {
    const index = this.findIndexFood(id);

    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }

  getFoodById(id) {
    const index = this.findIndexFood(id);
    if (index !== -1) {
      // tìm thấy food
      return this.arr[index];
    }

    return null;
  }

  updateFood(food) {
    const index = this.findIndexFood(food.id);

    if (index !== -1) {
      this.arr[index] = food;
    }
  }

  filterFood(type) {
    /**
     *  0. Tạo ra mảng filter = [];
        1. Duyệt qua mảng arr
            1.1 lấy food = arr[i]
            1.2 Kiểm tra food.type trùng với type
                => true => Thêm food tìm thấy vào mảng filter
        2. trả mảng filter
     */
    if (type === "all") {
      return this.arr;
    }

    let arrFiltered = [];
    for (let i = 0; i < this.arr.length; i++) {
      const food = this.arr[i];
      if (food.type === type) {
        arrFiltered.push(food);
      }
    }
    return arrFiltered;
  }

  searchFood(keyword) {
    /**
     *  0. Tạo ra mảng findFoods = [];
        1. Duyệt qua mảng arr
          1.1 lấy food = arr[i]
          1.2 Kiểm tra food.name trùng với keyword
          => true => Thêm food tìm thấy vào mảng findFoods

        2. trả mảng findFoods
     */
    let findFoods = [];

    for (let i = 0; i < this.arr.length; i++) {
      const food = this.arr[i];
      // Chuyển food.name thành chữ viết thường
      const nameLowerCase = food.name.toLowerCase();
      // Chuyển keyword thành chữ viết thường
      const keywordLowerCase = keyword.toLowerCase();

      const index = nameLowerCase.indexOf(keywordLowerCase);
      if (index !== -1) {
        findFoods.push(food);
      }
    }

    return findFoods;
  }
}

export default FoodList;
