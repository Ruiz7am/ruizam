#!/bin/sh
# Script para ejecutar la compilación en vivo de sass
STYLES="src/styles/"
SASS="src/styles/sass/"
CSS="src/styles/css/"

MAINSASS="${STYLES}main.scss"
MAINCSS="${STYLES}main.css"

DARKTHEMETOGGLESASS="${SASS}dark-theme-toggle.scss"
DARKTHEMETOGGLECSS="${CSS}dark-theme-toggle.css"

INDEXCARROUSELSASS="${SASS}index-carrousel.scss"
INDEXCARROUSELCSS="${CSS}index-carrousel.css"

THELOGOSASS="${SASS}the-logo.scss"
THELOGOCSS="${CSS}the-logo.css"

NAVBARSASS="${SASS}navbar.scss"
NAVBARCSS="${CSS}navbar.css"

FOOTERCONTENTSASS="${SASS}footer-content.scss"
FOOTERCONTENTCSS="${CSS}footer-content.css"

sass --watch $MAINSASS:$MAINCSS $DARKTHEMETOGGLESASS:$DARKTHEMETOGGLECSS $INDEXCARROUSELSASS:$INDEXCARROUSELCSS $THELOGOSASS:$THELOGOCSS $NAVBARSASS:$NAVBARCSS $FOOTERCONTENTSASS:$FOOTERCONTENTCSS