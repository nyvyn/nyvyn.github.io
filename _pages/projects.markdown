---

layout: page
title: Projects
permalink: /projects
---

<h4 class="uk-text-large uk-text-light uk-margin-remove-bottom">
Projects
</h4>
<h4 class="uk-text-lighter uk-margin-remove-top">
Software for sophisticates
</h4>
<hr class="uk-divider-small">
<ul class="uk-list uk-list-large uk-margin-medium-top">
{% for item in site.data.projects.docs %}
<li>
<div class="uk-flex uk-flex-middle">
<span data-uk-icon="icon: {{- item.icon -}}; ratio: 0.9"></span>
<a class="uk-link uk-margin-small-left" href="{{- item.url -}}">{{ item.name }}</a>
</div>
<span class="uk-display-block uk-text-light">{{ item.description }}</span>
</li>
{% endfor %}
</ul>