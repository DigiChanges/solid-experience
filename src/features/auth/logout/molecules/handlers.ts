import AuthRepository from '../../repositories/AuthRepository';

type LogoutProps = (path: string, options: { replace: boolean }) => void;

export const logout = async(navigate: LogoutProps) =>
{
	await (new AuthRepository()).logout();

	navigate('/auth/login', { replace: true });
};
