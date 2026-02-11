export const initialStore=()=>{
  return{
    favorites: [],
    readLater: [],
    people: [],
    vehicles: [],
    planets: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'SET_PEOPLE':
      return {
        ...store,
        people: action.payload
      };

    case 'SET_VEHICLES':
      return {
        ...store,
        vehicles: action.payload
      };

    case 'SET_PLANETS':
      return {
        ...store,
        planets: action.payload
      };

    case 'ADD_FAVORITE':
      const itemExists = store.favorites.find(
        fav => fav.uid === action.payload.uid && fav.type === action.payload.type
      );
      if (itemExists) {
        return store;
      }
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case 'REMOVE_FAVORITE':
      return {
        ...store,
        favorites: store.favorites.filter(
          fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
        )
      };

    case 'ADD_READ_LATER':
      const readLaterExists = store.readLater.find(
        item => item.uid === action.payload.uid && item.type === action.payload.type
      );
      if (readLaterExists) {
        return store;
      }
      return {
        ...store,
        readLater: [...store.readLater, action.payload]
      };

    case 'REMOVE_READ_LATER':
      return {
        ...store,
        readLater: store.readLater.filter(
          item => !(item.uid === action.payload.uid && item.type === action.payload.type)
        )
      };

    default:
      throw Error('Unknown action.');
  }
}
