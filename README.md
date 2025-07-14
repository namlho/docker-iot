# BE-DX
# Run this command in PowerShell as Administrator
<!-- 	Mở PORT -->
netsh advfirewall firewall add rule name="HTTP Redirect 3004" dir=in action=allow protocol=TCP localport=3030


2. Kiểm tra và giải phóng port 3030 nếu bị chiếm
netstat -ano | findstr :3030
Get-NetTCPConnection -LocalPort 3030 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }

<!-- #Reload nginx
.\nginx.exe -s reload
<!-- #Chạy nginx -->
<!-- .\nginx.exe
#start pm2
pm2 stop index.js --name "iot-server" --> -->

3. Build lại Docker image từ đầu
docker-compose build --no-cache

4. Chạy container bằng Docker Compose
docker-compose up -d

5. Kiểm tra logs container (giống như chạy npm start)
docker-compose logs -f

6. Quản lý container
docker ps
docker ps -a
docker logs iot-server
docker stop iot-server
docker start iot-server
docker rm -f iot-server

7. Xóa toàn bộ container và image cũ (nếu cần làm sạch)
docker-compose down
docker rm -f be-dx-iot-server-1 2>$null
docker rmi be-dx-iot-server 2>$null

8. Nếu gặp lỗi mạng hoặc Docker, hãy restart Docker service
Restart-Service docker




<!-- dữ liệu test dưới nhé  -->



<!-- chạy docker nhé  -->
docker-compose up -d
<!-- #check log nhé như là chạy npm start  -->
docker-compose logs -f 

<!-- Xóa toàn bộ container và image cũ -->
docker-compose down
docker rm -f be-dx-iot-server-1 2>$null
docker rmi be-dx-iot-server 2>$null

<!-- # Restart Docker service -->
Restart-Service docker
<!-- kiểm tra trạng thái của container -->
docker ps -a

<!-- # Xem process nào chiếm port 3030 -->
netstat -ano | findstr :3030

<!-- # Kill tất cả process chiếm port 3030 -->
Get-NetTCPConnection -LocalPort 3030 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }


<!-- 1. Restart Docker Service Hoàn Toàn -->
# Stop Docker service
Stop-Service docker

# Kill tất cả Docker processes
Get-Process *docker* | Stop-Process -Force

# Restart Docker service
Start-Service docker

# Đợi Docker khởi động hoàn toàn
Start-Sleep -Seconds 10

<!-- quản lý docker  -->

# Xem các container đang chạy
docker ps

# Xem tất cả container (bao gồm đã dừng)
docker ps -a

# Xem logs của container
docker logs iot-server

# Xem logs theo thời gian thực
docker logs -f iot-server

# Dừng container
docker stop iot-server

# Khởi động lại container
docker start iot-server

# Restart container
docker restart iot-server

# Xóa container (phải dừng trước)
docker rm iot-server

# Xóa cả container đang chạy
docker rm -f iot-server