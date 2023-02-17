#!/bin/bash

POSITIVE_RETURN="OPEN"

#Check Oracle DB status and store it in status
status=`su -p oracle -c "sqlplus -s -L system/oracle@//localhost:1521/EE.oracle.docker" << EOF
    set heading off;
    set pagesize 0;
    select status from v\\$instance;
    exit;
EOF`

# Store return code from SQL*Plus
ret=$?

# SQL Plus execution was successful and database is open
if [ $ret -eq 0 ] && [ "$status" = "$POSITIVE_RETURN" ]; then
   exit 0;
# Database is not open
elif [ "$status" != "$POSITIVE_RETURN" ]; then
   exit 1;
# SQL Plus execution failed
else
   exit 2;
fi;