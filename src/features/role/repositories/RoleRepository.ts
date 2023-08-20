import { RoleListResponse } from '../interfaces';
import { config } from '../../shared/repositories/config';
import HttpService from '../../../services/HttpService';
import { IHttpParams } from '../../../services/IHttpParams';

const { baseUrl } = config.apiGateway.server;
const { base } = config.apiGateway.routes.roles;

class RoleRepository
{
    public async getRoles()
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${base}`,
            method: 'GET'
        };

        return HttpService.request<RoleListResponse>(config);
    }
}

export default RoleRepository;
