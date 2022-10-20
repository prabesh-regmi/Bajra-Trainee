import string
alphabet=list(string.ascii_lowercase)
text =input("Enter strint to encrypt: ")
n =input("Enter encryption number: ")
def ceaserCipherEncryption(string,n):
    encrypted_text=''
    for letter in string:
        index =alphabet.index(letter)
        index=(index+int(n))%26
        encrypted_text += alphabet[index]
    return encrypted_text
def ceaserCipherDecryption(string,n):
    encrypted_text=''
    for letter in string:
        index =alphabet.index(letter)
        index=(index-int(n))%26
        encrypted_text += alphabet[index]
    return encrypted_text
encryption =ceaserCipherEncryption(text,n)
deKey=input("Enter key to decrypt message:")
print(ceaserCipherDecryption(encryption,deKey))