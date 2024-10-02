#!/bin/bash

# Uninstall existing opencv libraries
pip uninstall -y opencv-python opencv-python-headless

# Install OpenCV libraries
pip install opencv-python
pip install 'opencv-python-headless>=4.1.1
'

# Set the timezone (macOS uses systemsetup for timezone configuration)

# Install chromedriver using Homebrew
brew install chromedriver

# Ensure chromedriver is in the correct path
ln -sf $(which chromedriver) /usr/local/bin/chromedriver

# Update Homebrew repositories
brew update

echo "Setup complete for macOS"
