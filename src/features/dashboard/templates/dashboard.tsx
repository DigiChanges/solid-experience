import { Component } from 'solid-js';
import Card from '../../shared/molecules/Card/Card';
import CardContent from '../../shared/molecules/CardContent/CardContent';
import styles from './Dashboard.module.css';
import { Text } from 'solid-i18n';

const Dashboard: Component = () =>
{
    return (
        <section class="p-6">
            <Card>
                <CardContent class={styles.content}>
                    <Text class="text-neutral-50" message="a_dashboard" />
                    <Text class="text-neutral-50" message="a_dashboard_description" />
                </CardContent>
            </Card>
        </section>
    );
};

export default Dashboard;
