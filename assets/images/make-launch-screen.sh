#!/bin/bash

srcpng=launch_screen.png
fold=('mipmap-ldpi' 'mipmap-mdpi' 'mipmap-hdpi' 'mipmap-xhdpi' 'mipmap-xxhdpi' 'mipmap-xxxhdpi' 'drawable')
widths=('240x360' '320x480' '480x720' '640x960' '960x1440' '1280x1920')

width=`file ./$srcpng | awk -F, '{print $2}' | awk -Fx '{print $1}' | sed 's/[[:space:]]//g'`
height=`file ./$srcpng | awk -F, '{print $2}' | awk -Fx '{print $2}' | sed 's/[[:space:]]//g'`

if [ $width -ne '1280' ] || [ $height -ne '1920' ]; then
    echo 'image is not 1280x1920'
    exit -1
fi

i=0;
while(( $i<=6 )); do
    f=./android/${fold[$i]}
    if [ ! -d $f ]; then
        mkdir -p $f
    fi

    if [ $i -ne 6 ]; then
        convert -resize ${widths[$i]} $srcpng $f/$srcpng
    else
        cp -f ./$srcpng $f
    fi;
    i=$[i+1]
done

