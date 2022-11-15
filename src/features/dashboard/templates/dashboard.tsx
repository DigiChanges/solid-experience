import { JSX } from 'solid-js';
import Card from '../../shared/molecules/Card/Card';
import CardContent from '../../shared/molecules/CardContent/CardContent';
import styles from './Dashboard.module.css';

const Dashboard: () => JSX.Element = () =>
{
    return (
        <section class="p-6">
            <Card>
                <CardContent class={styles.content}>
                    <p>Dashboard</p>
                </CardContent>
            </Card>
        </section>
    );
};

export default Dashboard;
