const {Room, Booking} = require('./index');

const roomTemplate = {name: "RoomName", bookings: [], rate: 10000, discount: 0}
const bookingTemplate = {name: "Guest1", email: "guest1@test.com", checkIn: new Date('2024-01-01'), 
    checkOut: new Date('2024-01-31'), discount: 0, room:{}}

//#region isOccupied Test

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

//#endregion

//#region occupancyPercentage Test

//#endregion

//#region totalOccupancyPercentage Test

//#endregion

//#region availableRooms Test

//#endregion