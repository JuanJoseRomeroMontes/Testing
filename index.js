class Room {
    constructor(object){
        this.name = object.name;
        this.bookings = object.bookings;
        this.rate = object.rate;
        this.discount = object.discount; 
    }

    isOccupied(date){
        if(!date || typeof date.getMonth !== 'function')
            return null;

        let occupied = false;

        this.bookings.forEach(booking => {
            if (date >= booking.checkIn && date < booking.checkOut) 
                occupied = true
        });

        return occupied;
    }

    occupancyPercentage(startDate, endDate){

        if(!startDate || typeof startDate.getMonth !== 'function' || !endDate || typeof endDate.getMonth !== 'function')
            return null;

        if(startDate >= endDate)
            return false;

        let totalDays = 0;
        let occupiedDays = 0;

        for (var d = new Date(startDate.getTime()); d <= endDate; d.setDate(d.getDate() + 1)) {
            totalDays++;

            if(this.isOccupied(d))
                occupiedDays++;
        }

        let percentage = occupiedDays/totalDays*100;
        percentage = Math.trunc(percentage);

        return percentage;
    }

    static totalOccupancyPercentage(rooms, startDate, endDate){
        if(!rooms || !Array.isArray(rooms))
            return null;

        let totalValue = 0;
         
        rooms.forEach(room => {
            const occupancy = room.occupancyPercentage(startDate, endDate);
            totalValue += occupancy;
        });

        return (totalValue/rooms.length);
    }

    static availableRooms(rooms, startDate, endDate){
        if(!rooms || !Array.isArray(rooms))
            return null;

        const availableRooms = [];

        rooms.forEach(room => {
            if(this.totalOccupancyPercentage([room], startDate, endDate) !== 100)
                {
                    availableRooms.push(room);
                }
        });

        return availableRooms;
    }
}

class Booking {
    constructor(object){
        this.name = object.name;
        this.email = object.email;
        this.checkIn = object.checkIn;
        this.checkOut = object.checkOut;
        this.discount = object.discount;
        this.room = object.room;
    }

    getFee(){
        if(!this.checkIn || typeof this.checkIn.getMonth !== 'function' || !this.checkOut || typeof this.checkOut.getMonth !== 'function')
            return null;

        if(this.checkIn >= this.checkOut)
            return false;

        const pricePerNigth = (this.room.rate * ((100 - this.room.discount)/100)) * ((100 - this.discount)/100);
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const diffDays = Math.round(Math.abs((this.checkIn - this.checkOut) / oneDay));

        return diffDays*pricePerNigth;
    }
}

module.exports = {
    Room, Booking
};