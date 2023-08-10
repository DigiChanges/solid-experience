import {Component, createEffect, Show} from 'solid-js';
import UserRepository from '../../features/user/repositories/UserRepository';
import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';
import createAlert from '../../features/shared/hooks/createAlert';
import AlertErrors from '../../features/shared/molecules/AlertErrors/AlertErrors';
import UserList from '../../features/user/templates/UserList/UserList';
import { ErrorBoundary, createRouteData } from 'solid-start';
const IndexPage: Component = () =>
{
    const { errorData, setError } = createAlert();
    const userRepository = new UserRepository();
    const users = createRouteData(userRepository.getUsers);
    createEffect(() => users.error && setError(users.error));

    return (
        <PrivateLayout>
            <ErrorBoundary
              fallback={(e: Error) => (
                <>
                  <h2>Oh no! An Error!</h2>
                  <details>
                    <summary>Click here to learn more</summary>
                    <p>
                      <strong>{e.name}</strong>: {e.message}
                    </p>
                  </details>
                </>
              )}
            >
            <AlertErrors
                errorData={errorData}
                title="err"
                description="err_process_user"
            />
            <Show when={users()}>
                <UserList
                    userList={users()}
                    loading={users.loading}
                />
            </Show>
            </ErrorBoundary>
        </PrivateLayout>
    );
};
export default IndexPage;
