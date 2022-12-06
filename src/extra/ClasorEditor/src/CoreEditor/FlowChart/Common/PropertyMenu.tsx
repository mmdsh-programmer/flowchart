import { IItemProps } from '../../../Interface';
import React from 'react';
declare interface IProps {
  itemProperty: IItemProps;
  handleFillColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleStrokeColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleStrokeWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFontSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFontColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTooltipChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const PropertyMenu = (props: IProps) => {
  const {
    itemProperty,
    handleFillColorChange,
    handleStrokeColorChange,
    handleStrokeWidthChange,
    handleFontSizeChange,
    handleFontColorChange,
    handleTooltipChange,
  } = props;

  return (
    <div className={`${itemProperty.id ? 'active' : ''} sb-properties`}>
      <div className="sb-menu-container">
        <div className="sb-caption">مشخصات آیتم</div>
        <div className="sb-item">
          <label className="sb-label">رنگ آیتم</label>
          <input
            type="color"
            id="item-color"
            name="item-color"
            value={itemProperty.fillColor}
            onChange={handleFillColorChange}
          ></input>
        </div>
        {itemProperty.type === 'nodes' && (
          <div className="sb-item">
            <label className="sb-label">رنگ حاشیه</label>
            <input
              type="color"
              id="stroke-color"
              name="stroke-color"
              value={itemProperty.strokeColor}
              onChange={handleStrokeColorChange}
            ></input>
          </div>
        )}
        <div className="sb-item">
          <label className="sb-label">ضخامت</label>
          <input
            type="number"
            id="item-stroke-width"
            name="item-soke-width"
            value={itemProperty.strokeWidth}
            onChange={handleStrokeWidthChange}
          ></input>
        </div>
        <div className="sb-item">
          <label className="sb-label">اندازه قلم</label>
          <input
            type="number"
            id="item-font-size"
            name="item-font-size"
            value={itemProperty.fontSize}
            onChange={handleFontSizeChange}
          ></input>
        </div>
        <div className="sb-item">
          <label className="sb-label">رنگ قلم</label>
          <input
            type="color"
            id="item-font-color"
            name="item-font-color"
            value={itemProperty.fontColor}
            onChange={handleFontColorChange}
          ></input>
        </div>
        <div className="sb-item">
          <label className="sb-label">Tooltip</label>
          <input
            type="text"
            id="item-tooltip"
            name="item-tooltip"
            value={itemProperty.tooltip || ''}
            onChange={handleTooltipChange}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default PropertyMenu;
