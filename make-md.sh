#!/bin/bash

asciidoc -b docbook README.adoc && pandoc -f docbook -t markdown_strict README.xml -o README.md && rm README.xml