import { singleSelectStyle } from '../../shared/constants/selectStyles';

export const documentTypeMultiSelectStyle = {
    ...singleSelectStyle,
    multiselectContainer: { 'max-width': '100px' },
    searchBox: {
        ...singleSelectStyle.searchBox,
        'min-width': '80px',
        'max-width': '100px',
        'border-radius': '20px 0 0 20px',
    },
};

