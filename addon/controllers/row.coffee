`import Ember from 'ember';`

###*
* Table Row Array Proxy
* @class
* @alias Ember.Table.RowArrayProxy
###
RowArrayController = Ember.ArrayController.extend
  itemController: null
  content: null
  rowContent: Ember.computed( -> []).property()

  controllerAt: (idx, object, controllerClass) ->
    container = @get 'container'
    subControllers = @get '_subControllers'
    subController = subControllers[idx]

    return subController if subController
    subController = @get('itemController').create
      target: this
      parentController: @get('parentController') or this
      content: object
    subControllers[idx] = subController;
    return subController;


`export default RowArrayController`