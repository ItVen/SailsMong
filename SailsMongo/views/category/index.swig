{% extends 'layout.swig' -%}
{% block title -%}分类-{{ category.name }}{%- endblock %}
{% block content %}
    <div class="categoryContainer">
        <div class="title">
            {{ category.name }}
        </div>
        <div class="ui divider"></div>
        <div class="ui middle aligned divided list">
            {% for article in articles -%}
                <div class="item">
                    <div class="content">
                        <a class="header" href="/article/show/{{ article.id }}">
                            {{ article.title }}
                        </a>
                        {{ article.createdAt | date("Y-m-d") }}
                    </div>
                </div>

            {%- endfor %}
        </div>

        <div class="ui pagination menu">
            {# 注意 根据值的循环如此实现 #}
            {% set pageCount = Array(count) %}
            {% for x in pageCount -%}
                {% if loop.index == page -%}
                    <a href="/category/{{ category.id }}/articles/{{ loop.index }}" class="active item">
                        {{ loop.index }}
                    </a>
                {% else -%}
                    <a href="/category/{{ category.id }}/articles/{{ loop.index }}" class="item">
                        {{ loop.index }}
                    </a>
                {%- endif %}
            {%- endfor %}
        </div>
    </div>

{%- endblock %}