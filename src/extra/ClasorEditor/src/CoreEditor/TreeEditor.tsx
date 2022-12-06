import React, { Ref, useImperativeHandle, useState } from 'react';
import Tree from '../CorePreview/Tree';
import { IOutline } from '../Interface';
import { getValue, setValue } from '../Store';
import { extractHeaders } from './Func';

export interface IRefTreeEditor {
  generate: () => void;
}

const TreeEditor = (_props: any, ref: Ref<IRefTreeEditor>) => {
  const [outline, setOutline] = useState<IOutline[]>([]);

  useImperativeHandle(ref, () => ({
    generate: generate,
  }));

  const generate = () => {
    let content = getValue('content') || '';
    const outline = extractHeaders(content);
    setOutline(outline);
    setValue('outline', JSON.stringify(outline));
  };

  return <Tree list={outline}></Tree>;
};

export default React.forwardRef(TreeEditor);
