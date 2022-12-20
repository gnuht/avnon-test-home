import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {BuilderService} from "../services";

@Injectable({
  providedIn: 'root'
})
export class AnswersGuard implements CanActivate {
  constructor(private builderService: BuilderService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.builderService.currentBuilderState$.pipe(
      map(value => !!value.length),
      take(1)
    );
  }

}
