import { Component } from 'solid-js';
import MediaObject from '../../../molecules/MediaObject';

const Dashboard: Component = () =>
{
    return (
        <section class="dg-main-bg min-h-full h-full p-6">
            <div class="dg-full-center-flex h-128">
                <MediaObject class="dg-media-object w-full h-full flex-col justify-center" >
                    <p>Dashboard</p>
                    <p>esto es template dashboard</p>
                </MediaObject>
            </div>
        </section>
    );
};

export default Dashboard;
