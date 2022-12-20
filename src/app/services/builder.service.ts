import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Answer} from "../shared/models";

@Injectable({
  providedIn: 'root'
})
export class BuilderService {

  private builderState$ = new BehaviorSubject<Answer[]>([]);
  currentBuilderState$ = this.builderState$.asObservable();

  changeBuilderState(value: Answer[]): void {
    this.builderState$.next(value);
  }
}
