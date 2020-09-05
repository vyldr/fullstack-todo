# Build container
docker build -t fullstack-todo backend

# Run container
docker run --rm -it \
	--name fullstack-todo \
	-p 3000:3000 \
	fullstack-todo