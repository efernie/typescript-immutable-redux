import { Reducer, ReducersMapObject } from 'redux';

export type combineReducers = <S, I>(reducers: ReducersMapObject, getDefaultState: () => I) => Reducer<S>;
