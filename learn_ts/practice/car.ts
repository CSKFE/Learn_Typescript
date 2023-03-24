{
  interface Car {
    readonly price: number;
    readonly color: string;
    readonly carSerial: number;
    isColorChange?: boolean;
    isOptions: {
      otherOptions: boolean,
      sheet: CarSheets,
    };
  }

  interface CarMaker {
    makeCar(): Car;
  }

  interface CarColorChange {
    changeColor(car: Car): Car;
  }

  interface CarPrice {
    addPrice(car: Car): Car;
  }

  interface CarSheets {
    normalSheet: boolean,
    rader?: boolean;
    thermicRays?: boolean;
    ventilation?: boolean;
    transmission?: boolean;
    memorySheet?: boolean;
  }
  
  class CarMakeFactory implements CarMaker {
    private carSeial: number = 0;
    private price:number = 1_000_000;
    private isOptions = {
      options: false,
      sheet: {
        normalSheet: true,
      },
    };
    protected color = 'black';

    constructor(
      private colorChange: CarColorChange,
      ) {}

    private assembleCar() {
      console.log('자동차를 조립하고있습니다.');
    }

    makeNormalCar():Car {
      this.assembleCar();
      return {
        carSerial: ++(this.carSeial),
        price: this.price,
        color: this.color,
        isOptions: {
          otherOptions: false,
          sheet: {
            normalSheet: true,
          }
        }
      }
    }

    makeCar(): Car {
      const car = this.makeNormalCar();
      return this.colorChange.changeColor(car);
    }
  }

  class CarColorChangeProcess implements CarColorChange{
    constructor(private color: string) {
      this.color = color;
    }

    changeColor(car: Car): Car {  
      const addPrice = new AddCarPrice();
      const colorCar = {
        ...car,
        color: this.color,
        isColorChange: true,
      };
      return addPrice.addPrice(colorCar);
    }
  }

  class noColorChange implements CarColorChange{
    constructor() {}

    changeColor(car: Car):Car {
      return {
        ...car,
      }
    }
  }

  class AddCarPrice implements CarPrice {
    addPrice(car: Car): Car {
      const carCopy = {...car};
      carCopy.price += 1_000_000;
      return {
        ...carCopy
      }
    }
  }

  // color change instance
  const redColor = new CarColorChangeProcess('red');
  const yellowColor = new CarColorChangeProcess('yellow');
  const noChangeColor = new noColorChange();

  const normalCarFactory = new CarMakeFactory(noChangeColor);
  const redCarFactory = new CarMakeFactory(redColor);
  const yellowCarFactory = new CarMakeFactory(yellowColor);

  const normalCar = normalCarFactory.makeCar();
  const redCar = redCarFactory.makeCar();
  const yellowCar = yellowCarFactory.makeCar();

  console.log(normalCar);
  console.log(redCar);
  console.log(yellowCar);
}