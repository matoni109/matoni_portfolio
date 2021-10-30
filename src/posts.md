---
layout: page
title: Posts
permalink: /posts/
paginate:
  collection: posts

---
<ul>
  {% for post in paginator.resources  %}
    <li>
      <a href="{{ post.relative_url }}">{{ post.title }}</a>
      <p>   {{ post.date | date: "%Y-%m-%d" }} </p>
    </li>
  {% endfor %}
</ul>

<script>
  const checkbox = document.querySelector('sl-checkbox');
  checkbox.addEventListener('sl-change', event => {
    console.log(event.target.checked ? 'checked' : 'not checked');
  });
</script>

{% render "page_selector", paginator: paginator, resource: resource %}


If you have a lot of posts, you may want to consider adding [pagination](https://www.bridgetownrb.com/docs/content/pagination)!
