import { Component } from 'solid-js';

interface ErrorFormProps
{
  className?: string,
  children: any
}

const ErrorForm: Component<ErrorFormProps> = (props: any) => (
  <span
    className={props.className ? `${props.className} text-red-500 p-2` : "text-red-500"}
  >
    {props.children}
  </span>
);

export default ErrorForm;
