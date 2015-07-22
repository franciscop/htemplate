# Template system

A dead simple and tiny template system. Stop repeating yourself. But why?

- You don't want to learn a full framework for doing a simple list but using a `for` still requires too much work and special cases
- Cannot generate the html in the back-end (like with cordova)
- It was fun to make it and it's fun to use it



## Example

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
var products = ['apple', 'strawberry', 'pear', 'banana'];

template('template.product', products, function(product){
  this.querySelector('.title').innerHTML = product.name;
  this.querySelector('img').setAttribute('src', product.name + '.jpg');
}).into('.food');
```

jQuery makes it slightly easier:

```js
var products = ['apple', 'strawberry', 'pear', 'banana'];

template('template.product', products, function(product){
  // Remember the this to make it target only the current template
  $('.title', this).html(product.name);
  $('img', this).attr('src', product.name + '.jpg');
}).into('.food');
```


## Use it

Install it with bower:

    bower install htemplate

Or just download template.min.js and include it in your page:

```html
<script src="template.min.js"></script>
```


## Testing

A super small, non-comprehensive test is available in `test/index.html`. Download the repository and access it from your browser.
