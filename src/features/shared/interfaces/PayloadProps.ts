
interface PayloadProps<T=Record<string, any>>
{
    queryParams?: any;
    id?: string;
    data?: T;
}

export default PayloadProps;
