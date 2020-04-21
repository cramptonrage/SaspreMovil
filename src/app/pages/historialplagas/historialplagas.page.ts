import { environment } from './../../../environments/environment';
import { HistorialplagasService } from '../../services/historialplagas.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historialplagas',
  templateUrl: './historialplagas.page.html',
  styleUrls: ['./historialplagas.page.scss'],
  providers: [HistorialplagasService]
})
export class HistorialplagasPage implements OnInit {

  constructor( 
    public historialplagasServices:HistorialplagasService,
    private router: Router,
    private alertController:AlertController) { }
    
    private datos = {
      idHistorialCultivo: '3',
      idCultivos: '3',
      idPlagas: '4',
      fechaprediccion: '2020-03-03'
    }
    /*$idCultivos = $_POST['idCultivos'];
$idPlagas = $_POST['idPlagas'];
$fechaprediccion = $_POST['fechaprediccion']; */

insertInsecticidas() {
  this.historialplagasServices.insertHistorialplagas(this.datos)
    .then(response => {
      console.log(response);
      let data = JSON.parse(response.data);

      if (data.result == 'success') {
        this.datos.idCultivos = '';
        this.datos.idPlagas = '';
        this.datos.fechaprediccion = '';

       // this.alertas.toast('Exito', 'Alerta registrada con exito');
        this.router.navigateByUrl('/menu');
      } else {
        console.log(data.message);
      }
    }
    )
    .catch(error => {
    //  this.alertas.showAlert('Error', 'Ha ocurrido un error ' + error);
    })
}


updateInsecticidas() {
  this.historialplagasServices.updateHistorialplagas(this.datos)
    .then(response => {
      console.log(response);
      let data = JSON.parse(response.data);

      if (data.result == 'success') {
        this.datos.idHistorialCultivo = '';
        this.datos.idCultivos = '';
        this.datos.idPlagas = '';
        this.datos.fechaprediccion = '';

       // this.alertas.toast('Exito', 'Alerta actualizada con exito');
        this.router.navigateByUrl('/menu');
      } else {
        console.log(data.message);
      }
    }
    )
    .catch(error => {
    //  this.alertas.showAlert('Error', 'Ha ocurrido un error ' + error);
    })
}

deleteInsecticidas() {
  this.historialplagasServices.deleteHistorialplagas(this.datos)
    .then(response => {
      console.log(response);
      let data = JSON.parse(response.data);

      if (data.result == 'success') {
        this.datos.idHistorialCultivo = '';

       // this.alertas.toast('Exito', 'Alerta eliminada con exito');
        this.router.navigateByUrl('/menu');
      } else {
        console.log(data.message);
      }
    }
    )
    .catch(error => {
   //   this.alertas.showAlert('Error', 'Ha ocurrido un error ' + error);
    })
}

    mostrarHistorialplagas() {
    console.log('uno');
    this.historialplagasServices.historialplagasSelect()
      .then(response => {
        console.log('dos');
        console.log('Response recived');
        console.log('tres');
        console.log(response);

        let data = JSON.parse(response.data);
        if(data.result == 'failed'){
          console.log('plagas no mostradas');
          this.showAlert('Error', 'plagas no mostradas');
        }else if(data.result=='success'){
          console.log('plagas mostradas');
        }
      }
      ).catch(error => {
        this.showAlert('Error', JSON.stringify(error));
      });
  }
 

  ngOnInit() {
    this.mostrarHistorialplagas();
  }

  async showAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ["Ok"],
    });

    await alert.present();
  }

}
