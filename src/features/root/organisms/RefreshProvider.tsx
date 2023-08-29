import { Component, createSignal, Show, onMount, onCleanup, JSX, createEffect } from 'solid-js';
import AuthRepository from '../../auth/repositories/AuthRepository';
import { createRouteAction, useLocation, useNavigate } from 'solid-start';
import { useContext as useAppContext } from '../../../context';
import publicRoutes from '../../../config/publicRoutes';

type RefreshProviderProps = {
	toRedirect: string,
	timer: number,
	children: JSX.Element
}

const RefreshProvider: Component<RefreshProviderProps> = (props) =>
{
	const authRepository = new AuthRepository();
	const [refreshing, refreshAction] = createRouteAction(authRepository.refreshToken);
	const [isLoading, setLoading] = createSignal(true);
	const [intervalId, setIntervalId] = createSignal(0);
	const navigate = useNavigate();
	const context = useAppContext();
	const location = useLocation();

	const handleRedirection = () =>
    {
		if (refreshing.error)
		{
			if (!publicRoutes.includes(location.pathname))
			{
				navigate(props.toRedirect, { replace: true });
			}
        }

        setLoading(false);
    };

	onMount(async() =>
	{
		await refreshAction();

		if (refreshing?.result)
		{
			const meResponse = await authRepository.getMe();
			if (meResponse?.data)
			{
				context?.setUserData(meResponse.data);
			}
		}

		handleRedirection();
	});

	createEffect(() =>
	{
		const toRedirect = props.toRedirect;

		const intervalId = setInterval(() =>
		{
            authRepository.refreshToken().then(handleRedirection).catch(() =>
			{
                if (!publicRoutes.includes(location.pathname))
				{
                    navigate(toRedirect, { replace: true });
                }
            });
        }, props.timer) as unknown as number;

    setIntervalId(intervalId);
	});

	onCleanup(() =>
	{
		clearInterval(intervalId());
	});

	return (
		<>
			<Show when={!isLoading()}>
				{props.children}
			</Show>
		</>
	);
};

export default RefreshProvider;
