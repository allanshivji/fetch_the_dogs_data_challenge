// import React from 'react';
// import { Dog } from '../types';
// import DogCard from './DogCard';

// interface DogListProps {
//   dogs: Dog[];
//   favorites: string[];
//   onFavorite: (dogId: string) => void;
// }

// const DogList: React.FC<DogListProps> = ({ dogs, favorites, onFavorite }) => {
//   return (
//     <div>
//       {dogs.map((dog) => (
//         <DogCard
//           key={dog.id}
//           dog={dog}
//           onFavorite={onFavorite}
//           isFavorite={favorites.includes(dog.id)}
//         />
//       ))}
//     </div>
//   );
// };

// export default DogList;