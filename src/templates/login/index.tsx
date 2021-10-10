
import { Component, createSignal } from 'solid-js';
import Image from "../../atoms/Image";
import LoginForm from './LoginForm';
import ForgotPasswordForm from '../../templates/login/ForgotPasswordForm';


const Login: Component = () =>
{
  const [getShowRecoverPassword, setShowRecoverPassword] = createSignal(false);

  const togglePasswordRecovery = () => {
    setShowRecoverPassword(!getShowRecoverPassword())
  }

  return (
    <section className="dg-main-bg h-screen">
      <div className="dg-full-center-flex">
          <div className="dg-rounded-small-box">
            <div className="flex w-full justify-center mb-6 h-8 -mt-4">
              <a href="/">
                <Image src={"/src/assets/logonav.png"} className="h-8"/>
              </a>
            </div>
            {
              getShowRecoverPassword()
                ? (<ForgotPasswordForm onClick={togglePasswordRecovery} />)
                : (<LoginForm onClick={togglePasswordRecovery} />)
            }
          </div>
      </div>
    </section>
  )
};

export default Login;
