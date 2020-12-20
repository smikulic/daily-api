db-up:
	cd prisma; docker-compose up -d

db-deploy:
	cd prisma; prisma deploy
	
db-down:
	cd prisma; docker-compose down --remove-orphans