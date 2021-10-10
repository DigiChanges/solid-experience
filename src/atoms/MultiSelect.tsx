//
// import Select from "react-select";
// import { FieldProps } from "formik";
//
// interface Option {
//   label: string;
//   value: string;
// }
//
// interface OwnProps {
//   id: string;
//   options: any;
//   selectStyle: any;
// }
// const MultiSelect: React.FC<OwnProps & FieldProps> = ({
//   options,
// 	id,
// 	field,
//   form,
//   selectStyle,
//   ...props
// }) => {
//
//   const onChange = (option: Option[]) =>
// 	{
//     form.setFieldValue(field.name, option.map((item: Option) => item.value));
//   };
//
//   const getValue = () =>
// 	{
//       return options ? options.filter(option => field.value.indexOf(option.value) >= 0) : [];
//   };
//
//   return (
// 			<Select
// 				{...props}
// 				id={id}
// 				name={field.name}
// 				value={getValue()}
// 				onChange={onChange}
// 				options={options}
// 				isMulti={true}
// 				theme={(theme) => (selectStyle ? selectStyle(theme) : theme)}
// 		/>
//   );
// };
//
// export default MultiSelect;
