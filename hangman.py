# Problem Set 2, hangman.py
# Name: 
# Collaborators:
# Time spent:

# Hangman Game
# -----------------------------------
# Helper code
# You don't need to understand this helper code,
# but you will have to know how to use the functions
# (so be sure to read the docstrings!)
import random
import string
from string import ascii_letters, digits

WORDLIST_FILENAME = "words.txt"
# Initilizing initial number of warnign and guess
available_warning=3
available_guesses=6

def load_words():
    """
    Returns a list of valid words. Words are strings of lowercase letters.
    
    Depending on the size of the word list, this function may
    take a while to finish.
    """
    # print("Loading word list from file...")
    # inFile: file
    inFile = open(WORDLIST_FILENAME, 'r')
    # line: string
    line = inFile.readline()
    # wordlist: list of strings
    wordlist = line.split()
    # print("  ", len(wordlist), "words loaded.")
    return wordlist



def choose_word(wordlist):
    """
    wordlist (list): list of words (strings)
    
    Returns a word from wordlist at random
    """
    return random.choice(wordlist)

# end of helper code

# -----------------------------------

# Load the list of words into the variable wordlist
# so that it can be accessed from anywhere in the program
wordlist = load_words()
# print(choose_word(wordlist))


def is_word_guessed(secret_word, letters_guessed):
    '''
    secret_word: string, the word the user is guessing; assumes all letters are
      lowercase
    letters_guessed: list (of letters), which letters have been guessed so far;
      assumes that all letters are lowercase
    returns: boolean, True if all the letters of secret_word are in letters_guessed;
      False otherwise
    '''
    # FILL IN YOUR CODE HERE AND DELETE "pass"
    for letter in secret_word:
      if letter not in letters_guessed:
        return False
    return True



def get_guessed_word(secret_word, letters_guessed):
    '''
    secret_word: string, the word the user is guessing
    letters_guessed: list (of letters), which letters have been guessed so far
    returns: string, comprised of letters, underscores (_), and spaces that represents
      which letters in secret_word have been guessed so far.
    '''
    # FILL IN YOUR CODE HERE AND DELETE "pass"
    gussed_word=[letter if letter in letters_guessed else '_ ' for letter in secret_word]
    return ''.join(gussed_word)





def get_available_letters(letters_guessed):
    '''
    letters_guessed: list (of letters), which letters have been guessed so far
    returns: string (of letters), comprised of letters that represents which letters have not
      yet been guessed.
    '''
    # FILL IN YOUR CODE HERE AND DELETE "pass"

    available_letter=string.ascii_lowercase
    for letter in letters_guessed:
        if letter in available_letter:
            available_letter = available_letter.replace(letter,'')
    return available_letter


################  My custom functions go here   ################

def wrong_input(user_input):
  global available_guesses
  global available_warning
  if available_warning>0:
    available_warning -=1
    print("You have {} warnings left".format(available_warning))
  else:
    if user_input in 'aeiou':
          available_guesses -=1
    available_guesses -=1
    print("You have {} guesses left".format(available_guesses))

def get_user_input(secret_word,letters_guessed):
  '''
  secret_word: string, the word the user is guessing
  letters_guessed: list (of letters), which letters have been guessed so far;
      assumes that all letters are lowercase

  Returns:string, user input letter in lowercase. Only returns alphabet.
  '''
  global available_guesses
  while(available_guesses>0):
    user_input= input("Please guess a letter: ").lower()
    print(user_input)
    if (len(user_input)!=1):
      wrong_input(user_input)
      print("please Enter only onle letter: {}".format(get_guessed_word(secret_word,letters_guessed)))
      continue
    if not user_input.isalpha():
      wrong_input(user_input)
      print("Numbers and Symbols are not allowed please enter alphabet: {}".format(get_guessed_word(secret_word,letters_guessed)))
      continue
    if user_input in letters_guessed:
      wrong_input(user_input)
      print("Opps!! You already guessed that letter. Please enter any from available letters: {}".format(get_guessed_word(secret_word,letters_guessed)))
      continue
    return user_input
  return "null"

def get_score(secret_word,guesses_left):
  '''
      secret_word: string, the secret word to guess.
      guesses_left: number, the number of guesses left.
      returns: number, return guesses_left multiply number of distinct letter in secret_word
  
  '''
  return guesses_left*len(set(secret_word))

    

