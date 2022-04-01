import { Component } from 'solid-js';


const GeneralLoader: Component = () =>
    <div class="fixed w-full h-screen bg-black bg-opacity-75 top-0 bottom-0 right-0 left-0 z-50 flex justify-center items-center">
        <div class="">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="grey"
                class="animate-spin w-1/2 ml-1/4"
                height="96px"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
            </svg>
            <p class="text-center pt-4 text-white text-xl">Loading...</p>
        </div>
    </div>;

export default GeneralLoader;
