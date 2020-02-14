import { ACTION_INCREMENT_LOADER_COUNT, ACTION_DECREMENT_LOADER_COUNT } from './Loader.constants';

export const incrementLoaderCount = () => ({
  type: ACTION_INCREMENT_LOADER_COUNT,
});

export const decrementLoaderCount = () => ({
  type: ACTION_DECREMENT_LOADER_COUNT,
});
