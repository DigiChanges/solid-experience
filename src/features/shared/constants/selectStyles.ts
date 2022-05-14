
export const singleSelectStyle = {
    searchBox: { 'max-height': '40px' },
    inputField: {
        'max-height': '40px',
        'padding': '0 10px',
        'width': '100%',
    },
};

export const roundedSelectStyle = {
    ...singleSelectStyle,
    multiselectContainer: { 'max-width': '100px' },
    searchBox: {
        ...singleSelectStyle.searchBox,
        'min-width': '80px',
        'border-radius': '20px',
    },
};

