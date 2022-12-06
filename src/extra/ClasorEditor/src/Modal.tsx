import React from 'react';
import ReactDOM from 'react-dom';

export const ClasorModal = (props: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: JSX.Element;
  size?: 'MEDIUM' | 'FULL';
}) => {
  const { open, children, title, onClose, size } = props;
  const node = document.getElementsByClassName('clasor-portal')[0];
  if (!open || !node) return null;
  return ReactDOM.createPortal(
    <div
      className="clasor-modal"
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 10000,
        background: '#00000052',
        left: 0,
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
      }}
      onClick={onClose}
    >
      <div
        className="clasor-dialog-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="clasor-dialog-content"
          style={{
            margin: 'auto',
            width: size === 'MEDIUM' ? '450px' : 'calc(100vw - 20px)',
            height: size === 'MEDIUM' ? 'auto' : 'calc(100vh - 5px)',
            maxHeight: '100%',
            maxWidth: '100%',
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            padding: '60px 30px 25px 30px',
            marginTop: '15px',
            borderRadius: '4px',
            position: 'relative',
            justifyContent: 'flex-end',
          }}
        >
          {children}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '15px 20px',
              borderBottom: '1px solid #c7c7c7',
            }}
          >
            <p
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                margin: 0,
              }}
            >
              {title}
            </p>
            <button
              style={{
                width: '25px',
                height: '25px',
                background: 'transparent',
                border: '1px solid #a5a5a5',
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              className="clasor-dialog-close-btn"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 256 256"
              >
                <desc>Created with Fabric.js 1.7.22</desc>
                <defs></defs>
                <g transform="translate(128 128) scale(0.72 0.72)">
                  <g
                    style={{
                      stroke: 'none',
                      strokeWidth: '0',
                      strokeDasharray: 'none',
                      strokeLinecap: 'butt',
                      strokeLinejoin: 'miter',
                      strokeMiterlimit: 10,
                      fill: 'red',
                      fillRule: 'nonzero',
                      opacity: '1',
                    }}
                    transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)"
                  >
                    <path
                      d="M 10.439 88.498 l -8.937 -8.937 c -2.003 -2.003 -2.003 -5.251 0 -7.254 L 72.307 1.502 c 2.003 -2.003 5.251 -2.003 7.254 0 l 8.937 8.937 c 2.003 2.003 2.003 5.251 0 7.254 L 17.693 88.498 C 15.69 90.501 12.443 90.501 10.439 88.498 z"
                      style={{
                        stroke: 'none',
                        strokeWidth: '1',
                        strokeDasharray: 'none',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 10,
                        fill: 'red',
                        fillRule: 'nonzero',
                        opacity: '1',
                      }}
                      transform=" matrix(1 0 0 1 0 0) "
                      strokeLinecap="round"
                    />
                    <path
                      d="M 72.307 88.498 L 1.502 17.693 c -2.003 -2.003 -2.003 -5.251 0 -7.254 l 8.937 -8.937 c 2.003 -2.003 5.251 -2.003 7.254 0 l 70.804 70.804 c 2.003 2.003 2.003 5.251 0 7.254 l -8.937 8.937 C 77.557 90.501 74.31 90.501 72.307 88.498 z"
                      style={{
                        stroke: 'none',
                        strokeWidth: '1',
                        strokeDasharray: 'none',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 10,
                        fill: 'red',
                        fillRule: 'nonzero',
                        opacity: '1',
                      }}
                      transform=" matrix(1 0 0 1 0 0) "
                      strokeLinecap="round"
                    />
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>,
    node
  );
};
