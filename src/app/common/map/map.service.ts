import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CamelizePipe } from 'ngx-pipes';


//declare var google:any;

@Injectable()
export class MapService {

    private geocoder;
    private locationCached: any = {
    };

    constructor(private camelizePipe : CamelizePipe){

    };

    private cacheLocation(location: string, coordinates: any){
        this.locationCached[this.camelizePipe.transform(location)] = coordinates;
    }

    private isLocationCached(location: string): boolean{
        return this.locationCached[this.camelizePipe.transform(location)];
    }

    private geoCodeLocation(location: string): Observable<any>{
        /*Get the GeoCoder from the google.maps API*/
        if(!this.geocoder){
            this.geocoder = new (<any>window).google.maps.Geocoder();
        }
        return new Observable((observer) => {
            this.geocoder.geocode({address:location}, (result, status) => {
                if(status == (<any>window).google.maps.GeocoderStatus.OK){
                    /*If the response from the API is succesfull */
                    const geometry = result[0].geometry.location;
                    const coordinates ={lat: geometry.lat(), lng: geometry.lng()}; 
                    this.cacheLocation(location, coordinates);
                    observer.next(coordinates);
                }else{
                    observer.error('Location could not be found');
                }
            });
        });
    }

    public getGeoLocation(location: string): Observable<any>{

        if(this.isLocationCached(location)){
            return new Observable((observer) => {
                observer.next(this.locationCached[this.camelizePipe.transform(location)]);
            });
        }else{
            return this.geoCodeLocation(location);
        }
        /*public geoCodeLocation(location:string): Observable<any>{
            console.log('Getting Address - '+ location);
            this.geocoder = new google.maps.Geocoder();
            return new Observable((observer) => {
                this.geocoder.geocode({'address':location}, (results,status)=>{
                    if(status == google.maps.GeoCoderStatus.OK){
                        const geometry = results[0].geometry.location;
                        observer.next({lat: geometry.lat(), lng:geometry.lng()});
                    }else{
                        console.log('Error - ', results, ' & Status - ', status);
                        observer.error('Location could not be found');
    
                    }
                });
                
            });
        }*/
    }
        
}

