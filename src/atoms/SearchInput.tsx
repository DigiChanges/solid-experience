
import IconSearch from "./Icons/Stroke/IconSearch";
import { Component } from 'solid-js';

const SearchInput: Component = (props: any): any => {
  const propClassName = props.className ?? '';
  const className = `w-full shadow rounded pl-10  ${propClassName}`;

  return (
    <>
      <div className="relative mr-1 my-2 flex-grow w-full">
        {/*<input onChange={e => props.form.setFieldValue(props.field.name, e.target.value)}*/}
        {/*  type="search"*/}
        {/*  className={className}*/}
        {/*  placeholder={props.placeholder}*/}
        {/*  value={props.field.value}*/}
        {/*/>*/}
        <div className="absolute w-5  left-0 top-0 mt-2 mb-1 ml-3 text-main-gray-400">
          <IconSearch />
        </div>
      </div>
    </>
  )
}

export default SearchInput;
