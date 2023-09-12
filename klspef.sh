#!/bin/bash
# Use curl to send the HTTP request and assign the response to a variable


timeTableResponse=$(curl 'https://appsys.dbkl.gov.my/mytempahan_baru/gateway.asp?actiontype=gettimetable&dateplay=09%2F28%2F2023&actvid=1&locid=4')
echo "${timeTableResponse:1:${#timeTableResponse}-2}"
if [ -n "timeTableResponse" ]; then
  # Send a POST request to the specified endpoint with the response as the request body
  curl -X POST 'http://localhost:3000/timetable' \
    -H 'Content-Type: application/json' \
    -d "${timeTableResponse:1:${#timeTableResponse}-2}"
else
  echo "The response variable is empty. Cannot send a POST request."
fi

read -p "Press Enter to exit..."