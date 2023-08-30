import { Component } from 'solid-js';
import Card from '../../shared/molecules/Card/Card';
import CardContent from '../../shared/molecules/CardContent/CardContent';
import styles from './Dashboard.module.css';
import useTranslation from '../../shared/hooks/useTranslation';

const Dashboard: Component = () =>
{
    const { translate: t } = useTranslation();

    return (
        <section class={styles.dashboardSection}>
            <Card>
                <CardContent class={styles.content}>
                    <div class={styles.dashboardDiv}>{t('a_dashboard')}</div>
                    <div class={styles.dashboardDescription}>{t('a_dashboard_description')}</div>
                </CardContent>
            </Card>
        </section>
    );
};

export default Dashboard;
