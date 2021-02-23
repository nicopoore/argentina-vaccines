import React, { createContext } from 'react';

export const SelectionContext = createContext('CABA');

const SelectionContextProvider: React.FC<{ selectedProvince: string }> = props => {
  return (
    <SelectionContext.Provider value={props.selectedProvince}>
      {props.children}
    </SelectionContext.Provider>
  );
};

export default SelectionContextProvider;
