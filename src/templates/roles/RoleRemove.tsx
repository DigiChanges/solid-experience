import { Component } from 'solid-js';

interface RoleTemplateProps{
    name: string;
}
const RoleRemove: Component< RoleTemplateProps> = ( props ) => (
    <div class="font-hairline  text-gray-400 mb-4 text-center">
        <div class="w-full text-3xl">Are you sure delete role:</div>
        <span class='text-2xl'>
            {`${props.name}`}
        </span>
    </div>
);

export default RoleRemove;
