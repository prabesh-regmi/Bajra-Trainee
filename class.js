class Rectangle {
    constructor() {}
    static getDescription() {
      return 'I have 4 sides';
    }
  }
  
  class Square extends Rectangle {
    constructor() {
      super()
    }
    static getDescription() {
      return super.getDescription() + ' which are all equal';
    }
  }
  console.log(Square.getDescription())