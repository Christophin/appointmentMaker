import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Appointments } from '../api/appointments.js';
import './body.html';
import './appointment.js'

Template.body.onCreated(function bodyOnCreated() {
    Meteor.subscribe('appointments');
});

Template.body.helpers({
    appointments() {
        return Appointments.find({});
    },
});