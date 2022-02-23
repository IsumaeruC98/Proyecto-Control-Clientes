import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { timeout } from 'rxjs';
import { Cliente } from '../../modelo/cliente.model';
import { ClienteServicio } from '../../servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  cliente: Cliente = {
    nombre: "",
    apellido: "",
    email: "",
    saldo: 0
  }

  id:string;

  constructor(
    private clientesServicio: ClienteServicio,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientesServicio.getCliente(this.id).subscribe(cliente => {
      this.cliente = cliente;
    });
  }

  guardar(f:NgForm) {
    if(!f.valid) {
      this.flashMessages.show("Por favor llene el formulario correctamente", {
      cssClass: 'alert-danger', timeout: 400
    });
    } else {
      f.value.id = this.id;
      //modificar cliente
      this.clientesServicio.modificarCliente(f.value);
      this.router.navigate(['/']);
    }
  }

  eliminar() {
    if(confirm("Seguro que desea eliminar el cliente?")) {
      this.clientesServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }

}
