Col_CalEvents = new Mongo.Collection('calevents');


if (Meteor.isClient) {

    Template.main.rendered = function() {


        var calendar = $("#calendar").fullCalendar({
            dayClick: function (date, allday, jsEvent, view) {
              var calendarEvent = {};
                calendarEvent.start = date;
                calendarEvent.end = date;
                calendarEvent.title ="New event";
                calendarEvent.owner = Meteor.userId();

                Meteor.call('saveCalEvent', calendarEvent); // call to server function

            },
            events: function (start, end, callback) {

                var calEvents = CalEvents.find({},{reactive:false}).fetch();
                callback(calEvents);
            }
        })


    } // Template main render end

}

if (Meteor.isServer) {

    Meteor.startup(function () {

        Meteor.methods({
                'saveCalEvent': function (ce) {
                    CalEvents.insert(ce);

                }

            }
        )

    });

}
