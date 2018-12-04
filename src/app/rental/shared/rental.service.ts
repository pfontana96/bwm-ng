import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';


@Injectable()
export class RentalService{
    private rentals : Rental[] = [
        {
          id: "1",
          title: 'Great Appartment',
          city:"Mendoza",
          street:'Emilio Civit 1735',
          category:'appartment',
          image: 'http://via.placeholder.com/350x250',
          beedrooms: 3,
          description: 'Nice appartment in city center with nice view.',
          dailyRate: 34,
          shared: false,
          createdAt: '27/11/18'
        },
        {
          id: "2",
          title: 'Huge House w/3 bedrooms',
          city:'Mendoza',
          street:'Aristides Villanueva 679',
          category:'house',
          image: 'http://via.placeholder.com/350x250',
          beedrooms: 3,
          description: 'Comfortable house with small garden in city center.',
          dailyRate: 50,
          shared: false,
          createdAt: '01/12/18'
        },
        {
          id: "3",
          title: 'Rooms in huge Condo',
          city:'Mendoza',
          street:'Belgrano 1893',
          category:'condo',
          image: 'http://via.placeholder.com/350x250',
          beedrooms: 5,
          description: 'Huge condo with plenty of rooms (shared bathroom). Breakfast included.',
          dailyRate: 13,
          shared: true,
          createdAt: '14/11/18'
        },
        {
          id: "4",
          title: 'Great Studio well located in quiet neighborhood',
          city:'Mendoza',
          street:'Av Godoy Cruz 340',
          category:'appartment',
          image: 'http://via.placeholder.com/350x250',
          beedrooms: 2,
          description: 'Nice appartment in quiet zone of city center.',
          dailyRate: 27,
          shared: false,
          createdAt: '25/11/18'
        }
      
    ];

    public getRentalById(rentalId:string): Observable<Rental>{
        return new Observable((observer) => {
            setTimeout(()=>{
                const foundRental = this.rentals.find((rental)=>{
                    return rental.id==rentalId;
                },500);
                observer.next(foundRental);
            })
        });
    }

    public getRentals(): Observable<Rental[]>{
        return new Observable<Rental[]>((observer) => {
            setTimeout(()=>{
                observer.next(this.rentals);
            }, 1000);
        });
    }
}