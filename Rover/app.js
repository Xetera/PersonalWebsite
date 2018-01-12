import {NgModule} from '@angular/core';

let myApp = angular.module('myApp', []);


myApp.controller('mainController', function($scope){
    console.log($scope);
});

@NgModule({

})
export class AppModule {

}