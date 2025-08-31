FROM nginx:alpine

# Copy static website files into the default nginx public directory
COPY ./dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 5173

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
