class Food {
  constructor(
    _id,
    _name,
    _type,
    _price,
    _promotion,
    _status,
    _image,
    _description
  ) {
    this.id = _id;
    this.name = _name;
    this.type = _type;
    this.price = _price;
    this.promotion = _promotion;
    this.status = _status;
    this.image = _image;
    this.description = _description;
    this.pricePromotion = 0;
  }

  calcPricePromotion() {
    this.pricePromotion = (this.price * (100 - this.promotion)) / 100;
  }
}

export default Food;
