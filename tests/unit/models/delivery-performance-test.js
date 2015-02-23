import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('delivery-performance', 'DeliveryPerformance', {
  needs: [
    'model:user'
  ],

  beforeEach: function() {
    Timecop.install();

    this.model = this.subject();
  },

  afterEach: function() {
    Timecop.uninstall();
  }
});

test('#onPaceCreditTarget', function() {
  // Five weekdays prior to February 8 of a possible total of 20 weekdays.
  // Therefore 25% of the month has been completed.
  Timecop.freeze(new Date(2015, 1, 8, 0, 0));

  Ember.run(() => {
    this.model.set('monthlyTarget', 30);
  });

  equal(
    this.model.get('onPaceCreditTarget'), 7.5,
    'calculates the on pace credit target, rounded to the nearest tenth'
  );
});

test('#weekdayHoursSinceBeginningOfMonth', function() {
  // February 1, 7, 8 were weekend days. leaving five full weekdays.
  // The current day, February 9, was a Monday and 12 hours had passed.
  Timecop.freeze(new Date(2015, 1, 9, 12, 0));
  var weekdayHours = (5 * 24) + 12;

  equal(
    this.model.weekdayHoursSinceBeginningOfMonth(), weekdayHours,
    'correctly calculates weekday hours including previous hours of the current day'
  );
});

test('#totalWeekdayHoursInCurrentMonth', function() {
  // There are 20 weekdays in the month of February.
  // http://www.wolframalpha.com/input/?i=number+of+weekdays+in+February+2015
  Timecop.freeze(new Date(2015, 1, 20, 12, 0));
  var weekdayHoursInMonth = 20 * 24;

  equal(
    this.model.totalWeekdayHoursInCurrentMonth(), weekdayHoursInMonth,
    'correctly calculates the number of weekday hours in the current month'
  );
});

test('#monthCompletionProgress', function() {
  // Five weekdays prior to February 8 of a possible total of 20 weekdays.
  Timecop.freeze(new Date(2015, 1, 8, 0, 0));
  var monthProgress = 120 / 480;

  equal(
    this.model.monthCompletionProgress(), monthProgress,
    'correctly calculates how far along the month has completed'
  );
});

test('#numberOfWeekdayHoursUntil', function() {
  // February 1, 7, 8 were weekend days, leaving five weekdays before February 8.
  Timecop.freeze(new Date(2015, 1, 8, 0, 0));
  var totalHours = 5 * 24;

  equal(
    this.model.numberOfWeekdayHoursUntil(8), totalHours,
    'correctly calculates weekday hours by excluding weekends'
  );
});

test('#hoursSinceTodaysStart', function() {
  // February 20, 2015 12pm
  Timecop.freeze(new Date(2015, 1, 20, 12, 0));

  equal(
    this.model.hoursSinceTodaysStart(), 12,
    "correctly calculates the number of hours since the day's start"
  );
});

test('#hoursSinceTodaysStart', function() {
  // February 20, 2015 12:29pm
  Timecop.freeze(new Date(2015, 1, 20, 12, 29));

  equal(
    this.model.hoursSinceTodaysStart(), 12,
    "correctly handles rounding down the number of hours since the day's start"
  );
});

test('#hoursSinceTodaysStart', function() {
  // February 20, 2015 11:30pm
  Timecop.freeze(new Date(2015, 1, 20, 11, 30));

  equal(
    this.model.hoursSinceTodaysStart(), 12,
    "correctly handles rounding up the number of hours since the day's start"
  );
});
