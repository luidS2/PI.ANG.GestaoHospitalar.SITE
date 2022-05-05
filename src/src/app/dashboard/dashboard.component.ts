import { Component, OnInit } from '@angular/core';
import { PacienteModel } from 'app/models/paciente.model';
import * as Chartist from 'chartist';
import { DashBoardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pacientes: Array<any> = [];
  constructor(private service: DashBoardService) { }

  public addPedidoExtraListener = () => {
    this.service.hubConnection.on('pacienteChanges', (paciente: PacienteModel) => {
      this.atualizaPaciente(paciente);
    });
  }

  atualizaPaciente(paciente: PacienteModel) {
    var pacineteOld = this.pacientes.find((elem: PacienteModel) => elem.numeroPaciente == paciente.numeroPaciente);
    if (pacineteOld) {
      const idx = this.pacientes.indexOf(pacineteOld);
      const updateList = { ...pacineteOld, ...paciente };
      this.pacientes[idx] = updateList;
      this.pacientes[idx].changed = true;
      setTimeout(() => {
        this.pacientes[idx].changed = false;
      }, 10000);
    }
    else
      this.pacientes.push(paciente)
  }

  ngOnInit() {
    this.service.startConnection();
    this.addPedidoExtraListener();
    this.loadData();
  }

  public loadData() {

    this.service.Get().subscribe({
      next: (result) => {
        this.pacientes = result;
      },
      error: (err) => console.error(err),
      complete: () => console.info('complete')
    });
  }
}
