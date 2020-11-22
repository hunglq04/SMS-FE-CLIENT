import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

import { LoadingService, LoadingOverlayRef } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = sessionStorage.getItem('token');

    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', token) });
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    let loadingRef: LoadingOverlayRef;

    // This is a little hacky and related to change detection (ExpressionChangedAfterItHasBeenCheckedError).
    // More informations here:
    // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4

    Promise.resolve(null).then(() => loadingRef = this.loadingService.open());

    return next.handle(req).do(event => {
      if (event instanceof HttpResponse && loadingRef) {
        loadingRef.close();
      }
    }).catch(error => {
      if (loadingRef) {
        loadingRef.close();
      }
      if (error.status === 403) {
        window.location.href = '/login'
        sessionStorage.clear();
      }
      console.error('Error when call BE', error);
      return Observable.throw(error);
    });
  }
}
