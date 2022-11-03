# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'hangmanUI1.ui'
#
# Created by: PyQt5 UI code generator 5.14.1
#
# WARNING! All changes made in this file will be lost!


from PyQt5 import QtCore, QtGui, QtWidgets
from PyQt5.QtCore import Qt

import random
import string
from string import ascii_letters, digits

WORDLIST_FILENAME = "words.txt"


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
    # print("  ", len(wordlist), "words loaded.")
    return line.split()


def choose_word(wordlist):
    """
    wordlist (list): list of words (strings)

    Returns a word from wordlist at random
    """
    return random.choice(wordlist)

# end of helper code

# -----------------------------------


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
    return all(letter in letters_guessed for letter in secret_word)



def get_guessed_word(secret_word, letters_guessed):
    '''
    secret_word: string, the word the user is guessing
    letters_guessed: list (of letters), which letters have been guessed so far
    returns: string, comprised of letters, underscores (_), and spaces that represents
    which letters in secret_word have been guessed so far.
    '''
    # FILL IN YOUR CODE HERE AND DELETE "pass"
    gussed_word = [
        letter if letter in letters_guessed else '_ ' for letter in secret_word]
    return ''.join(gussed_word)


def get_available_letters(letters_guessed):
    '''
    letters_guessed: list (of letters), which letters have been guessed so far
    returns: string (of letters), comprised of letters that represents which letters have not
    yet been guessed.
    '''
    # FILL IN YOUR CODE HERE AND DELETE "pass"

    available_letter = string.ascii_lowercase
    for letter in letters_guessed:
        if letter in available_letter:
            available_letter = available_letter.replace(letter, '')
    return available_letter

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
        my_word = my_word.replace("_ ", "_")
        if len(my_word) != len(other_word):
            return False
        return all(letter in ['_', other_word[index]] for index, letter in enumerate(my_word))


