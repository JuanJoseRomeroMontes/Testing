const {Room, Booking} = require('./index');

const roomTemplate = {name: "RoomName", bookings: [], rate: 10000, discount: 0}
const bookingTemplate = {name: "Guest1", email: "guest1@test.com", checkIn: new Date('2024-01-01'), 
    checkOut: new Date('2024-01-31'), discount: 0, room:{}}

describe('\nTesting isOccupied method:', () => {
    test('Check day before', () => {
        const room = new Room({...roomTemplate});
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room});
        room.bookings = [booking1, booking2, booking3];

        expect(room.isOccupied(new Date('2024-01-01'))).toEqual(false);
    });

    test('Check day after', () => {
        const room = new Room({...roomTemplate});
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room});
        room.bookings = [booking1, booking2, booking3];

        expect(room.isOccupied(new Date('2024-01-15'))).toEqual(false);
    });

    test('Check day in', () => {
        const room = new Room({...roomTemplate});
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-14'), room:room});
        room.bookings = [booking1, booking2, booking3];

        expect(room.isOccupied(new Date('2024-01-13'))).toEqual(true);
        expect(room.isOccupied(new Date('2024-01-05'))).toEqual(true);
    });

    test('Check first day', () => {
        const room = new Room({...roomTemplate});
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-09'), room:room});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-14'), room:room});
        room.bookings = [booking1, booking2, booking3];

        expect(room.isOccupied(new Date('2024-01-08'))).toEqual(true);
    });

    test('Check last day', () => {
        const room = new Room({...roomTemplate});
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-09'), room:room});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-14'), room:room});
        room.bookings = [booking1, booking2, booking3];

        expect(room.isOccupied(new Date('2024-01-09'))).toEqual(false);
    });

    test('Check non truthy value', () => {
        const room = new Room({...roomTemplate});
        expect(room.isOccupied()).toBeNull();
    });

    test('Check non Date value', () => {
        const room = new Room({...roomTemplate});
        expect(room.isOccupied("1 de Enero de 2024")).toBeNull();
    });

    test('Check non Date object', () => {
        const room = new Room({...roomTemplate});
        expect(room.isOccupied({})).toBeNull();
    });
});

describe('\nTesting occupancyPercentage method:', () => {
    test('Check first week', () => {
        const room = new Room({...roomTemplate});
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room});
        room.bookings = [booking1, booking2, booking3];

        expect(room.occupancyPercentage(new Date('2024-01-01'), new Date('2024-01-07'))).toEqual(57);
    });

    test('Check month', () => {
        const room = new Room({...roomTemplate});
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room});
        room.bookings = [booking1, booking2, booking3];

        expect(room.occupancyPercentage(new Date('2024-01-01'), new Date('2024-01-31'))).toEqual(25);
    });

    test('Check late checkIn', () => {
        const room = new Room({...roomTemplate});
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room});
        room.bookings = [booking1, booking2, booking3];

        expect(room.occupancyPercentage(new Date('2024-01-05'), new Date('2024-01-01'))).toEqual(false);
    });

    test('Check non truthy value', () => {
        const room = new Room({...roomTemplate});
        expect(room.occupancyPercentage()).toBeNull();
    });

    test('Check non Date value', () => {
        const room = new Room({...roomTemplate});
        expect(room.occupancyPercentage("1 de Enero de 2024", "31 de Enero de 2024")).toBeNull();
    });

    test('Check non Date object', () => {
        const room = new Room({...roomTemplate});
        expect(room.occupancyPercentage({},{})).toBeNull();
    });
});

