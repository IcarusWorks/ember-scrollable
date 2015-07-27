import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNameBindings: [':widget', ':performance', 'statusClass'],

  performance: null,
  paceIsExceptional: Ember.computed.oneWay('performance.paceIsExceptional'),
  isMoreThanOnPace: Ember.computed.oneWay('performance.isMoreThanOnPace'),
  isOnPace: Ember.computed.oneWay('performance.isOnPace'),
  currentMonthCreditCount: Ember.computed.oneWay('performance.currentMonthCreditCount'),
  monthlyTarget: Ember.computed.oneWay('performance.monthlyTarget'),
  onPaceCreditTarget: Ember.computed.oneWay('performance.onPaceCreditTarget'),
  hasTeamMemberFilter: Ember.computed.oneWay('isTeamView'),

  statusClass: Ember.computed('paceIsExceptional', 'isMoreThanOnPace', 'isOnPace', function() {
    if (this.get('paceIsExceptional')) {
      return 'exceptional';
    } else if (this.get('isMoreThanOnPace')) {
      return 'more-than-on-pace';
    } else if (this.get('isOnPace')) {
      return 'on-pace';
    } else {
      return null;
    }
  }),

  progress: Ember.computed('_maxCreditCount', 'currentMonthCreditCount', function() {
    return this.get('currentMonthCreditCount') / this.get('_maxCreditCount');
  }),

  targetRatio: Ember.computed('monthlyTarget', '_maxCreditCount', function() {
    return this.get('monthlyTarget') / this.get('_maxCreditCount');
  }),

  paceRatio: Ember.computed('onPaceCreditTarget', '_maxCreditCount', function() {
    return this.get('onPaceCreditTarget') / this.get('_maxCreditCount');
  }),

  monthlyTargetTitle: Ember.computed('monthlyTarget', function() {
    return `Target: ${this.get('monthlyTarget')}`;
  }),

  onPaceCreditTargetTitle: Ember.computed('onPaceCreditTarget', function() {
    return `On Pace: ${this.get('onPaceCreditTarget')}`;
  }),

  currentMonthCreditCountTitle: Ember.computed('currentMonthCreditCount', function() {
    return `Credits: ${this.get('_roundedCurrentMonthCreditCount')}`;
  }),

  _roundedCurrentMonthCreditCount: Ember.computed('currentMonthCreditCount', function() {
    return Math.round(this.get('currentMonthCreditCount') * 10) / 10;
  }),

  _setupTooltipster: Ember.on('didInsertElement', function() {
    Ember.run.schedule('afterRender', () => {
      this.$().hover(() => {
        this.$('.tooltipstered').tooltipster('show');
      }, () => {
        this.$('.tooltipstered').tooltipster('hide');
      });
    });
  }),

  _maxCreditCount: Ember.computed('monthlyTarget', function() {
    return this.get('monthlyTarget') * 2;
  })
});