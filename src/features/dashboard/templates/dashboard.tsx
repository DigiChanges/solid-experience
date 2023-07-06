import { Component } from 'solid-js';
import Card from '../../shared/molecules/Card/Card';
import CardContent from '../../shared/molecules/CardContent/CardContent';
import styles from './Dashboard.module.css';
import { useI18n } from '@solid-primitives/i18n';

const Dashboard: Component = () =>
{
    return (
        <section class="p-6">
            <Card>
                <CardContent class={styles.content}>
                    {/*<Text class="text-neutral-50" message="a_dashboard" />*/}
                    {/*<Text class="text-neutral-50 text-center" message="a_dashboard_description" />*/}
                </CardContent>
            </Card>
        </section>
    );
};

export default Dashboard;
