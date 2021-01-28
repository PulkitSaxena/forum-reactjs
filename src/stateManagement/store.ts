
import { createContext, Dispatch } from 'react';
import { Actions } from '../stateManagement/actions';
import { IInitialStore } from '../stateManagement/interfaces' 

interface IContextVal {
    state: IInitialStore;
    dispatch: Dispatch<Actions>;
  }

export const store = createContext({} as IContextVal);
