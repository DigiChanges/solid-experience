//
// import Select from "react-select";
// import {FieldProps} from "formik";
//
// interface Option {
//   label: string;
//   value: string;
// }
//
// interface OwnProps {
//   id: string;
//   options: any;
//   selectStyle: any,
// }
//
// const SimpleSelect: React.FC<OwnProps & FieldProps> = ({
//   options,
// 	id,
// 	field,
//   form,
//   selectStyle,
//   ...props
// }) => {
//
//   const onChange = (option: Option) =>
// 	{
// 		form.setFieldValue(field.name, option.value);
//   };
//
//   const getValue = () =>
// 	{
// 		return options ? options.find(option => option.value === field.value) : '';
//   }
//
//   return (
// 			<Select
// 				{...props}
// 				id={id}
// 				name={field.name}
// 				value={getValue()}
// 				onChange={onChange}
// 				options={options}
// 				theme={(theme) => (selectStyle ? selectStyle(theme) : theme)}
// 			/>
//   );
// }
//
// export default SimpleSelect;
