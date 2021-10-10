import { Component, createSignal } from 'solid-js';
import Button from "../../atoms/Button";
import IconEye from "../../atoms/Icons/Stroke/IconEye";
import IconEyeCrossed from "../../atoms/Icons/Stroke/IconEyeCrossed";
import Input from '../../atoms/Input';


interface PasswordShowHideProps
{
  className: string,
  labelClassName: string,
  labelName: string,
  placeholder: string
}


const PasswordShowHide: Component<PasswordShowHideProps> = (props: any) =>
{
  const [getIsShowingPassword, setIsShowingPassword] = createSignal(false);

  const showPasswordClick = () =>
	{
    setIsShowingPassword(!getIsShowingPassword())
  }

  return (
    <>
      <div className="relative mr-1 my-2 flex-grow">
        <Input
          name="password"
          id="password"
          type={getIsShowingPassword() ? "text" : "password"}
          className={props.className}
          labelClassName={props.labelClassName}
          labelName={props.labelName}
          placeholder={props.placeholder}
          autocomplete="off"
        />
        <span className="absolute bottom-0 right-0 flex items-center pl-2">
          <Button
              className="w-8 h-8 mt-2 mb-1 mx-3 p-1 text-main-gray-100"
              type="button"
              onClick={showPasswordClick}>
              {
                getIsShowingPassword()
                ? <IconEye />
                : <IconEyeCrossed />
              }
          </Button>
        </span>
      </div>
    </>
  );
};

export default PasswordShowHide;
