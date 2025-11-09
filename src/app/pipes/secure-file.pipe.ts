import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map } from "rxjs/operators";
import { environment } from "environments/environment";
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'secure'
})
export class SecureFilePipe implements PipeTransform {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  transform(url: string): Observable<SafeUrl> {

    if(!url || typeof url != 'string') return of(url);

    const isApiUrl = url?.startsWith(environment.Config.ApiConfig.BackendApiUrl);

    if (!isApiUrl) return of(url);

    return this.http
        .get(url, {responseType: 'blob'})
        .pipe(
            map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)))
        );
  }

}


/******
 * If yor image is secured, and you want to send the http get with the token via http interceptor
 * <img (error)="resourceImage($event)" [src]="resourceImage() | secure | async" alt="alt" height="170"/>
 * */
