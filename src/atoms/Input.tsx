import { Component } from "solid-js";
import { useField } from "solid-js-form";
import Label from './Label';
import ErrorForm from './ErrorForm';

interface InputProps
{
  name: string,
  type: string,
  id: string,
  className: string,
  placeholder: string,
  labelClassName: string,
  labelName: string,
  autocomplete?: 'off' | 'on'
}

const Input: Component<InputProps> = (props) => {
  const {field, form} = useField(props.name);
  const formHandler = form.formHandler;

  return (
    <>
      <Label
        for={props.id}
        className={props.labelClassName}
      >
        {props.labelName}
        {/*{field.required() ? " *" : ""}*/}
      </Label>
      <input
        value={field.value() as string}
        placeholder={props.placeholder}
        name={props.name}
        className={props.className}
        autocomplete={props.autocomplete ? props.autocomplete : 'on'}
        type={props.type ?? "button"}
        //@ts-ignore
        use:formHandler // still need to properly type the handler
      />
      <ErrorForm>{field.error()}</ErrorForm>
    </>
  );
};

export default Input;
