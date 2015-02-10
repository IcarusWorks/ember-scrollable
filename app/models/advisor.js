import DS from 'ember-data';

export default DS.Model.extend({
  avatarUrl: DS.attr('string'),
  companyName: DS.attr('string'),
  emails: DS.attr(),
  interactions: DS.hasMany('interaction', { async: true }),
  jobTitle: DS.attr('string'),
  name: DS.attr('string'),
  phoneNumbers: DS.attr(),

  currentPosition: function() {
    var jobTitle = this.get('jobTitle');
    var companyName = this.get('companyName');

    if (jobTitle && companyName) {
      return `${jobTitle} at ${companyName}`;
    } else if (jobTitle) {
      return jobTitle;
    } else if (companyName) {
      return companyName;
    } else {
      return '';
    }
  }.property('jobTitle', 'companyName')
});
