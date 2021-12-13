import styled from 'styled-components';
import { colors } from '../utils/color';

const IconButton = styled.button`
    display: inline-block;
    font: normal normal normal 14px/1 WebFontIcons;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    font-size: 1.5em;
    cursor: pointer;
    text-align: center;
    color: ${props => (props.isSelected ? 'white' : colors.silver)};
    padding: 0.4em 0;
    width: 100%;
    border: none;
    // background-color: ${props =>
      props.isSelected ? colors.mineShaft : 'transparent'};
    background-color: ${colors.darkBg0};

    &:focus {
        outline: 0;
    }

    &:before {
        content: '${props => props.content}';
    }
`;

export default IconButton;