def hangman(secret_word):
  
    '''
    secret_word: string, the secret word to guess.
    
    Starts up an interactive game of Hangman.
    
    * At the start of the game, let the user know how many 
      letters the secret_word contains and how many guesses s/he starts with.
      
    * The user should start with 6 guesses

    * Before each round, you should display to the user how many guesses
      s/he has left and the letters that the user has not yet guessed.
    
    * Ask the user to supply one guess per round. Remember to make
      sure that the user puts in a letter!
    
    * The user should receive feedback immediately after each guess 
      about whether their guess appears in the computer's word.

    * After each guess, you should display to the user the 
      partially guessed word so far.
    
    Follows the other limitations detailed in the problem write-up.
    '''
    # FILL IN YOUR CODE HERE AND DELETE "pass"
    # Initilize empty list for guessed letter
    global available_guesses
    global available_warning
    letters_guessed=[]
    
    # Showing available warning and guesses
    print("You have {} warning left".format(available_warning))

    # Running while loop until word is guessed or guesses left out
    while(not is_word_guessed(secret_word,letters_guessed) and available_guesses>0):
      print("You have {} guesses left".format(available_guesses))
      print("Available letters: {}".format(get_available_letters(letters_guessed)))
      user_input =get_user_input(secret_word,letters_guessed)
      if user_input != 'null':
        letters_guessed.append(user_input)
        if user_input in secret_word:
          print("Good guess: {}".format(get_guessed_word(secret_word,letters_guessed)))
        else:
          print("Oops! That letter is not in my word: {}".format(get_guessed_word(secret_word,letters_guessed)))
          if user_input in 'aeiou':
            available_guesses -=1
          available_guesses -=1
        print("---------------")

    # Game Over
    if is_word_guessed(secret_word,letters_guessed):
      print("Congratulations, you won!")
      print("Your total score for this game is: {}".format(get_score(secret_word,available_guesses)))
    else:
      print("Sorry, you ran out of guesses. The word was {}.".format(secret_word))


# When you've completed your hangman function, scroll down to the bottom
# of the file and uncomment the first two lines to test
#(hint: you might want to pick your own
# secret_word while you're doing your own testing)


# -----------------------------------



def match_with_gaps(my_word, other_word):
    '''
    my_word: string with _ characters, current guess of secret word
    other_word: string, regular English word
    returns: boolean, True if all the actual letters of my_word match the 
        corresponding letters of other_word, or the letter is the special symbol
        _ , and my_word and other_word are of the same length;
        False otherwise: 
    '''
    # FILL IN YOUR CODE HERE AND DELETE "pass"
    pass



def show_possible_matches(my_word):
    '''
    my_word: string with _ characters, current guess of secret word
    returns: nothing, but should print out every word in wordlist that matches my_word
            Keep in mind that in hangman when a letter is guessed, all the positions
            at which that letter occurs in the secret word are revealed.
            Therefore, the hidden letter(_ ) cannot be one of the letters in the word
            that has already been revealed.

    '''
    # FILL IN YOUR CODE HERE AND DELETE "pass"
    pass



def hangman_with_hints(secret_word):
    '''
    secret_word: string, the secret word to guess.
    
    Starts up an interactive game of Hangman.
    
    * At the start of the game, let the user know how many 
      letters the secret_word contains and how many guesses s/he starts with.
      
    * The user should start with 6 guesses
    
    * Before each round, you should display to the user how many guesses
      s/he has left and the letters that the user has not yet guessed.
    
    * Ask the user to supply one guess per round. Make sure to check that the user guesses a letter
      
    * The user should receive feedback immediately after each guess 
      about whether their guess appears in the computer's word.

    * After each guess, you should display to the user the 
      partially guessed word so far.
      
    * If the guess is the symbol *, print out all words in wordlist that
      matches the current guessed word. 
    
    Follows the other limitations detailed in the problem write-up.
    '''
    # FILL IN YOUR CODE HERE AND DELETE "pass"
    pass



# When you've completed your hangman_with_hint function, comment the two similar
# lines above that were used to run the hangman function, and then uncomment
# these two lines and run this file to test!
# Hint: You might want to pick your own secret_word while you're testing.


if __name__ == "__main__":
    # pass

    # To test part 2, comment out the pass line above and
    # uncomment the following two lines.
    
    secret_word = choose_word(wordlist)
    hangman('prabesh')

###############
    
    # To test part 3 re-comment out the above lines and 
    # uncomment the following two lines. 
    
    #secret_word = choose_word(wordlist)
    #hangman_with_hints(secret_word)
