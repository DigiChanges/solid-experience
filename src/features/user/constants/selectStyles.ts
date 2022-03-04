
export const singleSelectStyle = {
    searchBox: { 'max-height': '40px' },
    inputField: { 'max-height': '40px', 'padding': '0 10px' },
};

export const documentTypeMultiSelectStyle = {
    ...singleSelectStyle,
    multiselectContainer: { 'max-width': '100px' },
    searchBox: { ...singleSelectStyle.searchBox,
        'min-width': '80px',
        'max-width': '100px',
        'border-radius': '20px 0 0 20px',
    },
};

export const countryMultiSelectStyle = {
    ...singleSelectStyle,
    multiselectContainer: { 'max-width': '100px' },
    searchBox: { ...singleSelectStyle.searchBox,
        'min-width': '80px',
        'border-radius': '20px',
    },
};

export const enableMultiSelectStyle = countryMultiSelectStyle;
