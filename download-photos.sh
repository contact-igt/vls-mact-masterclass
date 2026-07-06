#!/bin/bash
# Run this script to replace SVG placeholders with real Unsplash photos
# Usage: bash download-photos.sh

echo "Downloading real photos from Unsplash..."
cd "$(dirname "$0")/assets/images"

curl -L "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1920&q=75" -o hero-bg.jpg     && echo "✅ hero-bg.jpg"
curl -L "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=80"  -o fast-facts.jpg  && echo "✅ fast-facts.jpg"
curl -L "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=900&q=80"  -o courtroom.jpg   && echo "✅ courtroom.jpg"
curl -L "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80"  -o legal-docs.jpg  && echo "✅ legal-docs.jpg"
curl -L "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80"  -o professionals.jpg && echo "✅ professionals.jpg"
curl -L "https://decodingofpractice.vlslawacademy.com/assets/home/IMG_9237.jpg"    -o classroom.jpg   && echo "✅ classroom.jpg"
curl -L "https://decodingofpractice.vlslawacademy.com/assets/home/vls_logo.png"    -o ../logo/vls-logo.png && echo "✅ vls-logo.png"
curl -L "https://decodingofpractice.vlslawacademy.com/assets/owner/mr-siva-kumar-backdrop.svg" -o ../logo/speaker.svg && echo "✅ speaker.svg"

echo ""
echo "Done! Now update index.html image src paths:"
echo "  assets/images/hero-bg.svg  → assets/images/hero-bg.jpg"
echo "  (etc.) or run: sed -i 's/.svg/.jpg/g; s/vls-logo.svg/vls-logo.png/g' ../index.html"
