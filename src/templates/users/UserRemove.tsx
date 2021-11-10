
import { Component } from 'solid-js';
interface RemoveTemplateProps
{

    lastName: string;
    firstName: string;
}

const UserRemove: Component<RemoveTemplateProps> = ( props ) =>
{
    return (
        <div class="font-hairline  text-gray-400 mb-4 text-center">
            <div class="w-full text-3xl">Are you sure delete user:</div>
            <span class='text-2xl'>
                {`${props.lastName} ${props.firstName}`}
            </span>
        </div>
    );
};

export default UserRemove;