describe('\nTesting totalOccupancyPercentage method:', () => {
    test('Check all rooms for all month value', () => {
        const room1 = new Room({...roomTemplate, });
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room1});
        room1.bookings = [booking1];

        const room2 = new Room({...roomTemplate});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room2});
        room2.bookings = [booking2];

        const room3 = new Room({...roomTemplate});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room3});
        room3.bookings = [booking3];

        const rooms = [room1, room2, room3];

        expect(Room.totalOccupancyPercentage(rooms, new Date('2024-01-01'), new Date('2024-01-31'))).toEqual(8);
    });

    test('Check all rooms for first week', () => {
        const room1 = new Room({...roomTemplate, });
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room1});
        room1.bookings = [booking1];

        const room2 = new Room({...roomTemplate});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room2});
        room2.bookings = [booking2];

        const room3 = new Room({...roomTemplate});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room3});
        room3.bookings = [booking3];

        const rooms = [room1, room2, room3];

        expect(Room.totalOccupancyPercentage(rooms, new Date('2024-01-01'), new Date('2024-01-07'))).toEqual(19);
    });

    test('Check room 1 for all month value', () => {
        const room1 = new Room({...roomTemplate, });
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room1});
        room1.bookings = [booking1];

        const room2 = new Room({...roomTemplate});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room2});
        room2.bookings = [booking2];

        const room3 = new Room({...roomTemplate});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room3});
        room3.bookings = [booking3];

        const rooms = [room1];

        expect(Room.totalOccupancyPercentage(rooms, new Date('2024-01-01'), new Date('2024-01-31'))).toEqual(12);
    });

    test('Check room 2 and 3 for all month value', () => {
        const room1 = new Room({...roomTemplate, });
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room1});
        room1.bookings = [booking1];

        const room2 = new Room({...roomTemplate});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room2});
        room2.bookings = [booking2];

        const room3 = new Room({...roomTemplate});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room3});
        room3.bookings = [booking3];

        const rooms = [room2, room3];

        expect(Room.totalOccupancyPercentage(rooms, new Date('2024-01-01'), new Date('2024-01-31'))).toEqual(6);
    });

    test('Check late chekIn', () => {
        const room1 = new Room({...roomTemplate, });
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room1});
        room1.bookings = [booking1];

        const room2 = new Room({...roomTemplate});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room2});
        room2.bookings = [booking2];

        const room3 = new Room({...roomTemplate});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room3});
        room3.bookings = [booking3];

        const rooms = [room1, room2, room3];

        expect(Room.totalOccupancyPercentage(rooms, new Date('2024-01-31'), new Date('2024-01-01'))).toBeNull;
    });

    test('Check non truthy value', () => {
        expect(Room.totalOccupancyPercentage()).toBeNull;
    });

    test('Check non Array value', () => {
        expect(Room.totalOccupancyPercentage("Array", new Date('2024-01-01'), new Date('2024-01-31'))).toBeNull;
    });

    test('Check non Array object', () => {
        expect(Room.totalOccupancyPercentage({}, new Date('2024-01-01'), new Date('2024-01-31'))).toBeNull;
    });
});

describe('\nTesting availableRooms method:', () => {
    test('Check all rooms for the first two days', () => {
        const room1 = new Room({...roomTemplate, });
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room1});
        room1.bookings = [booking1];

        const room2 = new Room({...roomTemplate});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room2});
        room2.bookings = [booking2];

        const room3 = new Room({...roomTemplate});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room3});
        room3.bookings = [booking3];

        const rooms = [room1, room2, room3];

        expect(Room.availableRooms(rooms, new Date('2024-01-01'), new Date('2024-01-02'))).toEqual([room1, room2, room3]);
    });

    test('Check all rooms for 03-06', () => {
        const room1 = new Room({...roomTemplate, });
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room1});
        room1.bookings = [booking1];

        const room2 = new Room({...roomTemplate});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room2});
        room2.bookings = [booking2];

        const room3 = new Room({...roomTemplate});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room3});
        room3.bookings = [booking3];

        const rooms = [room1, room2, room3];

        expect(Room.availableRooms(rooms, new Date('2024-01-03'), new Date('2024-01-06'))).toEqual([room2, room3]);
    });

    test('Check all rooms 1 and 2 for 03-06', () => {
        const room1 = new Room({...roomTemplate, });
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room1});
        room1.bookings = [booking1];

        const room2 = new Room({...roomTemplate});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room2});
        room2.bookings = [booking2];

        const room3 = new Room({...roomTemplate});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room3});
        room3.bookings = [booking3];

        const rooms = [room1, room2];

        expect(Room.availableRooms(rooms, new Date('2024-01-03'), new Date('2024-01-06'))).toEqual([room2]);
    });

    test('Check no rooms for any day', () => {
        const room1 = new Room({...roomTemplate, });
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room1});
        room1.bookings = [booking1];

        const room2 = new Room({...roomTemplate});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room2});
        room2.bookings = [booking2];

        const room3 = new Room({...roomTemplate});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room3});
        room3.bookings = [booking3];

        const rooms = [];

        expect(Room.availableRooms(rooms, new Date('2024-01-01'), new Date('2024-01-31'))).toEqual([]);
    });

    test('Check non truthy value', () => {
        expect(Room.availableRooms()).toBeNull;
    });

    test('Check non Array value', () => {
        expect(Room.availableRooms("Array", new Date('2024-01-01'), new Date('2024-01-31'))).toBeNull;
    });

    test('Check non Array object', () => {
        expect(Room.availableRooms({}, new Date('2024-01-01'), new Date('2024-01-31'))).toBeNull;
    });
});

