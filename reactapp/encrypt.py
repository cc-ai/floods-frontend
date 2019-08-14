# This logic was adapted from https://github.com/MaxLaumeister/clientside-html-password

from base64 import b64encode
from getpass import getpass
import os
import sys

from pbkdf2 import PBKDF2
from Crypto import Random
from Crypto.Cipher import AES

if __name__ == "__main__":
    inputfile = "build/index.html"
    try:
        with open(inputfile, "rb") as f:
            data = f.read()
    except:
        print("Cannot open file: %s" % inputfile)
        exit(1)

    if len(sys.argv) > 1:
        passphrase = sys.argv[1]
    else:
        while True:
            passphrase = getpass(prompt="Password: ")
            if passphrase == getpass(prompt="Confirm: "):
                break
            print("Passwords don't match, try again.")

    salt = Random.new().read(32)
    iv = Random.new().read(16)
    key = PBKDF2(passphrase=passphrase, salt=salt, iterations=100).read(32)

    cipher = AES.new(key, AES.MODE_CBC, IV=iv)
    padded = data.decode("utf-8", "replace")
    # workaround for padding issue https://github.com/dlitz/pycrypto/issues/277
    for i in range(16):
        try:
            encrypted = cipher.encrypt(padded)
            break
        except ValueError:
            padded += chr(0)

    projectFolder = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(projectFolder, "decryptTemplate.html")) as f:
        templateHTML = f.read()

    encryptedJSON = '{"salt":"%s","iv":"%s","data":"%s"}' % (
        b64encode(salt).decode("utf-8"),
        b64encode(iv).decode("utf-8"),
        b64encode(encrypted).decode("utf-8"),
    )
    encryptedDocument = templateHTML.replace(
        '/*{{ENCRYPTED_PAYLOAD}}*/""', encryptedJSON
    )

    with open(inputfile, "w") as f:
        f.write(encryptedDocument)
    print("File saved to %s" % inputfile)
