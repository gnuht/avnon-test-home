import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Question} from "../shared";

@Injectable({
  providedIn: 'root'
})
export class BuilderService {

  private builderState$ = new BehaviorSubject<Omit<Question, 'isRequired' | 'options'>[]>([]);
  currentBuilderState$ = this.builderState$.asObservable();

  changeBuilderState(value: Omit<Question, 'isRequired' | 'options'>[]): void {
    this.builderState$.next(value);
  }
}
