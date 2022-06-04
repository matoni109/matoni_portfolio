---
layout: page
title: Posts
permalink: /posts/
paginate:
  collection: posts

---
<ul class="post-list">
  {% for post in paginator.resources  %}
    <li>
     <a href="{{ post.relative_url }}">{{ post.title }}</a>
     <p> <sl-format-date date="{{post.date}}" month="long" day="numeric" year="numeric"></sl-format-date></p>
    </li>
  {% endfor %}
</ul>

{% render "page_selector", paginator: paginator, resource: resource %}


<!-- If you have a lot of posts, you may want to consider adding [pagination](https://www.bridgetownrb.com/docs/content/pagination)! -->
