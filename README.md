# Template system

A dead simple and tiny template system. Stop repeating yourself. But why?

- You don't want to learn a full framework for doing a simple list but using a `for` still requires too much work and special cases
- Cannot generate the html in the back-end (like with cordova)
- It was fun to make it and it's fun to use it


## Install it

Install it with bower:

    bower install htemplate

Or just download template.min.js and include it in your page:

```html
<script src="template.min.js"></script>
```


## Documentation

The main function is called `template`. You use it in this way:

```js
template(selector, data, callback);
```

It will return an instance of itself that should be used later on with either `appendTo` or `into` to push it to some section of the html. The arguments for `template` are:

### `selector`

This is the template itself. It can be a css selector or an html element. Examples:

```js
// Using a simple css selector
template('.profile', {});

// Using an element
var tpl = document.querySelector('.profile');
template(tpl, {});

// Using a complex selector with jQuery:
var tpl = $('.profile:not(.inactive)').first();
  template(tpl, {});
```

### `data`

The data that will fill your templates. This can be an `array` or a single variable. If you put it empty nothing will be added, in case that you just want to clone an element you can use an empty string or object like this: `''` or `{}`. Examples:

```js
// Using a simple string:
template('.profile', "Peter");

// Using an array of names:
template('.profile', ["Peter", "Martha", "John"]);

// Using an array of objects:
var people = [
  { name: "Peter", birthday: "15/03" },
  { name: "Martha", birthday: "26/08"},
  { name: "Martha", birthday: "21/11"}
];
template('.profile', people);
```

### `callback`

This defines the relationships between each of the elements from the data and the template. It is executed once per each of the data's array elements, once if data is a single element or never if data is null. It accepts 3 parameters, similarly to most of javascript's `Array` methods. The first one is the current element, second one current index and third one the whole data. It is highly relevant that `this` within this function will be the current template. But let's see it with few examples:

```js
// Let's display their birthdays
var people = [
  { name: "Peter", birthday: "15/03" },
  { name: "Martha", birthday: "26/08"},
  { name: "Martha", birthday: "21/11"}
];
template('.profile', people, function(person){
  this.querySelector('.name').innerHTML = person.name;
  this.querySelector('.birthday').innerHTML = person.birthday;
  });
```


### .into(selector)

Use it to indicate where to put the generated templates. It will overwrite anything already in there. The selector arguments behaves in the same way as the first argument of `template()`

```js
// Refresh the current profiles
template(...).into('.profiles');
```

### .appendTo(selector)

Use it to indicate where to put the generated templates. They will be appended to anything in there. The selector arguments behaves in the same way as the first argument of `template()`

```js
// Add more profiles
template(...).appendTo('.profiles');
```


## Small but complete example

To see other examples go to `/examples/index.html` in your browser and other examples will be shown. Now for a simple example, the html:

```html
<div class="food"></div>

<template class="product">
  <article class="card">
    <header>
      <h2 class="title"></h2>
    </header>
    <img>
  </article>
</template>
```

Then the javascript:

```js
// The list of products that you want to display
var products = ['apple', 'strawberry', 'pear', 'banana'];

// Use the library. What is the template, the products, and how they are related
template('template.product', products, function(product){
  this.querySelector('.title').innerHTML = product.name;
  this.querySelector('img').setAttribute('src', product.name + '.jpg');
}).into('.food');
```

jQuery makes it slightly easier:

```js
var products = ['apple', 'strawberry', 'pear', 'banana'];

template('template.product', products, function(product){
  // Remember to put "this" to make it target only the current template
  $('.title', this).html(product.name);
  $('img', this).attr('src', product.name + '.jpg');
}).into('.food');
```


## Testing

A super small, non-comprehensive test is available in `test/index.html`. Download the repository and access it from your browser.
