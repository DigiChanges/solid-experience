import { Component } from 'solid-js';
import AuthRepository from '../../features/auth/repositories/AuthRepository';

const refresh = () => async () =>
{
    const authRepository = new AuthRepository();
    const refreshToken = authRepository.refreshToken();
    await refreshToken();
};

const Dashboard: Component = () =>
{
    return (
        <section class="dg-main-bg h-screen">
            <div class="dg-full-center-flex">
                <div class="dg-rounded-small-box">
                    <div class="flex w-full justify-center mb-6 h-8 -mt-4">

                    </div>

                    <button onClick={refresh()}>
                        TEST REFRESH TOKEN
                    </button>
                    <p>esto es template dashboard</p>

                </div>
            </div>
        </section>
    );
};

export default Dashboard;
