export type Car = {
  id: string;
  name: string;
  image: any;
  fipeMarca: string;
  fipeModelo: string;
};

export const cars: Car[] = [
  {
    id: '1',
    name: 'Ferrari 488 GTB',
    image: require('assets/ferrari.png'),
    fipeMarca: 'Ferrari',
    fipeModelo: '488 GTB 3.9 V8 Bi-Turbo'
  },
  {
    id: '2',
    name: 'Porsche 911 Carrera',
    image: require('assets/porsche.png'),
    fipeMarca: 'Porsche',
    fipeModelo: '911 Carrera 3.0 (991)'
  },
  {
    id: '3',
    name: 'BMW 320i Sport GP',
    image: require('assets/bmw.png'),
    fipeMarca: 'BMW',
    fipeModelo: '320i 2.0 16V Turbo Flex Sport GP'
  },
  {
    id: '4',
    name: 'Lamborghini Huracan',
    image: require('assets/lamborghini.png'),
    fipeMarca: 'Lamborghini',
    fipeModelo: 'Huracan LP 610-4 5.2 V10'
  }
];
