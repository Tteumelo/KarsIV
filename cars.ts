export interface Car {
  id: string;
  name: string;
  image: any; 
}

export const cars: Car[] = [
  {
    id: '1',
    name: 'Ferrari',
    image: require('assets/ferrari.png')
  },
  {
    id: '2',
    name: 'Porsche 911',
    image: require('assets/porsche.png')
  },
  {
    id: '3',
    name: 'Lamborghini Huracán',
    image: require('assets/lamborghini.png')
  },
  {
    id: '4',
    name: 'BMW',
    image: require('assets/bmw.png')
  }
];
