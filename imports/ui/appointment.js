import {Template} from "meteor/templating";
import './appointment.html'

Template.appointment.onRendered(() => {
    $('.modal').modal();
    Materialize.updateTextFields();
});

Template.appointment.events({
    'click .appointmentHandler' () {
        event.preventDefault();
        const name = $(`#name${this.id}`).val();
        if(!name) {
            Materialize.toast("You must provide a name.", 3500);
            return
        }
        const phone = $(`#phone${this.id}`).val();
        if(phone.length < 10) {
            Materialize.toast("You must provide a valid phone number.", 3500);
            return
        }
        Meteor.call('appointment.update', name, phone, this._id, (e) => {
            if(e) {
                Materialize.toast(e, 4000)
            } else {
                $(`#modal${this.id}`).modal('close');
                Materialize.updateTextFields();
                Materialize.toast("Your appointment has been scheduled", 4000)
            }
        });
    },
    'click .cancelHandler' () {
        event.preventDefault();
        Meteor.call('appointment.cancel', this._id, (e) => {
            if(e) {
                Materialize.toast(e, 4000)
            } else {
                Materialize.updateTextFields();
                Materialize.toast("Your appointment has been canceled", 4000)
            }
        });
    }
});

Template.appointment.helpers({
    isScheduled: function() {
        if(this.name) {
            return "red-text grey lighten-2"
        } else {
            return "white-text teal lighten-1"
        }
    }
});