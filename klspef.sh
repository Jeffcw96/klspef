#!/bin/bash
# Use curl to send the HTTP request and assign the response to a variable


# timeTableResponse=$(curl 'https://appsys.dbkl.gov.my/mytempahan_baru/gateway.asp?actiontype=gettimetable&dateplay=09%2F28%2F2023&actvid=1&locid=4')
# echo "${timeTableResponse:1:${#timeTableResponse}-2}"



# The index of 2 arrays below is matched accordingly
LOCATION_ID=(4 17)
# LOCATION_ID=(4 17 19 57 62 75)
LOCATION_LABEL=("IBU_KOTA" "PUSAT_KOMUNITI_GOMBAK" "TAMAN_MELATI_IMPIAN" "DESA_REJANG" "AIR_PANAS" "SEMARAK")
klspecResponse=()

# Initialize an empty array to store every Wednesday & Friday date up to next 21 days
dates=()

# Get today's date in the format YYYY-MM-DD
# today=$(date +%Y/%m/%d)
today="2023/09/15"
todayDay=$(date -j -f "%Y/%m/%d" "$today" "+%A")

if [ "$todayDay" != "Wednesday" ] && [ "$todayDay" != "Friday" ]; then
  echo "Not matching Wednesday or Friday"
  # exit 1
fi

# IMPORTANT: For window, we might need to change the following code to:
# $(date -d "+21 days")
# KLSPEF only can book up to maximum 21 days
# maxDay=$(date -v "+21d" +%Y/%m/%d)
maxDay=$(date -j -f "%Y/%m/%d" -v "+21d" "$today" "+%Y/%m/%d")
# Replace all '/' with '%2F'
encodedMaxDate="${maxDay//\//%2F}"

for ((i = 0; i < ${#LOCATION_ID[@]}; i++)); do
  id="${LOCATION_ID[i]}"
  label="${LOCATION_LABEL[i]}"
  sleep 1
  timeTableResponse=$(curl "https://appsys.dbkl.gov.my/mytempahan_baru/gateway.asp?actiontype=gettimetable&dateplay=${encodedMaxDate}&actvid=1&locid=${LOCATION_ID[i]}")
  processedResponse="${timeTableResponse:2:${#timeTableResponse}-3}"
  # Figure out why it only store the last element
  klspecResponse+="$processedResponse,"
done

if [ -n "klspecResponse" ]; then
# Refer https://jqlang.github.io/jq/download/ to install JQ
cleanedResponse=$(echo "$klspecResponse" | tr -d '\r\n')
cleanedResponse=$(echo "$cleanedResponse" | tr -s ' ')
json_data=$(jq -n -c --arg cleanedResponse "$cleanedResponse" '{"message": $cleanedResponse}')
  # Send a POST request to the specified endpoint with the response as the request body
curl -X POST 'http://localhost:3000/timetable' \
  -H 'Content-Type: application/json' \
  -d "$json_data"
else
  echo "The response variable is empty. Cannot send a POST request."
fi


# Implementation below is get every date for Wednesday and Friday up to 21 days later
# while [ "$currentDate" != "$maxDay" ]; do
#   day=$(date -j -f "%Y/%m/%d" "$currentDate" "+%A")
#   if [ "$day" == "Wednesday" ] || [ "$day" == "Friday" ]; then
#     # Add the current date to the array
#     dates+=("$currentDate")
#   fi

#   # Why current date only add 1 day
#   currentDate=$(date -j -f "%Y/%m/%d" -v "+1d" "$currentDate" "+%Y/%m/%d")
# done

read -p "Press Enter to exit..."