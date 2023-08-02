import { AxiosRequestConfig } from 'axios';
import { ItemListResponse, ItemPayload, ItemResponse } from '../interfaces';
import { config } from '../../shared/repositories/config';
import HttpService from '../../../services/HttpService';
import PayloadProps from '../../shared/interfaces/PayloadProps';

const { baseUrl } = config.apiGateway.server;
const { base } = config.apiGateway.routes.items;

class ItemRepository
{
    public async getItems({ queryParams }: PayloadProps)
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${base}`,
            method: 'GET'
        };

        return HttpService.request<ItemListResponse>({ config, queryParams });
    }

    public async getOne({ id, user }: PayloadProps)
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${base}/${id}`
        };

        return HttpService.request<ItemResponse>({ config, user });
    }

    public async updateItem({ id, data, user }: PayloadProps<ItemPayload>)
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${base}/${id}`,
            method: 'PUT',
            data
        };

        return HttpService.request<ItemResponse>({ config, user });
    }

    public createItem({ data, user }: PayloadProps<ItemPayload>)
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${base}`,
            method: 'POST',
            data
        };

        return HttpService.request<ItemResponse>({ config, user });
    }

    public removeItem({ id, user }: PayloadProps)
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${base}/${id}`,
            method: 'DELETE'
        };

        return HttpService.request<ItemResponse>({ config, user });
    }
}

export default ItemRepository;
