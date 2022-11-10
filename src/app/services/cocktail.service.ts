import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  constructor(public httpClient:HttpClient) { }

  getCocktailRandom(){
    return this.httpClient.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
  }



}
