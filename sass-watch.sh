#!/bin/sh
# Script para ejecutar la compilación en vivo de sass
STYLES="src/styles"
SASS="${STYLES}/sass"
CSS="${STYLES}/css"
COMPONENTS="src/components"

MAINSASS="${STYLES}/main.scss"
MAINCSS="${CSS}/main.css"

DARKTHEMETOGGLESASS="${COMPONENTS}/dark-theme-toggle/dark-theme-toggle.scss"
DARKTHEMETOGGLECSS="${COMPONENTS}/dark-theme-toggle/dark-theme-toggle.css"

INDEXCARROUSELSASS="${COMPONENTS}/index-carrousel/index-carrousel.scss"
INDEXCARROUSELCSS="${COMPONENTS}/index-carrousel/index-carrousel.css"
ITEMCARROUSELSASS="${COMPONENTS}/index-carrousel/item-carrousel.scss"
ITEMCARROUSELCSS="${COMPONENTS}/index-carrousel/item-carrousel.css"

THELOGOSASS="${COMPONENTS}/logo/the-logo.scss"
THELOGOCSS="${COMPONENTS}/logo/the-logo.css"

NAVBARSASS="${COMPONENTS}/navbar/navbar.scss"
NAVBARCSS="${COMPONENTS}/navbar/navbar.css"

FOOTERCONTENTSASS="${COMPONENTS}/footer-content/footer-content.scss"
FOOTERCONTENTCSS="${COMPONENTS}/footer-content/footer-content.css"

sass --watch $MAINSASS:$MAINCSS $DARKTHEMETOGGLESASS:$DARKTHEMETOGGLECSS $INDEXCARROUSELSASS:$INDEXCARROUSELCSS $THELOGOSASS:$THELOGOCSS $NAVBARSASS:$NAVBARCSS $FOOTERCONTENTSASS:$FOOTERCONTENTCSS $ITEMCARROUSELSASS:$ITEMCARROUSELCSS

