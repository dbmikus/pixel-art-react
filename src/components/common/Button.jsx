import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, css } from 'styled-components';
import theme from 'styled-theming';
import { colors } from '../../utils/color';

const textColor = theme.variants('mode', 'variant', {
  default: { default: 'white' },
  action: { default: 'white' },
  close: { default: 'white' },
  info: { default: 'white' },
  white: { default: 'black' },
  proceed: { default: 'white' }
});

const bgColor = theme.variants('mode', 'variant', {
  default: { default: colors.mineShaft },
  action: { default: colors.lotus },
  close: { default: colors.steelblue },
  info: { default: colors.chathamsBlue },
  white: { default: colors.alto },
  proceed: { default: colors.shrub }
});

const boxShadowColor = theme.variants('mode', 'variant', {
  default: { default: colors.doveGray },
  action: { default: colors.buccaneer },
  close: { default: colors.sanMarino },
  info: { default: colors.chambray },
  white: { default: colors.silveChalice },
  proceed: { default: colors.nobel }
});

const bgActiveColor = theme.variants('mode', 'variant', {
  default: { default: colors.tundora },
  action: { default: colors.cowboy },
  close: { default: colors.eastBay },
  info: { default: colors.cloudBurst },
  white: { default: colors.nobel },
  proceed: { default: colors.shrub }
});

const ButtonCSS = css`
  background: none;
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 1em;
  text-decoration: none;
  transition-duration: 0.1s;
  color: ${textColor};
  background-color: ${bgColor};
  box-shadow: 3px 3px 0 0 ${boxShadowColor};
  margin: 0 auto;
  &:hover,
  &.selected {
    background-color: ${bgActiveColor};
  }
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: translate(0, 5px);
    box-shadow: 0 1px 0 ${bgActiveColor};
    background-color: ${bgActiveColor};
  }

  ${props => {
    const widthOptions = { full: '100%', half: '50%', normal: 'auto' };
    const size = widthOptions[props.size];
    return (
      props.size &&
      css`
        width: ${size};
      `
    );
  }};
`;

const ButtonStyled = styled.button.attrs(props => ({
  disabled: props.disabled
}))`
  ${ButtonCSS}
  ${props =>
    props.size &&
    css`
      opacity: ${props.disabled ? '0.5' : '1'};
    `};
`;

const InputFileLabelStyled = styled.label.attrs({
  htmlFor: 'load-image-input'
})`
  ${ButtonCSS}
  cursor: pointer;
`;

const InputFileStyled = styled.input.attrs({
  type: 'file',
  id: 'load-image-input',
  role: 'button'
})`
  opacity: 0;
  position: absolute;
  z-index: -1;
`;

const Button = ({
  children,
  variant,
  onClick,
  onChange,
  type,
  size,
  ariaLabel,
  disabled = false,
  className
}) => (
  <ThemeProvider theme={{ mode: 'default' }}>
    {type === 'file' ? (
      <>
        <InputFileLabelStyled variant={variant} size={size}>
          {children}
        </InputFileLabelStyled>
        <InputFileStyled aria-label={ariaLabel} onChange={onChange} />
      </>
    ) : (
      <ButtonStyled
        className={className}
        variant={variant}
        onClick={onClick}
        size={size}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {children}
      </ButtonStyled>
    )}
  </ThemeProvider>
);
Button.propTypes = {
  variant: PropTypes.oneOf([
    'default',
    'info',
    'close',
    'action',
    'white',
    'proceed'
  ]),
  size: PropTypes.oneOf(['normal', 'half', 'full']),
  ariaLabel: PropTypes.string.isRequired,
  onClick(props, ...rest) {
    if (!props.type) {
      return PropTypes.func.isRequired(props, ...rest);
    }
    return PropTypes.func(props, ...rest);
  }
};

Button.defaultProps = {
  variant: 'default',
  size: 'normal',
  onClick: () => {}
};

export default Button;
