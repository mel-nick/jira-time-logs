#!/bin/bash
clear
COLUMNS=12
echo "======================================="
echo "Select action and hit the number"
echo "Note: you should have yarn installed"
echo "========================================"
new=yes
API_DIR="./jira-work-log"
startApp="Start-application:"
install="Install-dependencies:"
createToken="Create-token:"
exit="Exit:"
while [ "$new" = yes ]; do
   new=no
   select x in $startApp $install $createToken $exit
   do
      case $x in
        $startApp ) echo "Starting Application..."
            SERVER_COMMAND="yarn start"
            cd "$API_DIR"
            eval "$SERVER_COMMAND"
            break;;
         $install ) echo "Installing dependencies..."
            SERVER_COMMAND="yarn install"
            cd "$API_DIR"
            eval "$SERVER_COMMAND"
            cd "..";;
         $createToken ) echo "Createting token file..."
            if  [ -f "./jira-work-log/.env" ] && grep -R "token=" "./jira-work-log/.env"; then
               echo "Token exist"
            else
              echo "Enter your Jira token:"
              read -r token
              echo -e "token="$token"" >> ./jira-work-log/.env
            echo "Token has been created successfuly."
            fi;;
         $exit ) echo "You are now exiting the program"
            break;;
         *) echo "Invalid entry. Please try an option on display";;
      esac
   done
done