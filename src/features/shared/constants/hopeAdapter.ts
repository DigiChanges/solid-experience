export const darkInput = {
    borderColor: 'neutral.400',
    bgColor: 'transparent',
    color: 'neutral.50',
    _focus: { shadow: '0 0 0 3px var(--hope-colors-primary-300)', borderColor: 'primary.200 !important' },
    _invalid: { shadow: '0 0 0 3px var(--hope-colors-danger-600) !important', borderColor: 'danger.400 !important' },
    _hover: { borderColor: 'neutral.300' },

};

export const placeholderInput = { color: 'neutral.300' };

export const darkNeutralButton = {
    bgColor: 'neutral.300',
    _hover: { bgColor: 'neutral.200', cursor: 'pointer' },
    borderRadius: '4px',
};


export const darkPrimaryButton = {
    bgColor: 'primary.200',
    _disabled: { borderColor: 'transparent', color: 'neutral.400 ', bgColor: 'transparent !important', cursor: 'not-allowed !important' },
    _hover: { bgColor: 'primary.100', cursor: 'pointer' },
    borderRadius: '4px',
};

export const darkPrimaryButtonWithBackground = {
    bgColor: 'primary.200',
    _disabled: { borderColor: 'transparent', color: 'neutral.400 ', bgColor: 'neutral.700 !important', cursor: 'not-allowed !important' },
    _hover: { bgColor: 'primary.100', cursor: 'pointer' },
    borderRadius: '4px',
};


export const darkDangerButton = {
    bgColor: 'danger.400',
    _hover: { bgColor: 'danger.300', cursor: 'pointer' },
    borderRadius: '4px',
};

export const darkTransparentButton = {
    bgColor: 'transparent',
    _hover: { bgColor: 'primary.600', cursor: 'pointer', borderColor: 'primary.200', color: 'primary.100', },
    borderRadius: '4px',
    borderColor: 'primary.200',
    color: 'primary.100',
};
