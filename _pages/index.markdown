---
layout: home
title: Home
permalink: /
---

<div class="uk-grid-large uk-child-width-expand@s" data-uk-grid>
    <div class="uk-width-3-5@s">
        <a class="uk-link-toggle" href="/posts">
            <h4 class="uk-text-large uk-text-light uk-link-heading uk-margin-remove-bottom">
                Writing <span data-uk-icon="arrow-right"></span>
            </h4>
        </a>
        <h4 class="uk-text-lighter uk-margin-remove-top">
            Quick posts and announcements
        </h4>
        <hr class="uk-divider-small">

        <div class="uk-visible@s uk-link-text">
        {% include posts.html full=false limit=1 %}
        </div>
    </div>

    <div>
        <a class="uk-link-toggle" href="/notes">
            <h4 class="uk-text-large uk-text-light uk-link-heading uk-margin-remove-bottom">
                Digital Garden <span data-uk-icon="arrow-right"></span>
            </h4>
        </a>
        <h4 class="uk-text-lighter uk-margin-remove-top">
            A place for ideas to sprout and grow
        </h4>
        <hr class="uk-divider-small">

        <div class="uk-visible@s">
        {% include notes.html %}
        </div>
    </div>
</div>

<div class="uk-grid-large uk-child-width-expand@s" data-uk-grid>
    <div>
        <a class="uk-link-toggle" href="/projects">
            <h4 class="uk-text-large uk-text-light uk-link-heading uk-margin-remove-bottom">
                Projects <span data-uk-icon="arrow-right"></span>
            </h4>
        </a>
        <h4 class="uk-text-lighter uk-margin-remove-top">
            Software and experiments
        </h4>
        <hr class="uk-divider-small">

        <div class="uk-visible@s">
        {% include projects.html %}
        </div>
    </div>

    <div class="uk-width-2-3@s">
        <a class="uk-link-toggle" href="/books">
            <h4 class="uk-text-large uk-text-light uk-link-heading uk-margin-remove-bottom">
                Library <span data-uk-icon="arrow-right"></span>
            </h4>
        </a>
        <h4 class="uk-text-lighter uk-margin-remove-top">
            Books I've read... or would like to
        </h4>
        <hr class="uk-divider-small">

        <div class="uk-visible@s">
        {% include books.html limit=6 %}
        </div>
    </div>
</div>