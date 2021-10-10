import {config} from './config'
// import {getHeader} from '../api/auth'
import HttpRequest from "../services/HttpRequest";
import {IChangeForgotPasswordPayload, ILoginPayload} from "../interfaces/auth";

const {protocol, hostname, port} = config.apiGateway.server
const {login, permissionsGetAll, forgotPassword, changeForgotPassword} = config.apiGateway.routes.auth

class AuthRepository
{
  public signin = (body: ILoginPayload) =>
  {
      const requestOptions = {
          url: `${protocol}://${hostname}:${port}/${login}`,
          method: 'POST',
          body,
          headers: {'Content-Type': 'application/json'}
      };

      return HttpRequest.request(requestOptions);
  }

  public getAllPermissions = () =>
  {
      const requestOptions = {
          url: `${protocol}://${hostname}:${port}/${permissionsGetAll}`,
          method: 'GET',
          // headers: getHeader()
      };

      return HttpRequest.request(requestOptions);
  }

  public getForgotPassword = (email: string) =>
  {
      const requestOptions = {
          url: `${protocol}://${hostname}:${port}/${forgotPassword}`,
          method: 'POST',
          body: {email},
          headers: {'Content-Type': 'application/json'}
      };

      return HttpRequest.request(requestOptions);
  }

  public setChangeForgotPassword = (body: IChangeForgotPasswordPayload) =>
  {
      const requestOptions = {
          url: `${protocol}://${hostname}:${port}/${changeForgotPassword}`,
          method: 'POST',
          body,
          headers: {'Content-Type': 'application/json'}
      };

      return HttpRequest.request(requestOptions);
  }
}

export default AuthRepository;
