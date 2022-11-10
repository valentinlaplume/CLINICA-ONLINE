import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPaciente',
})
export class FilterPacientePipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultPosts = [];

    if (arg != null) {
      console.log(value);

      for (const post of value) {
        if (
          post.especialidad.descripcion.toLowerCase().indexOf(arg) > -1 ||
          post.especialista.nombre.toLowerCase().indexOf(arg) > -1 ||
          post.especialista.apellido.toLowerCase().indexOf(arg) > -1
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
