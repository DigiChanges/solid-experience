import { createRouteAction } from 'solid-start';

function useAction(action: (...params: any) => Promise<any>)
{
    const [submitting, submit] = createRouteAction(action);

	return { submitting, submit };
}

export default useAction;
