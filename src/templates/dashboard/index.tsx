import { useNavigate } from 'solid-app-router';
import { Component } from 'solid-js';

const Dashboard: Component = () =>
{
    const navigate = useNavigate();
    navigate( '/login', { replace : true } );

    return (
        <section class="dg-main-bg h-screen">
            <div class="dg-full-center-flex">
                <div class="dg-rounded-small-box">
                    <div class="flex w-full justify-center mb-6 h-8 -mt-4">

                    </div>
                    <p>esto es template dashboaad</p>

                </div>
            </div>
        </section>
    );
};

export default Dashboard;
