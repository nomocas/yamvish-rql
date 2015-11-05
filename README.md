# yamvish-rql

[RQL](https://github.com/persvr/rql) Array filtering, sorting and paging plugin for [yamvish](https://github.com/nomocas/yamvish).

## install

As it comes as an CommonJS module usable with browserify by example, simply install it with npm in your project folder, where you have previously installed yamvish.
```
npm i yamvish-rql --save
```

## Example 1

```javascript
var y = require('yamvish');
require('yamvish-rql');

var view = new y.View({
	data:{
		myArr : [
			{ title:'hello', flag:true }, 
			{ title:'world', flag:true },
			{ title:'helicopter', flag:false }
		]
	}
})
// filter 'myArr' (from context of course) with RQL and store result in 'myFilteredArr' (in context of course)
.rql('myArr', 'myFilteredArr', 'title=match=hel&flag')
// draw html from filtered array
.each('myFilteredArr', y().p('{{ title }}'))
// mount view somewhere
.mount('#anID');
```

## Example with interpolation

```javascript
var y = require('yamvish');
require('yamvish-rql');

var view = new y.View({
	data:{
		myArr : [{ title:'hello' }, { title:'world' }, { title:'helicopter' }],
		filterOn:''
	}
})
// filter 'myArr' with RQL interpolated with 'filterOn' values (from context) and store result in 'myFilteredArr'
.rql('myArr', 'myFilteredArr', 'title=match={{ filterOn }}')
// produce input that is binded to 'filterOn'
.input('text', '{{ filterOn }}')
// draw html from filtered array
.each('myFilteredArr', y().p('{{ title }}'))
// mount view somewhere
.mount('aSelector');
```

## RQL example with filtering and sorting then paging

```
myProp.foo=gt=2&sort(-address.zip,+rating)&limit({{ itemPerPage }},{{ startFrom }})
```

## As expression filter

var template = y().p('{{ myArr | rql("myProp=3&myVar=lt=8") }}');

## Licence

The [MIT](http://opensource.org/licenses/MIT) License

Copyright (c) 2015 Gilles Coomans <gilles.coomans@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

