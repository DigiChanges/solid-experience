
// import { forgetPassword } from '../../redux/auth/actions'

import { Component } from 'solid-js';
import { Form } from "solid-js-form";
import Title from "../../atoms/Title"
import Button from "../../atoms/Button"
import ForgetPasswordSchema from '../../SchemaValidations/ForgetPasswordSchema';
import Input from '../../atoms/Input';

interface ForgotPasswordFormProps
{
  props?: any;
  onClick: any;
}

const ForgotPasswordForm: Component<ForgotPasswordFormProps> = (props) => {
  // const dispatch = useDispatch()

  return (
    <>
      <Form
        initialValues={{
          email: ""
        }}
        className="flex flex-col h-4/5"
        validation={ForgetPasswordSchema}
        onSubmit={async (forms) => {
          console.log(forms.values)
          // const { email } = forms.values
          // dispatch(forgetPassword(email))
          // props.onClick();
        }}
      >
        <Title titleType="h1" className="mb-2 text-left text-xs font-extrabold text-main-gray-250 w-full">
          ACCOUNT RECOVERY
        </Title>
        <div>
          <Input
            name="email"
            type="text"
            id="email"
            className="dg-form-field-full  pl-5"
            placeholder="Your Email"
            labelClassName="text-main-gray-200 block mb-2"
            labelName="Email"
          />
        </div>
        <div className="flex items-center mt-6 justify-between w-full">
          <Button
            onClick={props.onClick}
            className="flex mx-auto text-white bg-red-700 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded-full text-sm font-bold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="mx-auto text-white bg-primary-main border-0 py-2 px-6 focus:outline-none hover:bg-primary-hover rounded-full text-sm font-bold text-center"
          >
            Send
          </Button>
        </div>
      </Form>
    </>
  )
};

export default ForgotPasswordForm;
