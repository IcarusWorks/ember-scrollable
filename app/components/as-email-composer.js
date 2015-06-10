import Ember from 'ember';
import notify from 'phoenix/helpers/notify';

export default Ember.Component.extend({
  classNameBindings: [':email-composer'],
  model: null,
  selectedTemplate: null,
  isEditingHeader: false,

  initializeDefaults: Ember.on('init', function() {
    if (this.get('templates') == null) {
      this.set('templates', []);
    }
  }),

  onSelectedTemplateDidChange: Ember.observer('selectedTemplate', function() {
    this.set('model.body', this.get('selectedTemplate.body'));
  }),

  actions: {
    send: function() {
      this.get('model').save().then(() => {
        notify(`Your email to ${this.get('model.from')} has been delivered.`);
      }).catch(function() {
        notify('There has been an error delivering your email.', 'error');
      });
    },

    toggleIsEditingHeader: function() {
      this.toggleProperty('isEditingHeader');
    }
  }
});
