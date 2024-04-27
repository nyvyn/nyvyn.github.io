---
layout: home
title: Home
permalink: /
---

<div class="uk-grid-large uk-child-width-expand@s" data-uk-grid>
    <div class="uk-width-3-5@m">
        <h4 class="uk-text-large uk-text-light uk-margin-remove-bottom">
            Recent writing
        </h4>
        <h4 class="uk-text-lighter uk-margin-remove-top">
            Thoughts and ideas; rarely rants
        </h4>
        <hr class="uk-divider-small">
        <div class="uk-margin-medium-top">
        {% include posts.html limit=1 full=true %}
        </div>
    </div>
    <div>
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
                        <a class="uk-margin-small-left" href="{{- item.url -}}">{{ item.name }}</a>
                    </div>
                    <span class="uk-display-block uk-text-light">{{ item.description }}</span>
                </li>
            {% endfor %}
        </ul>
    </div>
</div>