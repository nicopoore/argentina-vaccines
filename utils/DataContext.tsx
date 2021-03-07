import React, { createContext } from 'react';
import { VaccineDataItem } from './types';

export const DataContext = createContext(undefined);

const DataContextProvider: React.FC<{ data: VaccineDataItem[] | undefined }> = props => {
  return <DataContext.Provider value={props.data}>{props.children}</DataContext.Provider>;
};

export default DataContextProvider;
