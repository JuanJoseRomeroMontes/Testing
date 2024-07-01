class Room {
    constructor(object){
        this.name = object.name;
        this.bookings = object.bookings;
        this.rate = object.rate;
        this.discount = object.discount; 
    }

    isOccupied(date){
        let occupied = false;

        this.bookings.forEach(booking => {
            if (date >= booking.checkIn && date < booking.checkOut) 
                occupied = true
        });

        return occupied;
    }

    occupancyPercentage(startDate, endDate){
        
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