
// import { loginUser } from '../../redux/auth/actions'
import { Form } from "solid-js-form";
import Title from "../../atoms/Title"
import Button from "../../atoms/Button"
import { Component } from "solid-js";
import SignUpSchema from '../../SchemaValidations/SignUpSchema';
import Input from '../../atoms/Input';
import PasswordShowHide from './PasswordShowHide';
import { useApplicationContext } from '../../context/context';
import AuthRepository from '../../repositories/AuthRepository';
import { ILoginPayload } from '../../interfaces/auth';

interface LoginFormProps {
  props?: any;
  onClick: any
}

const LoginForm: Component<LoginFormProps> = (props): any =>
{
  const [user, { addUser }] = useApplicationContext();
  const authRepository = new AuthRepository()

  return (
    <>
      <Form
        initialValues={{email: "", password: ""}}
        validation={SignUpSchema}
        onSubmit={async (form) => {
          console.log(form.values)
          console.log(user())

          const data = await authRepository.signin(form.values as ILoginPayload)
          addUser(data)
        }}
      >
        <Title titleType="h1" className="mb-2 text-left text-xs font-extrabold text-main-gray-250">
          Login
        </Title>
        <div className="mb-4">
          <Input
            name="email"
            type="text"
            id="email"
            className="dg-form-field-full font-extrabold pl-5"
            placeholder="Your Email"
            labelClassName="text-main-gray-200 block mb-2"
            labelName="Email"
          />
        </div>
        <div>
          <PasswordShowHide
            className="dg-form-field-full font-extrabold pl-5"
            labelClassName="text-main-gray-200 block my-3"
            labelName="Password"
            placeholder="Your Password"
          />
        <div className="flex items-center justify-between">
          <Button
            onClick={props.onClick}
            className="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-dark "
          >
            Forgot Password?
          </Button>
        </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Button
            type="submit"
            className="mx-auto text-white bg-primary-main border-0 py-2 focus:outline-none hover:bg-primary-hover rounded-full text-sm font-bold w-32 text-center"
          >
            Login
        </Button>
        </div>
      </Form>
    </>
  )
};

export default LoginForm;
