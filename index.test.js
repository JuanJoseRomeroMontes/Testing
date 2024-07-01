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
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room});
        room.bookings = [booking1, booking2, booking3];

        expect(room.isOccupied()).toBeNull();
    });

    test('Check non Date value', () => {
        const room = new Room({...roomTemplate});
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room});
        room.bookings = [booking1, booking2, booking3];

        expect(room.isOccupied("1 de Enero de 2024")).toBeNull();
    });

    test('Check non Date object', () => {
        const room = new Room({...roomTemplate});
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room});
        room.bookings = [booking1, booking2, booking3];

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
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room});
        room.bookings = [booking1, booking2, booking3];

        expect(room.occupancyPercentage()).toBeNull();
    });

    test('Check non Date value', () => {
        const room = new Room({...roomTemplate});
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room});
        room.bookings = [booking1, booking2, booking3];

        expect(room.occupancyPercentage("1 de Enero de 2024", "31 de Enero de 2024")).toBeNull();
    });

    test('Check non Date object', () => {
        const room = new Room({...roomTemplate});
        const booking1 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-03'), checkOut: new Date('2024-01-07'), room:room});
        const booking2 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-08'), checkOut: new Date('2024-01-10'), room:room});
        const booking3 = new Booking({...bookingTemplate, checkIn: new Date('2024-01-11'), checkOut: new Date('2024-01-13'), room:room});
        room.bookings = [booking1, booking2, booking3];

        expect(room.occupancyPercentage({},{})).toBeNull();
    });
});

//#region totalOccupancyPercentage Test

//#endregion

//#region availableRooms Test

//#endregion