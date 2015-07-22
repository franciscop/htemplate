# Template system

A dead simple and tiny template system. Stop repeating yourself. But why?

- You don't want to learn a full framework for doing a simple list but using a `for` still requires too much work and special cases
- Cannot generate the html in the back-end (like with cordova)
- It was fun to make it and it's fun to use it



## Small example

First, your html:

    <div class="food"></div>

    <template class="product">
      <article class="card">
        <header>
          <h2 class="title"></h2>
        </header>
        <img>
      </article>
    </template>

Then your javascript:

    var products = ['apple', 'strawberry', 'pear', 'banana'];

    template('template.product', products, function(product){
      this.querySelector('.title').innerHTML = product.name;
      this.querySelector('img').setAttribute('src', product.name + '.jpg');
      }).into('.food');


## Use it

Just download template.min.js and include it in your page:

    <script src="template.min.js"></script>

Bower is coming


## Testing

A super small, non-comprehensive test is available in `test/index.html`. Download the repository and access it from your browser.
