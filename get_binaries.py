import os
import platform

def main():
  binaryURL = ""
  if platform.system() == "Linux":
    binaryURL = "https://storage.googleapis.com/oauth2l/latest/linux_amd64.tgz"
  elif platform.system() == "Darwin":
    binaryURL = "https://storage.googleapis.com/oauth2l/latest/darwin_amd64.tgz"
  elif platform.system() == "Windows":
    binaryURL = "https://storage.googleapis.com/oauth2l/latest/windows_amd64.tgz"
  os.system("mkdir api/binaries| wget " +binaryURL+" -O - | tar -xz -C api/binaries --strip-components=1")

if __name__ == '__main__':
  main()
