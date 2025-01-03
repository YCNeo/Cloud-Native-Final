#!/bin/bash

# Variables
ROOT="$(dirname "$(dirname "$(realpath "$0")")")"
VERSION_FILE="$ROOT/docs/version.txt"

# read version from version file
if [[ -f $VERSION_FILE ]]; then
    echo "Current version: $(cat "$VERSION_FILE")"
else
    echo "Version file not found."
    exit 1
fi

version_validate() {
    local _version=$1
    if [[ $_version =~ ^[0-9]+\.[0-9]+$ ]] || [[ $_version == "latest" ]]; then
        echo "Build version: $_version"
        return 0
    else
        echo "Invalid version. Enter in the format X.Y (e.g., 1.1)."
        return 1
    fi
}

# Check for --version argument
if [[ $1 == "--version" ]]; then
    if [[ -n $2 ]]; then
        VERSION=$2
        while true; do
            version_validate $VERSION
            if [[ $? -eq 0 ]]; then
                break
            else
                read -p "Enter deployment version: " VERSION
            fi
        done
    else
        echo "No version specified. Please provide a version."
        exit 1
    fi
else
    # input validation
    while true; do
        read -p "Enter deployment version: " VERSION
        version_validate $VERSION
        if [[ $? -eq 0 ]]; then
            break
        fi
    done
fi

# build and push to docker hub
"$ROOT/script/build.sh" $VERSION
if [[ $? -eq 0 ]]; then
    echo $VERSION >"$VERSION_FILE"
    echo "Version file updated."
else
    exit 1
fi

# deploy to ECS
# "$ROOT/script/update.sh"
# if [[ $? -eq 0 ]]; then
#     echo "Deployment successful."
# else
#     echo "Deployment failed."
#     exit 1
# fi
