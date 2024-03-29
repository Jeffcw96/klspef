#!/bin/bash
# Use curl to send the HTTP request and assign the response to a variable

echo Starting script... >> output.txt
LOCATION_ID=(4 17 19 57 62 75 80)
LOCATION_LABEL=("IBU_KOTA" "PUSAT_KOMUNITI_GOMBAK" "TAMAN_MELATI_IMPIAN" "DESA_REJANG" "AIR_PANAS" "SEMARAK" "PPR_AIR_PANAS")
klspecResponse=()

# Initialize an empty array to store every Wednesday & Friday date up to next 21 days
dates=()

# Get today's date in the format YYYY-MM-DD
today=$(date +'%m/%d/%Y')
# today="2023/11/02"
todayDay=$(date -j -f "%m/%d/%Y" "$today" "+%A")

# if [ "$todayDay" != "Wednesday" ] && [ "$todayDay" != "Friday" ]; then
#   echo Not matching Wednesday or Friday >> output.txt
#   exit 1
# fi

# IMPORTANT: For window, we might need to change the following code to:
# KLSPEF only can book up to maximum 21 days
maxDate=$(date -j -f "%m/%d/%Y" -v "+21d" "$today" "+%m/%d/%Y")
# Replace all '/' with '%2F'
encodedMaxDate="${maxDate//\//%2F}"

echo Today date: ${today}, Today day: ${todayDay}, maxDate ${maxDate}  >> output.txt

for ((i = 0; i < ${#LOCATION_ID[@]}; i++)); do
  id="${LOCATION_ID[i]}"
  label="${LOCATION_LABEL[i]}"
  sleep 1
  timeTableResponse=$(curl "https://appsys.dbkl.gov.my/mytempahan_baru/gateway.asp?actiontype=gettimetable&dateplay=${encodedMaxDate}&actvid=1&locid=${LOCATION_ID[i]}")
  processedResponse="${timeTableResponse:2:${#timeTableResponse}-3}"

   # Check if it's the last iteration
  if [ $i -eq $((${#LOCATION_ID[@]} - 1)) ]; then
    klspecResponse+="$processedResponse"
  else
    klspecResponse+="$processedResponse,"
  fi
done

if [ -n "klspecResponse" ]; then
# Refer https://jqlang.github.io/jq/download/ to install JQ
cleanedResponse=$(echo "$klspecResponse" | tr -d '\r\n') # Remove redundant character
cleanedResponse=$(echo "$cleanedResponse" | tr -s ' ') # Remove redundant space

json_data=$(/usr/local/bin/jq -n -c --arg cleanedResponse "$cleanedResponse" '{"message": $cleanedResponse}')

  # Send a POST request to the specified endpoint with the response as the request body
curl -X POST 'http://localhost:3000/klspef/timetable' \
  -H 'Content-Type: application/json' \
  -d "$json_data"
else
  echo "The response variable is empty. Cannot send a POST request."
fi

echo End script... >> output.txt