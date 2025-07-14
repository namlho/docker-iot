-- Option 1: Query with formatted timestamps (doesn't change the database)
-- Examples for each table showing how to format timestamps
-- For auo_display
SELECT id,
  voltage,
  current,
  power_operating,
  to_char(timestamp, 'YYYY-MM-DD HH24:MI:SS') as formatted_time
FROM auo_display
ORDER BY id DESC
LIMIT 10;
-- For camera_control_unit
SELECT id,
  voltage,
  current,
  power_operating,
  to_char(timestamp, 'YYYY-MM-DD HH24:MI:SS') as formatted_time
FROM camera_control_unit
ORDER BY id DESC
LIMIT 10;
-- For electronic_endoflator
SELECT id,
  voltage,
  current,
  power_operating,
  to_char(timestamp, 'YYYY-MM-DD HH24:MI:SS') as formatted_time
FROM electronic_endoflator
ORDER BY id DESC
LIMIT 10;
-- For led_nova_100
SELECT id,
  voltage,
  current,
  power_operating,
  to_char(timestamp, 'YYYY-MM-DD HH24:MI:SS') as formatted_time
FROM led_nova_100
ORDER BY id DESC
LIMIT 10;
-- For iot_environment_status
SELECT id,
  temperature_c,
  humidity_percent,
  to_char(timestamp, 'YYYY-MM-DD HH24:MI:SS') as formatted_time
FROM iot_environment_status
ORDER BY id DESC
LIMIT 10;
