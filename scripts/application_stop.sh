#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node server for real this time, not really"
# pkill node
pm2 delete books_node
pm2 delete books_react