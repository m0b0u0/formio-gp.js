---
title: PDF Form
layout: vtabs
section: examples
weight: 18
---
```html
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div id="formio"></formio>
```

```js
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/w4', {
  zoom: '-20'
});
```

<div class="card card-body bg-light">
<div id="formio"></div>
<script type="text/javascript">
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/w4', {
  zoom: '-20'
});
</script>
</div>
