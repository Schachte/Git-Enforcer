/**
  Handle registration of event handlers in singleton
*/
let EventRegistrar = (function () {
  var instance;

  function createRegistrar() {
    let registeredEvents = {};
    return return registeredEvents;
  }

  return {
    getRegistrar: function() {
      if (!instance) {
        instance = createRegistrar();
        return instance;
      }
    }
  }
})
