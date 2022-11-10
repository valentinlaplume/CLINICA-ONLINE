import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEspecialista',
})
export class FilterEspecialistaPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    // console.log('------ FilterEspecialistaPipe MIS TURNOS ---------');
    // console.log('value ', value);
    // console.log('arg ', arg);
    const resultPosts = [];
    if (arg != null) {
      for (const post of value) {
        if (
          post.especialidad.descripcion.toLowerCase().indexOf(arg) > -1 ||
          post.paciente.nombre.toLowerCase().indexOf(arg) > -1 ||
          post.paciente.apellido.toLowerCase().indexOf(arg) > -1
        ) {
          resultPosts.push(post);
        }
      }
      return resultPosts;
    } else {
      return value;
    }
  }
}
