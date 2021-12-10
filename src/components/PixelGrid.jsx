import React from 'react';
import styled from 'styled-components';
import PixelCell from './PixelCell';

const PixelGrid = ({
  cells,
  drawHandlers,
  classes,
  className,
  nbrColumns,
  nbrRows,
  hoveredCell
}) => (
  <div
    className={`${className} ${classes}`}
    onTouchMove={drawHandlers.onTouchMove}
  >
    {cells.map(cell => (
      <PixelCell
        key={cell.id}
        cell={cell}
        id={cell.id}
        drawHandlers={drawHandlers}
        onFocus={(id, ev) => drawHandlers.onMouseOver(id, ev)}
        nbrColumns={nbrColumns}
        nbrRows={nbrRows}
        hoveredCell={hoveredCell}
      />
    ))}
  </div>
);

const cssHeight = '80vh';
const StyledPixelGrid = styled(PixelGrid)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;

  height: ${cssHeight};
  width: calc(${props => props.nbrColumns / props.nbrRows} * ${cssHeight});
`;

export default StyledPixelGrid;