class Ui_MainWindow(object):
    def __init__(self, words,MainWindow):
        self.available_guesses = 6
        self.available_warning = 3
        self.letters_guessed = []
        self.secret_word = choose_word(words)
        # self.secret_word ="prabesh"
        self.words =words
        self.mainWindow =MainWindow
        self.setupUi(MainWindow)
    def reset_game(self):
        self.available_guesses=6
        self.available_warning = 3
        self.letters_guessed = []
        self.secret_word = choose_word(self.words)
        self.setupUi(self.mainWindow)


    def wrong_input(self,user_input):
        _translate = QtCore.QCoreApplication.translate

        if self.available_warning > 0:
            self.available_warning -= 1
            self.warning_label.setText(_translate("MainWindow", str(self.available_warning)))
        else:
            if user_input in 'aeiou':
                self.available_guesses -= 1
            self.available_guesses -= 1
            self.guess_label.setText(_translate("MainWindow", str(self.available_guesses)))
    def is_valid_input(self,user_input):
        _translate = QtCore.QCoreApplication.translate
        if user_input == '*':
            self.show_possible_matches(get_guessed_word(self.secret_word, self.letters_guessed))
            return False
        if len(user_input) == 0:
            return False
        if (len(user_input) != 1):
            self.wrong_input(user_input)
            self.guess_result_label.setText(_translate("MainWindow", "please Enter only onle letter!!"))
            # print(f"please Enter only onle letter: {get_guessed_word(self.secret_word, self.letters_guessed)}")

            return False
        if not user_input.isalpha():
            self.wrong_input(user_input)
            self.guess_result_label.setText(_translate("MainWindow", "Numbers and Symbols are not allowed please enter alphabet!!"))

            # print(f"Numbers and Symbols are not allowed please enter alphabet: {get_guessed_word(secret_word, letters_guessed)}")

            return False
        if user_input in self.letters_guessed:
            self.wrong_input(user_input)
            self.guess_result_label.setText(_translate("MainWindow", "Opps!! You already guessed that letter. Please enter any from available letters!!"))
            return False
        return True

    

    def show_possible_matches(self,my_word):
        '''
        my_word: string with _ characters, current guess of secret word
        returns: nothing, but should print out every word in wordlist that matches my_word
                Keep in mind that in hangman when a letter is guessed, all the positions
                at which that letter occurs in the secret word are revealed.
                Therefore, the hidden letter(_ ) cannot be one of the letters in the word
                that has already been revealed.

        '''
        # FILL IN YOUR CODE HERE AND DELETE "pass"
        _translate = QtCore.QCoreApplication.translate
        if len(my_word.replace("_ ",''))>0 and self.available_guesses<4:
            matches = [word for word in self.words if match_with_gaps(my_word, word)]
            text=' '.join(matches)
            print("print")
            self.hintsLabel1.setText(text)
        else:
            self.hintsLabel1.setText("Hints not available! To get hints you must have less than 4 guesses and should have guessed at least one letter")


    def update_hangman_image(self):
        if self.available_guesses>-1:
            self.photo.setPixmap(QtGui.QPixmap(f"images/{self.available_guesses}.jpg"))

    def game_over(self,is_won):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(358, 600)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        _translate = QtCore.QCoreApplication.translate
        self.listWidget = QtWidgets.QListWidget(self.centralwidget)
        self.listWidget.setGeometry(QtCore.QRect(30, 210, 256, 192))
        self.listWidget.setObjectName("listWidget")
        self.gameOverLabel = QtWidgets.QLabel(self.centralwidget)
        self.gameOverLabel.setGeometry(QtCore.QRect(100, 230, 121, 20))
        font = QtGui.QFont()
        font.setFamily("Ubuntu Condensed")
        font.setPointSize(20)
        font.setBold(True)
        font.setWeight(75)
        self.gameOverLabel.setFont(font)
        self.gameOverLabel.setObjectName("gameOverLabel")
        self.label_6 = QtWidgets.QLabel(self.centralwidget)
        self.label_6.setGeometry(QtCore.QRect(70, 280, 101, 17))
        self.label_6.setObjectName("label_6")
        self.gameOverWordLabel = QtWidgets.QLabel(self.centralwidget)
        self.gameOverWordLabel.setGeometry(QtCore.QRect(170, 280, 31, 17))
        font = QtGui.QFont()
        font.setFamily("Ubuntu Condensed")
        font.setBold(True)
        font.setWeight(75)
        self.gameOverWordLabel.setFont(font)
        self.gameOverWordLabel.setObjectName("gameOverWordLabel")
        self.playAgainBtn = QtWidgets.QPushButton(self.centralwidget)
        self.playAgainBtn.setGeometry(QtCore.QRect(170, 350, 89, 25))
        self.playAgainBtn.setObjectName("playAgainBtn")
        self.exitBtn = QtWidgets.QPushButton(self.centralwidget)
        self.exitBtn.setGeometry(QtCore.QRect(60, 350, 89, 25))
        self.exitBtn.setObjectName("exitBtn")
        self.label_4 = QtWidgets.QLabel(self.centralwidget)
        self.label_4.setGeometry(QtCore.QRect(70, 310, 91, 17))
        self.label_4.setObjectName("label_4")
        self.scoreLabel = QtWidgets.QLabel(self.centralwidget)
        self.scoreLabel.setGeometry(QtCore.QRect(170, 310, 31, 17))
        font = QtGui.QFont()
        font.setFamily("Ubuntu Condensed")
        font.setBold(True)
        font.setWeight(75)
        self.scoreLabel.setFont(font)
        self.scoreLabel.setObjectName("scoreLabel")

        self.gameOverLabel.setText(_translate("MainWindow", "Game over!!"))
        self.label_6.setText(_translate("MainWindow", "The word was"))
        self.gameOverWordLabel.setText(_translate("MainWindow", self.secret_word))
        self.playAgainBtn.setText(_translate("MainWindow", "Play again"))
        self.exitBtn.setText(_translate("MainWindow", "Exit"))
        self.label_4.setText(_translate("MainWindow", "Your score is :"))
        self.scoreLabel.setText(_translate("MainWindow", "0"))
        MainWindow.setCentralWidget(self.centralwidget)

        

        if is_won:
            self.scoreLabel.setText(_translate("MainWindow", "10"))
            self.gameOverLabel.setText(_translate("MainWindow", "You Won!!"))

        self.exitBtn.clicked.connect(self.exit)
        self.playAgainBtn.clicked.connect(self.reset_game)
    def exit(self):
        sys.exit(app.exec_())



        

    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(358, 600)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.enterBtn = QtWidgets.QPushButton(self.centralwidget)
        self.enterBtn.setGeometry(QtCore.QRect(70, 440, 89, 25))
        self.enterBtn.setAutoFillBackground(True)
        self.enterBtn.setObjectName("enterBtn")
        self.enterBtn.clicked.connect(self.submit)


        self.inputText = QtWidgets.QLineEdit(self.centralwidget)
        self.inputText.setGeometry(QtCore.QRect(50, 400, 141, 31))
        self.inputText.setObjectName("inputText")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(60, 380, 141, 17))
        font = QtGui.QFont()
        font.setPointSize(8)
        self.label.setFont(font)
        self.label.setObjectName("label")

        self.photo = QtWidgets.QLabel(self.centralwidget)
        self.photo.setGeometry(QtCore.QRect(60, 80, 131, 241))
        self.photo.setText("")
        self.photo.setPixmap(QtGui.QPixmap("images/6.jpg"))
        self.photo.setScaledContents(True)
        self.photo.setObjectName("photo")

        self.solutionLabel = QtWidgets.QLabel(self.centralwidget)
        self.solutionLabel.setGeometry(QtCore.QRect(60, 340, 131, 31))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.solutionLabel.setFont(font)
        self.solutionLabel.setText("")
        self.solutionLabel.setObjectName("solutionLabel")

        self.label_2 = QtWidgets.QLabel(self.centralwidget)
        self.label_2.setGeometry(QtCore.QRect(20, 10, 311, 41))
        font = QtGui.QFont()
        font.setFamily("Ubuntu Condensed")
        font.setPointSize(20)
        font.setBold(True)
        font.setWeight(75)
        self.label_2.setFont(font)
        self.label_2.setObjectName("label_2")
        self.label_3 = QtWidgets.QLabel(self.centralwidget)
        self.label_3.setGeometry(QtCore.QRect(210, 100, 101, 16))
        self.label_3.setObjectName("label_3")
        self.guess_label = QtWidgets.QLabel(self.centralwidget)
        self.guess_label.setGeometry(QtCore.QRect(320, 100, 31, 17))
        font = QtGui.QFont()
        font.setFamily("Ubuntu Condensed")
        font.setBold(True)
        font.setWeight(75)
        self.guess_label.setFont(font)
        self.guess_label.setObjectName("guess_label")

        self.label_5 = QtWidgets.QLabel(self.centralwidget)
        self.label_5.setGeometry(QtCore.QRect(210, 130, 101, 17))
        self.label_5.setObjectName("label_5")

        self.hintsLabel = QtWidgets.QLabel(self.centralwidget)
        self.hintsLabel.setGeometry(QtCore.QRect(210, 160, 101, 17))
        self.hintsLabel.setObjectName("hintsLabel")

        font = QtGui.QFont()
        font.setFamily("Ubuntu Condensed")
        font.setBold(False)
        font.setPointSize(9)
        self.hintsLabel1 = QtWidgets.QLabel(self.centralwidget)
        self.hintsLabel1.setGeometry(QtCore.QRect(200, 190, 151, 281))
        self.hintsLabel1.setObjectName("hintsLabel1")
        self.hintsLabel1.setWordWrap(True)
        self.hintsLabel1.setAlignment(Qt.AlignLeft | Qt.AlignTop)
        self.hintsLabel1.setFont(font)
        


        self.warning_label = QtWidgets.QLabel(self.centralwidget)
        self.warning_label.setGeometry(QtCore.QRect(320, 129, 21, 21))
        font = QtGui.QFont()
        font.setFamily("Ubuntu Condensed")
        font.setBold(True)
        font.setWeight(75)
        self.warning_label.setFont(font)
        self.warning_label.setObjectName("warning_label")
        self.guess_result_label = QtWidgets.QLabel(self.centralwidget)
        self.guess_result_label.setGeometry(QtCore.QRect(40, 490, 291, 20))
        self.guess_result_label.setObjectName("guess_result_label")
        self.available_letter_label = QtWidgets.QLabel(self.centralwidget)
        self.available_letter_label.setGeometry(
            QtCore.QRect(140, 530, 191, 20))
        font = QtGui.QFont()
        font.setFamily("Ubuntu Condensed")
        font.setBold(True)
        font.setWeight(75)
        self.available_letter_label.setFont(font)
        self.available_letter_label.setObjectName("available_letter_label")
        self.label_9 = QtWidgets.QLabel(self.centralwidget)
        self.label_9.setGeometry(QtCore.QRect(16, 530, 121, 20))
        self.label_9.setObjectName("label_9")

        MainWindow.setCentralWidget(self.centralwidget)

        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))

        self.solutionLabel.setText(_translate("MainWindow", get_guessed_word(self.secret_word,self.letters_guessed)))

        self.enterBtn.setText(_translate("MainWindow", "Enter"))
        self.label.setText(_translate("MainWindow", "Enter a guess letter"))
        self.label_2.setText(_translate(
            "MainWindow", "Welcome to hangmang Game!!!"))
        self.label_3.setText(_translate("MainWindow", "Guesses left = "))
        self.guess_label.setText(_translate("MainWindow", "6"))
        self.label_5.setText(_translate("MainWindow", "Warning left ="))
        self.hintsLabel.setText(_translate("MainWindow", "Hints:"))
        self.warning_label.setText(_translate("MainWindow", "3"))
        self.guess_result_label.setText(_translate("MainWindow", ""))
        self.available_letter_label.setText(
            _translate("MainWindow", get_available_letters(self.letters_guessed)))
        self.label_9.setText(_translate("MainWindow", "Available words :"))
        self.hintsLabel1.setText("Hints not available! To get hints enter * and press Enter!!")

        

    def submit(self):
        _translate = QtCore.QCoreApplication.translate
        user_input=self.inputText.text()
        if self.is_valid_input(user_input):
            self.letters_guessed.append(user_input)
            if user_input in self.secret_word:
                self.solutionLabel.setText(_translate("MainWindow", get_guessed_word(self.secret_word,self.letters_guessed)))
                self.guess_result_label.setText(_translate("MainWindow", "Good guess!"))

                # print(f"Good guess: {get_guessed_word(secret_word, letters_guessed)}")
            else:
                # print(f"Oops! That letter is not in my word: {get_guessed_word(secret_word, letters_guessed)}")
                self.guess_result_label.setText(_translate("MainWindow", "Oops! That letter is not in my word!"))

                if user_input in 'aeiou':
                    self.available_guesses -= 1
                self.available_guesses -= 1
                self.guess_label.setText(_translate("MainWindow", str(self.available_guesses)))

        self.inputText.setText("")
        self.available_letter_label.setText(
            _translate("MainWindow", get_available_letters(self.letters_guessed)))
        self.update_hangman_image()
        if self.available_guesses<1:
            self.game_over(False)
        elif is_word_guessed(self.secret_word,self.letters_guessed):
            self.game_over(True)



if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow(load_words(),MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())
