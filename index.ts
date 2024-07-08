interface RoomInterface {
    name:string;
    bookings:Booking[];
    rate:number;
    discount:number;
}

interface BookingInterface {
    name: string;
    email: string;
    checkIn: Date;
    checkOut: Date;
    discount: number;
    room: Room;
}

class Room  implements RoomInterface{
    name:string;
    bookings:Booking[];
    rate:number;
    discount:number;

    constructor(roomConstructor:RoomInterface){
        this.name = roomConstructor.name;
        this.bookings = roomConstructor.bookings;
        this.rate = roomConstructor.rate;
        this.discount = roomConstructor.discount;
    }

    isOccupied(date: Date): boolean{

        let occupied = false;

        this.bookings.forEach(booking => {
            if (date >= booking.checkIn && date < booking.checkOut) 
                occupied = true
        });

        return occupied;
    }

    occupancyPercentage(startDate:Date, endDate:Date): number{
        if(startDate >= endDate)
            throw new RangeError ();

        let totalDays:number = 0;
        let occupiedDays:number = 0;

        for (var d:Date = new Date(startDate.getTime()); d <= endDate; d.setDate(d.getDate() + 1)) {
            totalDays++;

            if(this.isOccupied(d))
                occupiedDays++;
        }

        let percentage:number = occupiedDays/totalDays*100;
        percentage = Math.floor(percentage);

        return percentage;
    }

    static totalOccupancyPercentage(rooms:Room[], startDate:Date, endDate:Date){

        let totalValue:number = 0;
        rooms.forEach(room => {
            const occupancy:number = room.occupancyPercentage(startDate, endDate);
            totalValue += occupancy;
        });

        return (totalValue/rooms.length);
    }

    static availableRooms(rooms:Room[], startDate:Date, endDate:Date):Room[]{

        const availableRooms:Room[] = [];
        rooms.forEach(room => {
            if(this.totalOccupancyPercentage([room], startDate, endDate) !== 100)
                {
                    availableRooms.push(room);
                }
        });

        return availableRooms;
    }
}

class Booking implements BookingInterface{
    name: string;
    email: string;
    checkIn: Date;
    checkOut: Date;
    discount: number;
    room: Room;

    constructor(bookingInterface: BookingInterface){
        this.name = bookingInterface.name;
        this.email = bookingInterface.email;
        this.checkIn = bookingInterface.checkIn;
        this.checkOut = bookingInterface.checkOut;
        this.discount = bookingInterface.discount;
        this.room = bookingInterface.room;
    }

    getFee():number{

        if(this.checkIn >= this.checkOut)
            throw new RangeError();

        const pricePerNigth:number = (this.room.rate * ((100 - this.room.discount)/100)) * ((100 - this.discount)/100);
        const oneDay:number = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const diffDays:number = Math.round(Math.abs((this.checkIn.getTime() - this.checkOut.getTime()) / oneDay));

        return diffDays*pricePerNigth;
    }
}

module.exports = {
    Room, Booking
};