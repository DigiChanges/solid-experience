import { Link } from 'solid-app-router';
import { Text } from 'solid-i18n';

const Custom404 = () => (
    <div class="grid min-h-screen place-items-center gilroy">
        <div class="flex items-center flex-col w-full gap-4">
            <svg
                class="h-16 w-16 text-main-gray-250"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <h2 class="text-xl text-left mx-1/4 text-main-gray-250 font-extrabold gilroy ">
                <Text message="err_404"/>
            </h2>
            <Link href="/" class="px-10 py-2 dg-main-button">
                <Text message="a_home" />
            </Link>
        </div>
    </div>
);

export default  Custom404;
