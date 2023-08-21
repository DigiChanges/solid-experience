import { ItemListResponse, ItemPayload, ItemResponse } from '../interfaces';
import { config } from '../../shared/repositories/config';
import HttpService from '../../../services/HttpService';
import PayloadProps from '../../shared/interfaces/PayloadProps';
import { IHttpParams } from '../../../services/IHttpParams';

const { baseUrl } = config.apiGateway.server;
const { base } = config.apiGateway.routes.items;

class ItemRepository
{
    public async getItems({ queryParams }: PayloadProps)
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${base}`,
            method: 'GET',
            queryParams
        };

        return HttpService.request<ItemListResponse>(config);
    }

    public createItem({ data }: PayloadProps<ItemPayload>)
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${base}`,
            method: 'POST',
            data
        };

        return HttpService.request<ItemResponse>(config);
    }

    public async updateItem({ id, data }: PayloadProps<ItemPayload>)
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${base}/${id}`,
            method: 'PUT',
            data
        };
        return HttpService.request<ItemResponse>(config);
    }

    public async getOne({ id }: PayloadProps)
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${base}/${id}`,
            method: 'GET'
        };

        return HttpService.request<ItemResponse>(config);
    }

    public removeItem({ id }: PayloadProps)
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${base}/${id}`,
            method: 'DELETE'
        };

        return HttpService.request<ItemResponse>(config);
    }
}

export default ItemRepository;
