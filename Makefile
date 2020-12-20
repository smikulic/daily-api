db-up:
	cd prisma; docker-compose up -d
	
db-down:
	cd prisma; docker-compose down --remove-orphans