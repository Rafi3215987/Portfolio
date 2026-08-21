# Portfolio website — static site served by nginx
FROM nginx:alpine

# Remove nginx's default sample page
RUN rm -rf /usr/share/nginx/html/*

# Copy the portfolio source into nginx's web root.
# Assumes this Dockerfile sits at the repo root, next to index.html, css/, js/, assets/
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
