import React from 'react';
import { IOutline } from '../Interface';
import Nodes from './Nodes';

declare interface IProps {
  list: IOutline[];
  shrink?: boolean;
  setActiveLink?: (id: string) => void;
  activeId?: string;
}

const Tree = (props: IProps) => {
  const { list, shrink, activeId, setActiveLink } = props;

  return (
    <nav className={shrink ? 'shrink' : ''}>
      <ul>
        <Nodes list={list} activeId={activeId} setActiveLink={setActiveLink} />
      </ul>
    </nav>
  );
};

export default React.memo(Tree);
