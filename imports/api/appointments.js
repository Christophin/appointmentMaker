import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Appointments = new Mongo.Collection('appointments');

const availableHours = [
    { id: 0, text: '9am - 10am', name: '', phone: '',  createdAt: new Date(), scheduledBy: ''},
    { id: 1, text: '10am - 11am', name: '', phone: '' , createdAt: new Date(), scheduledBy: ''},
    { id: 2, text: '11am - 12pm', name: '', phone: '' , createdAt: new Date(), scheduledBy: ''},
    { id: 3, text: '12pm - 1pm', name: '', phone: '', createdAt: new Date(), scheduledBy: ''},
    { id: 4, text: '1pm - 2pm', name: '', phone: '', createdAt: new Date(), scheduledBy: ''},
    { id: 5, text: '2pm - 3pm', name: '', phone: '', createdAt: new Date(), scheduledBy: ''},
    { id: 6, text: '3pm - 4pm', name: '', phone: '', createdAt: new Date(), scheduledBy: ''},
    { id: 7, text: '4pm - 5pm', name: '', phone: '', createdAt: new Date(), scheduledBy: ''}
];
if(Meteor.isServer) {
    if(Appointments.find().count() === 0) {
        availableHours.forEach((hour) => {
            Appointments.insert(hour)
        })
    }
}

if (Meteor.isServer) {
    Meteor.publish('appointments', function appointmentsPublication() {
        return Appointments.find();
    });
}

Meteor.methods({
   'appointment.update'(name, phone, _id) {
       if (! Meteor.userId()) {
           throw new Meteor.Error('not-authorized');
       }
       check(name, String);
       check(phone, String);
       Appointments.update(_id, {
           $set: {
               name: name,
               phone: phone,
               createdAt: new Date(),
               scheduledBy: Meteor.user().username
           }
       })
   },
    'appointment.cancel'(_id) {
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Appointments.update(_id, {
            $set: {
                name: '',
                phone: '',
                scheduledBy: ''
            }
        })
    }
});