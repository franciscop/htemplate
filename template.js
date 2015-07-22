// Mini template library
var template = function(selector, data, callback){

  if (!(this instanceof template)) {
    return new template(selector, data, callback);
    }

  this.selector = selector;
  this.data = data;
  this.callback = callback;

  var self = this;


  // Give flexibility to a selector/element
  function select(selector){
    return typeof selector == 'string' ?
      document.querySelector(selector) :
      selector;
  }

  // Parse the data using the template, data and callback into partial templates
  this.parse = function(){

    // Select the template from the content
    this.template = select(this.selector).content;

    // Make sure we're dealing with an array of things for mapping
    this.data = Array.isArray(this.data) ? this.data : [this.data];

    // Default callback is an empty function
    this.callback = this.callback || function(){};

    var self = this;

    return this.data.map(function(data, index){

      // Generate the template into fragment
      var fragment = self.template.cloneNode(true);
      self.callback.call(fragment, data, index);
      return fragment;
    });
  };

  // Allow to append the object
  this.appendTo = function(selector){

    // Find out the real selector
    var where = select(selector);

    // We need to fill the templates with the data first
    // Note: this is 100x faster than doing forEach() inside parse()
    self.parse().forEach(function(data, index){

      // Append it in the proper place
      where.appendChild(data);
    });

    return self;
  };

  // Replace the content of selector with the current elements
  this.into = function(selector) {

    // Delete the previous content
    select(selector).innerHTML = '';

    // And add the new one, reusing the appendTo()
    self.appendTo(selector);

    return self;
  };

  // Allow simple chaining with .array, .appendTo() or into()
  return this;
};
