# Use nginx alpine as base image for a lightweight web server
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy application files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY dashboard.html /usr/share/nginx/html/
COPY 404.html /usr/share/nginx/html/
COPY favicon.ico /usr/share/nginx/html/
COPY icon.png /usr/share/nginx/html/
COPY icon.svg /usr/share/nginx/html/
COPY robots.txt /usr/share/nginx/html/
COPY site.webmanifest /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY img/ /usr/share/nginx/html/img/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

