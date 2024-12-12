import { createSelector } from 'reselect';

export const selectHeroes = (state) => state.heroes.heroes || [];

export const selectTotalPage = createSelector(
  (state) => state.heroes.totalPage,
  (totalPage) => totalPage || []
);

export const selectLoading = createSelector(
  (state) => state.heroes.loading,
  (loading) => loading
);

export const selectError = createSelector(
  (state) => state.heroes.error,
  (error) => error
);

export const selectIsReady = createSelector(
  [selectLoading, selectError],
  (loading, error) => !loading && !error
);