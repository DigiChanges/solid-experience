const colors = {
    success: '#569372',
    info: '#4F6AAA',
    warning: '#E79121',
    error: '#E34B4B'
};

type ColorType = keyof typeof colors;

export const ToastStyle = (type: ColorType) => ({
    background: colors[type],
    color: '#ffffff',
    borderRadius: '4px',
    boxShadow: '0px 1px 5px #000000'
});
