import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'app/core/services/base.service';
import { ApiEnum } from 'app/enums/api.enum';
import { environment } from 'environments/environment';
import { ListResult } from 'app/models/list-result.model';
import { PacienteModel } from 'app/models/paciente.model';
import * as signalR from '@aspnet/signalr';

@Injectable()
export class DashBoardService extends BaseService {
    constructor(public http: HttpClient) {
        super(http, ApiEnum.ProjetoIntegrado);
    }

    public hubConnection: signalR.HubConnection

    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(environment.apiProjetoIntegrado + '/hub/pacientes', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .build();

        this.hubConnection
            .onclose(e => {
                this.Start();
            });

        this.Start();
    }
    Start() {
        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err));
            
            this.hubConnection.serverTimeoutInMilliseconds = 100000;
    }

    Filter(filter): Observable<any> {
        return this.get<ListResult<PacienteModel[]>>('/pacientes/Filter', filter);
    }

    Read(id: string) {
        return this.get<PacienteModel>('/pacientes/' + id);
    }

    Create(dto: PacienteModel) {
        return this.post<string>('/pacientes', dto);
    }

    Get(): Observable<PacienteModel[]> {
        return this.get<PacienteModel[]>('/pacientes');
    }

    Update(dto: PacienteModel) {
        return this.put<string>('/pacientes', dto);
    }

    Delete(ids: string[]): Observable<boolean> {
        return this.delete<boolean>('/pacientes', ids);
    }
}
