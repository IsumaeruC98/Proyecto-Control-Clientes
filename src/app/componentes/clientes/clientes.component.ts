import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../modelo/cliente.model';
import { ClienteServicio } from '../../servicios/cliente.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: [
    './clientes.component.css',
    '../../app.component.css'
  ]
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  cliente: Cliente = {
    nombre: "",
    apellido: "",
    email: "",
    saldo: 0
  }
  
  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(
    private clientesServicio: ClienteServicio,
    private flashMessages: FlashMessagesService
    ) { }

  ngOnInit(): void {
    this.clientesServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    )
  }

  getSaldoTotal() {
    let saldoTotal:number = 0;
    if(this.clientes) {
      this.clientes.forEach(cliente => {
        saldoTotal += Number(cliente.saldo);
      });
    }
    return saldoTotal;
  }

  agregar(f:NgForm) {
    if(!f.valid) {
      this.flashMessages.show("Por favor llena el formulario correctamente", {
        cssClass: 'alert-danger', timeout: 4000
      })
    } else {
      //Agregar el nuevo cliente
      this.clientesServicio.agregarCliente(f.value);

      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }
}
