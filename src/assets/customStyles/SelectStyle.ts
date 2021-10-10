
const SelectStyle = (theme) =>
{
	return {
		...theme,
		borderWidth: 0,
		multiValue: {
			borderRadius: 100,
		},
		colors: {
            ...theme.colors,
            primary: "#667EEA",
            primary50: "#00ff9a",
            primary75: "#ff0000",
            neutral0: "#181D24",
            neutral5: "#a0aec0",
            neutral10: "#b400ff",
            neutral20: null,
            neutral40: "#0029ff",
            neutral50: "#99A6B8",
            neutral60: "#ffa900",
            neutral70: "#ff6600",
            neutral80: "#22ff00",
            neutral30: "#a0aec0",
            neutral90: "#46ff00",
            danger: "#00134b",
            dangerLight: "#103d00",
      }
	}
}

export default SelectStyle;
