# Funtionality

## CRON JOB KLSPEF service

- Responsible to call `https://appsys.dbkl.gov.my/mytempahan_baru/gateway.asp?actiontype=gettimetable&dateplay=<ENCODED_DATE_VALUE>&actvid=1&locid=<LOCATION_ID>` and forward the response to KLSPEF notification service
  - [] hardcode %2F as slash
  - [] dynamically get every wednesday and friday date that is after today's date
  - [] store the result of each locations into a temporary variable and forward everything to notification service after the last iteration

## KLSPEF notification service

- Handle the parse the response from CRON JOB KLSPEF service
  - [] Filter and map the response into recognizable wording
  - [] Trigger notification to whatsapp

## Prerequisite systems installed

- [JQ](https://jqlang.github.io/jq/download/)
