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

  updateFood() {}
  filterFood() {}
}

export default FoodList;
