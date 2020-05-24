import { HttpClient } from '@angular/common/http';
import { delay, take } from 'rxjs/operators';

export class CrudService<T> {

    constructor(public http: HttpClient, public API_URL) { }

    list(){
        return this.http.get<T[]>(this.API_URL)
        .pipe(delay(2000));
      }
    
      loadByID(id){
        return this.http.get<T>(this.API_URL+'/'+id).pipe(take(1));
      }
    
      private create(curso){
        return this.http.post(this.API_URL, curso).pipe(take(1));
      }
    
      private update(curso){
        return this.http.put(this.API_URL+'/'+curso.id, curso).pipe(take(1));
      }
    
      save(curso){
        console.log(curso.id);
        if(curso.id){
          return this.update(curso);
        }else{
          return this.create(curso);
        }
      }
    
      delete(id){
        return this.http.delete(this.API_URL+'/'+id, id).pipe(take(1));
      }
}
