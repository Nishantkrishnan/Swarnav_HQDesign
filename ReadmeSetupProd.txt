nohup npm start &
tail -f nohup.out

<VirtualHost *:80>
  ServerName booking.goodworkscowork.com
  ServerAlias booking.goodworkscowork.com
  ErrorLog /root/goodworkscowork-booking-react/logs/error_log
  CustomLog /root/goodworkscowork-booking-react/logs/access_log combined

  ProxyRequests Off
  ProxyPreserveHost On

  ProxyPass / http://127.0.1.1:8180/
  ProxyPassReverse / http://127.0.1.1:8180/

  # This is needed only if you want to use web sockets
  #RewriteEngine On
  #RewriteCond %{REQUEST_URI}  ^/socket.io            [NC]
  #RewriteCond %{QUERY_STRING} transport=websocket    [NC]
  #RewriteRule /(.*)           ws://localhost:8180/$1 [P,L]
</VirtualHost>