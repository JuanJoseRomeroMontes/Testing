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
        
    }

    static availableRooms(rooms, startDate, endDate){
        
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

    getFee(date){

    }
}

module.exports = {
    Room, Booking
};