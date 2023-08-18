import { AxiosRequestConfig } from 'axios';
import { RoleListResponse, RolePayload, RoleResponse } from '../interfaces';
import { config } from '../../shared/repositories/config';
import HttpService from '../../../services/HttpService';
import PayloadProps from '../../shared/interfaces/PayloadProps';

const { baseUrl } = config.apiGateway.server;
const { getAll, remove, update, create, getOne } = config.apiGateway.routes.roles;

class RoleRepository
{
    public async getRoles({ queryParams }: PayloadProps)
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${getAll}`
        };

        return HttpService.request<RoleListResponse>({ config, queryParams });
    }

    public async getOne({ id }: PayloadProps)
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${getOne}/${id}`
        };

        return HttpService.request<RoleResponse>({ config });
    }

    public async updateRole({ id, data }: PayloadProps<RolePayload>)
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${update}/${id}`,
            method: 'PUT',
            data
        };

        return HttpService.request<RoleResponse>({ config });
    }

    public createRole({ data }: PayloadProps<RolePayload>)
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${create}`,
            method: 'POST',
            data
        };

        return HttpService.request<RoleResponse>({ config });
    }

    public removeRole({ id }: PayloadProps)
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${remove}/${id}`,
            method: 'DELETE'
        };

        return HttpService.request<RoleResponse>({ config });
    }
}

export default RoleRepository;
