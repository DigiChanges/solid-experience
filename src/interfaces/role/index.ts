
export interface IRolePayload
{
    name: string;
    slug: string;
    permissions: string[];
    enable: boolean;
}

export interface IRoleApi extends IRolePayload
{
    id: string
}

