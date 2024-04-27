---
layout: home
title: Home
permalink: /
---

<div class="uk-grid-large uk-child-width-expand@s" data-uk-grid>
    <div class="uk-width-3-5@s">
        <a class="uk-link" href="/writing">
            <h4 class="uk-text-large uk-text-light uk-margin-remove-bottom">
                Writing <span data-uk-icon="arrow-right"></span>
            </h4>
        </a>
        <h4 class="uk-text-lighter uk-margin-remove-top">
            Thoughts and ideas; rarely rants
        </h4>
        <hr class="uk-divider-small">

        <div class="uk-margin-medium-top">
        {% include posts.html limit=1 full=true %}
        </div>
    </div>

    <div>
        <a class="uk-link" href="/garden">
            <h4 class="uk-text-large uk-text-light uk-margin-remove-bottom">
                Digital Garden <span data-uk-icon="arrow-right"></span>
            </h4>
        </a>
        <h4 class="uk-text-lighter uk-margin-remove-top">
            A place for ideas to sprout and grow
        </h4>
        <hr class="uk-divider-small">
        
        {% include topics.html %}
    </div>

</div>

<div class="uk-grid-large uk-child-width-expand@s" data-uk-grid>
    <div>
        <a class="uk-link" href="/projects">
            <h4 class="uk-text-large uk-text-light uk-margin-remove-bottom">
                Projects <span data-uk-icon="arrow-right"></span>
            </h4>
        </a>
        <h4 class="uk-text-lighter uk-margin-remove-top">
            Software for sophisticates
        </h4>
        <hr class="uk-divider-small">

        {% include projects.html %}
    </div>

    <div class="uk-width-2-3@m">
        <a class="uk-link" href="/library">
            <h4 class="uk-text-large uk-text-light uk-margin-remove-bottom">
                Library <span data-uk-icon="arrow-right"></span>
            </h4>
        </a>
        <h4 class="uk-text-lighter uk-margin-remove-top">
            Books I've read... or would like to
        </h4>
        <hr class="uk-divider-small">
        
        {% include books.html %}
    </div>
</div>