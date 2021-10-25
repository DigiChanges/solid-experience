
import IconSearch from './Icons/Stroke/IconSearch';
import { Component } from 'solid-js';

const SearchInput: Component = ( props: any ): any =>
{
    const propClass = props.class ?? '';
    const _class = `w-full shadow rounded pl-10  ${propClass}`;

    return (
        <>
            <div class="relative mr-1 my-2 flex-grow w-full">
                {/* <input onChange={e => props.form.setFieldValue(props.field.name, e.target.value)}*/}
                {/*  type="search"*/}
                {/*  class={_class}*/}
                {/*  placeholder={props.placeholder}*/}
                {/*  value={props.field.value}*/}
                {/* />*/}
                <div class="absolute w-5  left-0 top-0 mt-2 mb-1 ml-3 text-main-gray-400">
                    <IconSearch />
                </div>
            </div>
        </>
    );
};

export default SearchInput;
