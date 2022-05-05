import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PROJETOINTEGRADO} from 'app/app.api';
import { Observable } from 'rxjs';
import { ApiEnum } from '../../enums/api.enum';
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  httpOptionsResponse = {
    observe: 'response' as 'body',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })

  };
  constructor(public http: HttpClient, apiEnum: ApiEnum = ApiEnum.ProjetoIntegrado) {
    this.api = apiEnum;
  }
  api: ApiEnum;

  public getRoute(route: string | any[]): string {
    if (!Array.isArray(route)) {
      route = [route];
    }

    if (this.api == ApiEnum.Seguranca)
      return "" + route.join('/');
    else
      return PROJETOINTEGRADO + route.join('/');
  }

  private getRouteApiSeguranca(route: string | any[]): string {
    if (!Array.isArray(route)) {
      route = [route];
    }

    return "" + route.join('/');
  }

  private getHttpParams(parameters): HttpParams {
    let params = new HttpParams();
    if (parameters) {
      Object.keys(parameters).forEach(key => {
        if (Array.isArray(parameters[key])) {
          parameters[key].forEach(param => {
            if (param) {
              params = params.append(key, param.toString());
            }
          });
        } else if (parameters[key]) {
          params = params.append(key, parameters[key].toString());
        }
      });
    }

    return params;
  }
  public get<T>(route: string | any[], parameters: Object = null) {
    const httpParams = this.getHttpParams(parameters);
    const url = this.getRoute(route);
    return <Observable<T>>this.http.get(url, { params: httpParams });
  }

  public post<T>(route: string | any[], body: Object = null, fullResponse: boolean = false) {
    const url = this.getRoute(route);
    return <Observable<T>>(
      this.http.post(url, JSON.stringify(body), fullResponse ? this.httpOptionsResponse : this.httpOptions)
    );
  }

  public postApiSeguranca<T>(route: string | any[], body: Object = null, parameters: Object = null) {
    const url = this.getRouteApiSeguranca(route);
    return <Observable<T>>(
      this.http.post(url, JSON.stringify(body), this.httpOptions)
    );
  }

  public put<T>(route: string | any[], body: Object = null, fullResponse: boolean = false) {
    const url = this.getRoute(route);
    return <Observable<T>>(
      this.http.put(url, JSON.stringify(body), fullResponse ? this.httpOptionsResponse : this.httpOptions)
    );
  }

  public delete<T>(route: string | any[], body: Object = null) {
    const url = this.getRoute(route);

    return <Observable<T>>this.http.delete(url, this.getOptions(body));
  }

  private getOptions(body: Object) {
    const options = {
      headers: this.httpOptions.headers,
      body: JSON.stringify(body)
    };
    return options;
  }
}
