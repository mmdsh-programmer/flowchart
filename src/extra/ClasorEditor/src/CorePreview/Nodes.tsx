import React, { useState } from 'react';
import { IOutline } from '../Interface';
import { getEditorInstance } from '../Store';

const Nodes = (props: {
  list: IOutline[];
  activeId?: string;
  setActiveLink?: (id: string) => void;
}) => {
  const [shrink, setShrink] = useState<string[]>([]);
  const { list, setActiveLink, activeId } = props;
  const editorScrollInToView = (id: string) => {
    const editorInstance = getEditorInstance();
    const documentNode = editorInstance?.document?.$;
    documentNode?.getElementById(id)?.scrollIntoView();
  };

  return (
    <>
      {list.map((node) => (
        <li
          key={node.id}
          className={`${shrink.includes(node.id) ? '' : 'shrink'}`}
        >
          <button
            className={`${shrink.includes(node.id) ? '' : 'shrink'}`}
            onClick={(event) => {
              event.preventDefault();
              if (node.children.length) {
                if (shrink.includes(node.id)) {
                  setShrink([...shrink.filter((n) => n !== node.id)]);
                } else {
                  setShrink([...shrink, node.id]);
                }
              }
            }}
          >
            {node.children.length ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="256"
                height="256"
                viewBox="0 0 256 256"
              >
                <g transform="translate(128 128) scale(0.72 0.72)">
                  <g
                    style={{
                      stroke: 'none',
                      strokeWidth: '0',
                      strokeDasharray: 'none',
                      strokeLinecap: 'butt',
                      strokeLinejoin: 'miter',
                      strokeMiterlimit: 10,
                      fillRule: 'nonzero',
                      opacity: '1',
                    }}
                    transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)"
                  >
                    <path
                      d="M 2.15 41.551 L 84.455 1.167 c 3.131 -1.536 6.524 1.558 5.282 4.817 L 75.395 43.632 c -0.336 0.881 -0.336 1.854 0 2.735 l 14.342 37.648 c 1.241 3.259 -2.152 6.353 -5.282 4.817 L 2.15 48.449 C -0.717 47.043 -0.717 42.957 2.15 41.551 z"
                      style={{
                        stroke: 'none',
                        strokeWidth: '1',
                        strokeDasharray: 'none',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 10,
                        fillRule: 'nonzero',
                        opacity: '1',
                      }}
                      transform=" matrix(1 0 0 1 0 0) "
                      strokeLinecap="round"
                    />
                  </g>
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="256"
                height="256"
                viewBox="0 0 256 256"
              >
                <g transform="translate(128 128) scale(0.72 0.72)">
                  <g
                    style={{
                      stroke: 'none',
                      strokeWidth: '0',
                      strokeDasharray: 'none',
                      strokeLinecap: 'butt',
                      strokeLinejoin: 'miter',
                      strokeMiterlimit: 10,
                      fillRule: 'nonzero',
                      opacity: '1',
                    }}
                    transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)"
                  >
                    <circle
                      cx="45"
                      cy="45"
                      r="45"
                      style={{
                        stroke: 'none',
                        strokeWidth: '1',
                        strokeDasharray: 'none',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 10,
                        fillRule: 'nonzero',
                        opacity: '1',
                      }}
                      transform="  matrix(1 0 0 1 0 0) "
                    />
                  </g>
                </g>
              </svg>
            )}
          </button>
          <a
            className={`clasor-link ${activeId === node.id ? 'active' : ''}`}
            href={`#${node.id}`}
            onClick={() => {
              setActiveLink?.(node.id);
              editorScrollInToView(node.id);
            }}
          >
            {node.text}
          </a>
          {node.children.length ? (
            <>
              <ul className="clasor-list child">
                <Nodes
                  list={node.children}
                  activeId={activeId}
                  setActiveLink={setActiveLink}
                />
              </ul>
            </>
          ) : null}
        </li>
      ))}
    </>
  );
};

export default React.memo(Nodes);
