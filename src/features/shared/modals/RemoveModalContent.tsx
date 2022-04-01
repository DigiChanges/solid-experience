import { Component } from 'solid-js';

interface RemoveModalContentTemplateProps
{
    title: string;
    content: string;
}

const RemoveModalContent: Component<RemoveModalContentTemplateProps> = ( props ) => (
    <div class="font-hairline  text-gray-400 mb-4 text-center">
        <div class="w-full text-3xl">{props.title}</div>
        <span class="text-2xl">
            {props.content}
        </span>
    </div>
);

export default RemoveModalContent;
