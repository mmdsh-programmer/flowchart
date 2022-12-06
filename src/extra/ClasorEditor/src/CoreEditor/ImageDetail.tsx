import React from 'react';
import { EImageAlign } from '../Enum';
import { IImageProps } from '../Interface';

interface IProps {
  setImageProperties: (properties: IImageProps) => void;
  properties: IImageProps;
}

const ImageDetail = (props: IProps) => {
  const { setImageProperties, properties } = props;
  return (
    <div className="clasor-image-properties">
      <h3>مشخصات تصویر</h3>
      <div
        style={{
          display: 'flex',
          padding: '15px 0',
          flexDirection: 'column',
        }}
      >
        <label>متن جایگزین</label>
        <input
          className="clasor-input"
          onChange={(event) =>
            setImageProperties({
              ...properties,
              alt: event.target.value,
            })
          }
        />
      </div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            display: 'flex',
            paddingBottom: '15px',
            flexDirection: 'column',
            marginLeft: '5px',
          }}
        >
          <label>طول</label>
          <input
            className="clasor-input"
            type="number"
            onChange={(event) =>
              setImageProperties({
                ...properties,
                height: +event.target.value.replace(/[^0-9]/g, ''),
              })
            }
          />
        </div>
        <div
          style={{
            display: 'flex',
            paddingBottom: '15px',
            flexDirection: 'column',
          }}
        >
          <label>عرض</label>
          <input
            type="number"
            className="clasor-input"
            onChange={(event) =>
              setImageProperties({
                ...properties,
                width: +event.target.value.replace(/[^0-9]/g, ''),
              })
            }
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          paddingBottom: '15px',
          flexDirection: 'column',
        }}
      >
        <label style={{ width: '100%' }}>چینش</label>
        <div className="image-alignment">
          <div
            style={{
              display: 'flex',
              width: '100%',
            }}
          >
            <div className="input-wrapper">
              <input
                type="radio"
                id="noneAlign"
                name="imageAlign"
                value={EImageAlign.NONE}
                onChange={() =>
                  setImageProperties({
                    ...properties,
                    alignment: EImageAlign.NONE,
                  })
                }
              />
              <label htmlFor="noneAlign">هیچکدام</label>
            </div>
            <div className="input-wrapper">
              <input
                type="radio"
                id="rightAlign"
                name="imageAlign"
                value={EImageAlign.RIGHT}
                onChange={() =>
                  setImageProperties({
                    ...properties,
                    alignment: EImageAlign.RIGHT,
                  })
                }
              />
              <label htmlFor="rightAlign">راست چین</label>
            </div>
          </div>

          <div style={{ display: 'flex', width: '100%' }}>
            <div className="input-wrapper">
              <input
                type="radio"
                id="leftAlign"
                name="imageAlign"
                value={EImageAlign.LEFT}
                onChange={() =>
                  setImageProperties({
                    ...properties,
                    alignment: EImageAlign.LEFT,
                  })
                }
              />
              <label htmlFor="leftAlign">چپ چین</label>
            </div>
            <div className="input-wrapper">
              <input
                type="radio"
                id="centerAlign"
                name="imageAlign"
                value={EImageAlign.CENTER}
                onChange={() =>
                  setImageProperties({
                    ...properties,
                    alignment: EImageAlign.CENTER,
                  })
                }
              />
              <label htmlFor="centerAlign">وسط چین</label>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          paddingBottom: '15px',
        }}
        className="input-wrapper"
      >
        <label htmlFor="hasCaption">فعال کردن نوشته زیر عکس</label>
        <input
          id="hasCaption"
          name="hasCaption"
          type="checkbox"
          checked={properties.hasCaption}
          onChange={() =>
            setImageProperties({
              ...properties,
              hasCaption: !properties.hasCaption,
            })
          }
        />
      </div>
    </div>
  );
};

export default ImageDetail;
